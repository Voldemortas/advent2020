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

function run(
  commands: Command[]
): { visited: number[]; value: number; success: boolean } {
  let current = { position: 0, value: 0 }
  let visited: number[] = []
  while (!visited.some((e) => e === current.position)) {
    if (current.position >= commands.length) {
      return { visited, value: current.value, success: true }
    }
    visited.push(current.position)
    if (commands[current.position].instruction === 'nop') {
      current.position += 1
      continue
    }
    if (commands[current.position].instruction === 'acc') {
      current.value += commands[current.position].value
      current.position += 1
      continue
    }
    if (commands[current.position].instruction === 'jmp') {
      current.position += commands[current.position].value
      continue
    }
  }
  return {
    visited: visited.filter((e) => commands[e].instruction !== 'acc'),
    value: current.value,
    success: false,
  }
}

export function part1(input: string): number {
  const commads = decode(input)
  return run(commads).value
}

export function part2(input: string): number {
  const commads = decode(input)
  const runs: number[] = run(commads).visited
  const reruns = runs.map((e) => {
    let temp = JSON.parse(JSON.stringify(commads))
    temp[e].instruction = temp[e].instruction === 'jmp' ? 'nop' : 'jmp'
    return run(temp)
  })
  return reruns.filter((e) => e.success)[0].value
}

console.log('\x1b[31mDay 08')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
