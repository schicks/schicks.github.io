import type { NamedPoint, Point } from './types'

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

export const methods = {
  plurality,
  approval
}
