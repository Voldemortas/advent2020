import { part1, part2 } from './day_08'

const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

test('part 1', () => {
  expect(part1(input)).toBe(5)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
