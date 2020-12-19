import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_10.txt', 'utf-8')

export function part1(input: string): [number, number] {
  const data = input
    .split('\n')
    .map((e) => +e)
    .sort((a, b) => a - b)
  let counter = { one: 0, three: 0, current: 0 }
  data.forEach((e) => {
    if (e - counter.current === 1) {
      counter.one++
    }
    if (e - counter.current === 3) {
      counter.three++
    }
    counter.current = e
  })
  return [counter.one, counter.three + 1]
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay 10')
const [min, max] = part1(input)
console.log('\x1b[0mPart 1:\n\x1b[32m' + min * max)
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
