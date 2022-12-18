import { methods } from './elections'
import type { Method } from './elections'
import type { Point } from './types'
import { randomLcg, randomNormal } from 'd3'
// ^ using d3 in tests requires moduleNameMapper setting to avoid syntax errors

const votingMethods: [string, Method][] = Object.entries(methods)

const pointsFrom = (dist: () => number, n = 10): Point[] =>
  new Array(n).fill(null).map(() => [dist(), dist()])

const aDistribution = randomNormal.source(randomLcg(1158))(0, 20)

const interestingVoterSets: [string, Point[]][] = [
  ['randomly distributed voters', pointsFrom(aDistribution)]
]

describe.each(votingMethods)('%s method', (_, method) => {
  describe.each(interestingVoterSets)('in an election of %s', (_, voters) => {
    test.each(new Array(3).fill(null).map((_, i) => i + 1))(
      'one of the %s candidates should win',
      (n) => {
        const candidates = new Array(n)
          .fill(null)
          .map((_, i) => ({ x: aDistribution(), y: aDistribution(), i }))

        const winner = method(candidates, voters)([0, 0], 20)

        expect(candidates).toContain(winner)
      }
    )
  })
})
