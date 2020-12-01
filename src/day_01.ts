import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_01.txt', 'utf-8')

export function part1(input: string): number {
  const lines = input
    .split('\n')
    .map((e) => +e)
    .sort()
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = lines.length - 1; j > 0; j--) {
      if (lines[i] + lines[j] === 2020) {
        return lines[i] * lines[j]
      }
    }
  }
  return 0
}

export function part2(input: string): number {
  const lines = input
    .split('\n')
    .map((e) => +e)
    .sort()
  for (let i = 0; i < lines.length - 2; i++) {
    for (let k = i + 1; k < lines.length - 1; k++) {
      for (let j = lines.length - 1; j > 0; j--) {
        if (lines[i] + lines[j] + lines[k] === 2020) {
          return lines[i] * lines[j] * lines[k]
        }
      }
    }
  }
  return 0
}

console.log('\x1b[31mDay 01')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
