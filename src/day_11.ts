import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_11.txt', 'utf-8')

type seats = 'L' | '#' | '.'

export function iterate(input: string): string {
  const data: seats[][] = input.split('\n').map((e) => e.split('')) as seats[][]
  function neighbours(y: number, x: number): seats[] {
    return [
      (data[y - 1] ?? [])[x - 1] ?? [],
      (data[y - 1] ?? [])[x] ?? [],
      (data[y - 1] ?? [])[x + 1] ?? [],

      (data[y] ?? [])[x - 1] ?? [],

      (data[y] ?? [])[x + 1] ?? [],

      (data[y + 1] ?? [])[x - 1] ?? [],
      (data[y + 1] ?? [])[x] ?? [],
      (data[y + 1] ?? [])[x + 1] ?? [],
    ].flat()
  }

  return data
    .map((e, row) =>
      e.map((i, col) =>
        i === 'L' && !neighbours(row, col).some((e) => e === '#')
          ? '#'
          : i === '#' &&
            neighbours(row, col).filter((e) => e === '#').length >= 4
          ? 'L'
          : i
      )
    )
    .map((e) => e.join(''))
    .join('\n')
}

export function iterate2(input: string): string {
  const data: seats[][] = input.split('\n').map((e) => e.split('')) as seats[][]
  function neighbours(y: number, x: number): seats[] {
    function goDeep(horizontal: number, vertical: number): seats {
      const temp = (data[y + vertical] ?? [])[x + horizontal] ?? []
      if (typeof temp === 'object') {
        return '.'
      } else if (temp === '.') {
        return goDeep(
          (horizontal + Math.abs(horizontal) / horizontal) | 0,
          (vertical + Math.abs(vertical) / vertical) | 0
        )
      } else {
        return temp
      }
    }
    return [
      goDeep(-1, -1),
      goDeep(0, -1),
      goDeep(1, -1),

      goDeep(-1, 0),
      goDeep(1, 0),

      goDeep(-1, 1),
      goDeep(0, 1),
      goDeep(1, 1),
    ]
  }
  return data
    .map((e, row) =>
      e.map((i, col) =>
        i === 'L' && !neighbours(row, col).some((e) => e === '#')
          ? '#'
          : i === '#' &&
            neighbours(row, col).filter((e) => e === '#').length >= 5
          ? 'L'
          : i
      )
    )
    .map((e) => e.join(''))
    .join('\n')
}

export function part1(input: string): number {
  while (input != iterate(input)) {
    input = iterate(input)
  }
  return input.split('').filter((e) => e === '#').length
}

export function part2(input: string): number {
  while (input != iterate2(input)) {
    input = iterate2(input)
  }
  return input.split('').filter((e) => e === '#').length
}

console.log('\x1b[31mDay 11')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
