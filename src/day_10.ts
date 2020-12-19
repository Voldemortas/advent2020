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

type tree = {
  index: number
  values: number[]
}
export function part2(input: string): number {
  const data = [
    0,
    ...input
      .split('\n')
      .map((e) => +e)
      .sort((a, b) => a - b),
  ]
  function callback(index: number = 0): tree {
    let answer: tree = { index, values: [] }
    for (let i = 3; i > 0; i--) {
      if (data[index] + 3 >= data[index + i]) {
        answer.values.push(index + i)
      }
    }
    return answer
  }
  function recursion(group: tree, used: tree[] = []): tree[] {
    if (group.values.length === 0) {
      return []
    }
    let groups = [group]
    for (let i = 0; i < group.values.length; i++) {
      if (![...used, group].some((e) => e.index === group.values[i])) {
        groups = [...groups, ...recursion(callback(group.values[i]), groups)]
      }
    }
    return groups
  }
  //@ts-ignore
  let sorted = recursion(callback()).sort((a, b) => b.index - a.index)
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < sorted[i].values.length; j++) {
      if (sorted[i].values[j] >= sorted.length) {
        sorted[i].values[j] = 1
      } else {
        sorted[i].values[j] = sorted
          .filter((e) => e.index === sorted[i].values[j])[0]
          .values.reduce((a, b) => a + b)
      }
    }
  }
  return sorted[sorted.length - 1].values.reduce((a, b) => a + b)
}

console.log('\x1b[31mDay 10')
const [min, max] = part1(input)
console.log('\x1b[0mPart 1:\n\x1b[32m' + min * max)
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
