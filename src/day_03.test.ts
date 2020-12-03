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
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  const result = [2, 7, 3, 4, 2]
  slopes.forEach((slope, i) => {
    expect(part1(input, slope)).toBe(result[i])
  })
  expect(part2(input)).toBe(336)
})
