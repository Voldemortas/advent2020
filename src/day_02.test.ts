import { part1, part2 } from './day_02'

const input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

test('part 1', () => {
  expect(part1(input)).toBe(2)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
