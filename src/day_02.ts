import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_02.txt', 'utf-8')

function splitText(
  text: string
): { min: number; max: number; char: string; text: string }[] {
  return text.split('\n').map((e) => {
    let [numbers, char, text] = e.split(/ /g)
    char = char.replace(/:/g, '')
    const [min, max] = numbers.split('-').map((e) => +e)
    return { min, max, char, text }
  })
}

export function part1(input: string): number {
  const data = splitText(input)
  const answer = data.filter((e) => {
    const size = Array.from(e.text.matchAll(new RegExp(e.char, 'g'))).length
    return e.min <= size && e.max >= size
  })
  return answer.length
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay 02')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
