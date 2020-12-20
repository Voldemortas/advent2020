import { part1, part2 } from './day_14'

const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

test('part 1', () => {
  expect(part1(input)).toBe(BigInt(165))
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
