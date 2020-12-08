import { part1, part2 } from './day_06'

const input = `abc

a
b
c

ab
ac

a
a
a
a

b`

test('part 1', () => {
  expect(part1(input)).toBe(11)
})

test('part 2', () => {
  expect(part2(input)).toBe(6)
})
