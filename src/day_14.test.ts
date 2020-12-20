import { part1, part2 } from './day_14'

const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

test('part 1', () => {
  expect(part1(input)).toBe(BigInt(165))
})

test('part 2', () => {
  expect(
    part2(`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`).toString()
  ).toBe('208')
})
