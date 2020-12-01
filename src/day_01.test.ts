import { part1, part2 } from './day_01'

const input = `1721
979
366
299
675
1456`

test('part 1', () => {
  expect(part1(input)).toBe(514579)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
