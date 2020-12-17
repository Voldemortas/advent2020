import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_09.txt', 'utf-8')

function decodeData(input: string): number[] {
  return input.split('\n').map((e) => +e)
}

function makeArray(array: number[], depth: number): number[][] {
  return array.reduce(
    (acc: number[][], cur, index) => {
      if (index + depth > array.length) {
        return acc
      }
      let temp: number[] = []
      for (let i = 1; i < depth; i++) {
        temp.push(cur + array[i + index])
      }
      return [...acc, temp]
    },
    [[]]
  )
}

export function part1(input: string, size: number): number {
  const data = decodeData(input)
  const reduced = makeArray(data, size)
  let array: number[] = []
  for (let i = 0; i < reduced.length; i++) {
    array = []
    for (let j = 1; j < size; j++) {
      array = [...array, ...reduced[i + j].slice(0, size - j)]
    }
    if (!array.includes(data[i + size])) {
      return data[i + size]
    }
  }
  return -1
}

export function part2(input: string, size: number): number {
  const data = decodeData(input)
  const previousPart = part1(input, size)
  const index = data.findIndex((e) => e === previousPart)
  const bigbigarray: number[][] = data
    .slice(0, index)
    .reduce(
      (acc: number[][][], cur, index, arr) => {
        let answer: number[][] = []
        for (let i = 1 + index; i < arr.length; i++) {
          if (i === 1 + index) {
            answer = [[arr[i], cur]]
          } else {
            answer = [...answer, [...answer[answer.length - 1], arr[i]]]
          }
        }
        return [...acc, answer]
      },
      [[]]
    )
    .flat(1)
  let answer = bigbigarray.filter(
    (e) => e.reduce((acc: number, cur) => acc + cur) === previousPart
  )[0]

  return Math.max(...answer) + Math.min(...answer)
}

console.log('\x1b[31mDay 09')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input, 25))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input, 25) + '\x1b[33m')
