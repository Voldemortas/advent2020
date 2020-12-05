import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_05.txt', 'utf-8')

export function decodeTicket(ticket: string): number {
  const parsed = Array.from(ticket.matchAll(/([FB]{7})([RL]{3})/g))[0]
  const row = parseInt(parsed[1].replace(/F/g, '0').replace(/B/g, '1'), 2)
  const seat = parseInt(parsed[2].replace(/L/g, '0').replace(/R/g, '1'), 2)
  return +row * 8 + +seat
}

export function part1(input: string): number {
  return Math.max(...input.split('\n').map((e) => decodeTicket(e)))
}

export function part2(input: string): number {
  return (
    input
      .split('\n')
      .map((e) => decodeTicket(e))
      .sort((a, b) => a - b)
      .filter((e, i, arr) => {
        if (i === 0) {
          return false
        }
        return e - 1 !== arr[i - 1]
      })[0] - 1
  )
}

console.log('\x1b[31mDay 05')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
