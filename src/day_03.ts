import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_03.txt', 'utf-8')

export function part1(input: string): number {
  const data = input.split('\n').map((e) => e.split(''))
  const height = data.length
  const width = data[0].length
  let current = [0, 0]
  let trees = 0
  for (let i = 1; i < height; i++) {
    current = [(current[0] + 3) % width, current[1] + 1]
    if (data[i][current[0]] === '#') {
      trees++
    }
  }
  return trees
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay 03')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
