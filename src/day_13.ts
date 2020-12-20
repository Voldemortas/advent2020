import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_13.txt', 'utf-8')
type schedule = { timestamp: number; busses: (number | 'x')[] }
function decodeInput(input: string): schedule {
  const lines = input.split('\n')
  return {
    timestamp: +lines[0],
    busses: lines[1].split(',').map((e) => (e === 'x' ? 'x' : +e)),
  }
}

export function part1(input: string): number {
  const timetable: schedule = decodeInput(input)
  const busses: number[] = timetable.busses.filter((e) => e !== 'x') as number[]
  const sorted = busses
    .map((e) => [e - (timetable.timestamp % e), e])
    .sort((a, b) => a[0] - b[0])[0]
  return sorted[0] * sorted[1]
}

export function part2(input: string): number {
  const timetable: (number | 'x')[] = decodeInput(input).busses
  let answer = +timetable[0]
  let commonMultiple = answer
  for (let i = 1; i < timetable.length; i++) {
    if (timetable[i] === 'x') {
      continue
    }
    while ((answer + i) % +timetable[i] !== 0) {
      answer += commonMultiple
    }
    commonMultiple *= +timetable[i]
  }
  return answer
}

console.log('\x1b[31mDay 13')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
