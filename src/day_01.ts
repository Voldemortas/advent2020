import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_01.txt', 'utf-8')

export function part1(input: string): number {
  const lines = input
    .split('\n')
    .map((e) => +e)
    .sort()
  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = lines.length - 1; j > 0; j--) {
      if (lines[i] + lines[j] === 2020) {
        return lines[i] * lines[j]
      }
    }
  }
  return 0
}

export function part2(input: string): number {
  return 0
}

console.log('Day 01')
console.log('Part 1:' + part1(input))
console.log('Part 1:' + part2(input))
