import { part1, part2 } from './day_03'

const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

test('part 1', () => {
  expect(part1(input)).toBe(7)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
