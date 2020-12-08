import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_07.txt', 'utf-8')

type Child = {
  node: Node
  amount: number
}

export type Node = {
  name: string
  children: Child[]
  real: boolean
}

const name = 'shiny gold'

export function decodeData(input: string): Node[] {
  const tail = /(((\d+) (\w+ \w+)) bags?([,.]?)|no other bags.)+/g
  const head = /(\w+ \w+) bags contain /g
  return input.split('\n').map((line) => {
    const bagName = Array.from(line.matchAll(head))[0][1]
    const children = Array.from(line.matchAll(tail))
    if (children[0][0] === 'no other bags.') {
      return { name: bagName, children: [], real: true }
    }
    return {
      name: bagName,
      real: true,
      children: children.map((e) => {
        return {
          node: { name: e[4], children: [], real: false },
          amount: +e[3],
        } as Child
      }),
    }
  })
}

function findBag(node: Node): boolean {
  if (node.children.length === 0) {
    return false
  }
  if (node.children.filter((e) => e.node.name === name).length !== 0) {
    return true
  } else {
    return node.children.reduce(
      (acc: boolean, cur) => acc || findBag(cur.node),
      false
    )
  }
}

function constructGraph(nodes: Node[]): Node[] {
  nodes.forEach((e, i) => {
    e.children.forEach((f, j) => {
      if (f.node.real === false) {
        const index = nodes.findIndex((g) => g.name === f.node.name)
        nodes[i].children[j].node = nodes[index]
      }
    })
  })
  return nodes
}

function countBags(node: Node): number {
  return node.children.reduce(
    (acc: number, cur) => acc + cur.amount + cur.amount * countBags(cur.node),
    0
  )
}

export function part1(input: string): number {
  let data = decodeData(input)
  let structure = constructGraph(data)
  return structure.filter((e) => findBag(e)).length
}

export function part2(input: string): number {
  let data = decodeData(input)
  let structure = constructGraph(data)
  return countBags(structure.filter((e) => e.name === name)[0])
}
console.log('\x1b[31mDay 07')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
