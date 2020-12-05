import { part2, decodeTicket } from './day_05'

const input: [string, number][] = [
  ['FBFBBFFRLR', 357],
  ['BFFFBBFRRR', 567],
  ['FFFBBBFRRR', 119],
  ['BBFFBBFRLL', 820],
]

test('part 1', () => {
  input.forEach((e) => {
    expect(decodeTicket(e[0])).toBe(e[1])
  })
})

test('part 2', () => {
  expect(
    part2(`FFFFFFFRLR
FFFFFFFRRR`)
  ).toBe(6)
})
