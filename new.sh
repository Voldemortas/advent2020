#!/bin/bash
BASEDIR=$(dirname "$0")
touch $BASEDIR/src/day_$1.txt
echo "import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_$1.txt', 'utf-8')

export function part1(input: string): number {
  return 0
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay $1')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
"> $BASEDIR/src/day_$1.ts

echo "import { part1, part2 } from './day_$1'

const input = \`1721\`

test('part 1', () => {
  expect(part1(input)).toBe(0)
})

test('part 2', () => {
  expect(part2(input)).toBe(0)
})
" > $BASEDIR/src/day_$1.test.ts