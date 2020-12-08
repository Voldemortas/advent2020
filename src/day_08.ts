import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_08.txt', 'utf-8')

type Command = {
  instruction: 'nop' | 'jmp' | 'acc'
  value: number
}

function decode(input: string): Command[] {
  return input.split('\n').map((e) => {
    const split = Array.from(e.matchAll(/(nop|jmp|acc) ((\+|-)\d+)/g))[0]
    return { instruction: split[1] as 'nop' | 'jmp' | 'acc', value: +split[2] }
  })
}

export function part1(input: string): number {
  let current = { position: 0, value: 0 }
  let prev = 0
  let visited: number[] = []
  const commads = decode(input)
  while (!visited.some((e) => e === current.position)) {
    visited.push(current.position)
    if (commads[current.position].instruction === 'nop') {
      current.position += 1
      continue
    }
    if (commads[current.position].instruction === 'acc') {
      prev = current.value + 0
      current.value += commads[current.position].value
      current.position += 1
      continue
    }
    if (commads[current.position].instruction === 'jmp') {
      current.position += commads[current.position].value
      continue
    }
  }
  return current.value
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay 08')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
