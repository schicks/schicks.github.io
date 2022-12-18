import type { NamedPoint, Point } from './types'
import pl from 'nodejs-polars'

export const formatPoint = ([x, y]: Point): string => `${Math.round(x)},${Math.round(y)}`

export const euclidean = ([ax, ay]: Point, [bx, by]: Point): number =>
  Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)

const tallyVote = (tally: { [key in number]?: number }, candidate: number | null) => {
  const winner = candidate ?? -1
  tally[winner] = (tally[winner] ?? 0) + 1
}

const odysseus = { x: 0, y: 0, i: -1 }

export type Method = (
  candidates: NamedPoint[],
  voters: Point[]
) => (offset: Point, r: number) => NamedPoint

export const plurality: Method = (candidates: NamedPoint[], voters: Point[]) => ([
  ox,
  oy
]: Point): NamedPoint => {
  const tally: { [key in number]?: number } = {}
  voters.forEach(([x, y]) => {
    let winner: number | null = null
    let min = 200
    candidates.forEach(({ x: cx, y: cy, i }) => {
      const dist = euclidean([x + ox, y + oy], [cx, cy])
      if (dist < min) {
        winner = i
        min = dist
      }
    })
    tallyVote(tally, winner)
  })
  return candidates.reduce((winner, next) => {
    const current = tally[next.i] ?? 0
    const delta = current - (tally[winner.i] ?? 0)
    if (delta === 0) {
      tally[-1] = current
      console.error('odysseus should never win an election')
      return odysseus
    } else if (delta > 0) {
      return next
    } else return winner
  }, odysseus)
}

export const approval: Method = (candidates: NamedPoint[], voters: Point[]) => (
  [ox, oy]: Point,
  r: number
): NamedPoint => {
  const tally: { [key in number]?: number } = {}
  voters.forEach(([x, y]) => {
    candidates.forEach(({ x: cx, y: cy, i }) => {
      const dist = euclidean([x + ox, y + oy], [cx, cy])
      if (dist < r) {
        tallyVote(tally, i)
      }
    })
  })
  return candidates.reduce((winner, next) => {
    const current = tally[next.i] ?? 0
    const delta = current - (tally[winner.i] ?? 0)
    if (delta === 0) {
      tally[-1] = current
      console.error('odysseus should never win an election')
      return odysseus
    } else if (delta > 0) {
      return next
    } else return winner
  }, odysseus)
}


// winnow takes in a loser and returns a polars expression that removes the loser from all ballots.
// TODO; https://github.com/pola-rs/nodejs-polars/issues/21
const winnow = (loser: string) => pl.col("vote").lst.eval(pl.element().filter(pl.element().notEquals(loser)), false).alias("vote")

const countBallots = (df: pl.DataFrame): pl.DataFrame => {
  /**
   * Given a frame of ballots (x: float, y: float, vote: str[]) identify the round winner.
   * To run ranked choice we will have to run this repeatedly against a winnowed election frame.
   */
  return df
    .select(pl.col("vote").lst.first().alias("candidate")) // identify current frontrunner for each ballot
    .groupBy("candidate")
    .agg(pl.count("candidate"))
    .sort("count", true) // sort candidates by highest count of top votes
}

const rankedChoice: Method = (candidates, voters) => {
  // python reference; https://gist.github.com/schicks/5ea4085acf6312e0281ec48a103fc1d5
  // js syntax reference; https://github.com/pola-rs/nodejs-polars
  const voterFrame = pl.DataFrame({
    x: voters.map(([x]) => x),
    y: voters.map(([y]) => y)
  })
  const candidateFrame = pl.DataFrame({
    x: candidates.map(({ x }) => x),
    y: candidates.map(({ y }) => y),
    name: candidates.map(({ i }) => i)
  })
  const baseElection = voterFrame.join(candidateFrame, { how: 'cross', suffix: '_candidate' })
  return ([ox, oy]) => {
    const election = baseElection.select(
      pl.col('x').add(ox),
      pl.col('y').add(oy),
      "x_candidate",
      "y_candidate",
      "name"
    )

    // polars expressions describe operations without performing them
    const xdist = (pl.col("x").sub(pl.col("x_candidate"))).pow(2)
    const ydist = (pl.col("y").sub(pl.col("y_candidate"))).pow(2)
    const distance = (xdist.add(ydist)).pow(1 / 2).alias("distance")

    // (x: float, y: float, vote: str[])
    const ballots = election.select( // build list of ballots from space of voters and candidates
      "x",
      "y",
      "name",
      distance
    ).groupBy("x", "y").agg(pl.col("name").sortBy("distance").list().alias("vote"))

    // set up ranked choice by running a single round
    let currentRound: pl.DataFrame = countBallots(ballots)
    const rounds = [currentRound]
    let loser: string = currentRound.tail(1).getColumn("candidate").take([0])[0]
    let liveBallots: pl.DataFrame = ballots
    let frontRunnerVotes: number = currentRound.getColumn("count").take([0])[0]

    // perform further rounds until there is a majority
    while (frontRunnerVotes < voters.length / 2) {
      liveBallots = liveBallots.select("x", "y", winnow(loser))
        .filter(pl.col("vote").lst.lengths().explode().greaterThan(0)) // only consider ballots that are still active
      currentRound = countBallots(liveBallots)
      rounds.push(currentRound)
      loser = currentRound.tail(1).getColumn("candidate").take([0])[0]
      frontRunnerVotes = currentRound.getColumn("count").take([0])[0]
    }

    // identify the winner
    const winner = currentRound.head(1).getColumn("candidate").take([0])[0]
    return candidates.find(c => c.i === winner) ?? odysseus
  }
}

export const methods = {
  plurality,
  approval,
  rankedChoice
}
