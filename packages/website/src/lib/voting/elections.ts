import type { NamedPoint, Point } from './types'

export const formatPoint = ([x, y]: Point): string => `${Math.round(x)},${Math.round(y)}`

export const euclidean = ([ax, ay]: Point, [bx, by]: Point): number =>
  Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)

const tallyVote = (tally: { [key in number]?: number }, candidate: number | null) => {
  const winner = candidate ?? -1
  tally[winner] = (tally[winner] ?? 0) + 1
}

const odysseus = { x: 0, y: 0, i: -1 }

export const plurality = (
  candidates: NamedPoint[],
  voters: Point[],
  [ox, oy]: Point
): NamedPoint => {
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
      return odysseus
    } else if (delta > 0) {
      return next
    } else return winner
  }, odysseus)
}

export const approval = (
  candidates: NamedPoint[],
  voters: Point[],
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
      return odysseus
    } else if (delta > 0) {
      return next
    } else return winner
  }, odysseus)
}

// Ranked choice / instant runoff: each voter ranks candidates by distance.
// Repeatedly eliminate the candidate with the fewest first-choice votes
// among those still standing, transferring each of their voters to that
// voter's next surviving preference, until someone has a majority.
export const irv = (candidates: NamedPoint[], voters: Point[], [ox, oy]: Point): NamedPoint => {
  const rankings = voters.map(([x, y]) =>
    candidates
      .map(({ x: cx, y: cy, i }) => ({ i, dist: euclidean([x + ox, y + oy], [cx, cy]) }))
      .sort((a, b) => a.dist - b.dist)
      .map(({ i }) => i)
  )

  const remaining = new Set(candidates.map(({ i }) => i))
  while (remaining.size > 1) {
    const tally: { [key in number]?: number } = {}
    remaining.forEach((i) => (tally[i] = 0))
    rankings.forEach((ranking) => {
      const choice = ranking.find((i) => remaining.has(i))
      if (choice !== undefined) tally[choice] = (tally[choice] ?? 0) + 1
    })

    const total = [...remaining].reduce((sum, i) => sum + (tally[i] ?? 0), 0)
    let leader = [...remaining][0]
    let trailer = [...remaining][0]
    remaining.forEach((i) => {
      if ((tally[i] ?? 0) > (tally[leader] ?? 0)) leader = i
      if ((tally[i] ?? 0) < (tally[trailer] ?? 0)) trailer = i
    })

    if ((tally[leader] ?? 0) > total / 2) {
      return candidates.find(({ i }) => i === leader) ?? odysseus
    }
    if (remaining.size === 2) {
      // two candidates left and neither has a majority: exact tie
      return odysseus
    }
    remaining.delete(trailer)
  }

  const [lastStanding] = remaining
  return candidates.find(({ i }) => i === lastStanding) ?? odysseus
}
