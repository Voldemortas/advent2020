import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_03.txt', 'utf-8')

export function part1(input: string, slope = [3, 1]): number {
  const data = input.split('\n').map((e) => e.split(''))
  const height = data.length
  const width = data[0].length
  let current = [0, 0]
  let trees = 0
  do {
    current = [(current[0] + slope[0]) % width, current[1] + slope[1]]
    if (data[current[1]][current[0]] === '#') {
      trees++
    }
  } while (current[1] !== height - 1)
  return trees
}

export function part2(input: string): number {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  return slopes.reduce((acc, cur) => acc * part1(input, cur), 1)
}

console.log('\x1b[31mDay 03')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
