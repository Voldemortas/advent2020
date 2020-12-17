import { part1, part2 } from './day_09'

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

test('part 1', () => {
  expect(part1(input, 5)).toBe(127)
})

test('part 2', () => {
  expect(part2(input, 5)).toBe(62)
})
