import { part1, part2 } from './day_13'

const input = `939
7,13,x,x,59,x,31,19`

test('part 1', () => {
  expect(part1(input)).toBe(295)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
