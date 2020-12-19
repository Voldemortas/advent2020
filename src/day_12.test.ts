import { part1, part2 } from './day_12'

const input = `F10
N3
F7
R90
F11`

test('part 1', () => {
  expect(part1(input)).toStrictEqual([17, 8])
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
