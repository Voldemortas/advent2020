import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_06.txt', 'utf-8')

function decodeData(input: string): string[] {
  return input.split('\n\n').map((e) => e.replace(/\n/g, ''))
}

export function part1(input: string): number {
  return decodeData(input)
    .map(
      (e) =>
        e
          .split('')
          .sort()
          .join('')
          .replace(/(\w)\1+/g, '$1').length
    )
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)
}

export function part2(input: string): number {
  return input
    .split('\n\n')
    .map((e) =>
      e.split('\n').reduce((acc: string[], cur, index) => {
        if (index === 0) {
          return cur.split('')
        }
        return acc.filter((f) => cur.split('').includes(f))
      }, [])
    )
    .reduce((acc, cur) => acc + cur.length, 0)
}

console.log('\x1b[31mDay 06')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
