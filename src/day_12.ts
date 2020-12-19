import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_12.txt', 'utf-8')

type direction = 'E' | 'S' | 'W' | 'N'

type instruction = {
  value: number
  action: direction | 'R' | 'L' | 'F'
}

function getInstructions(input: string): instruction[] {
  return input.split('\n').map((e) => {
    const parsed = Array.from(e.matchAll(/(\w)(\d+)/g))[0]
    return {
      action: parsed[1] as 'E' | 'S' | 'W' | 'N' | 'R' | 'L' | 'F',
      value: +parsed[2],
    }
  })
}

export function part1(input: string): [number, number] {
  const instructions = getInstructions(input)
  let spaceship: { direction: direction; x: number; y: number } = {
    direction: 'E',
    x: 0,
    y: 0,
  }
  const compass: direction[] = ['E', 'S', 'W', 'N']
  instructions.forEach((e) => {
    if (e.action === 'F') {
      if (spaceship.direction === 'E') {
        spaceship.x += e.value
      }
      if (spaceship.direction === 'W') {
        spaceship.x -= e.value
      }
      if (spaceship.direction === 'N') {
        spaceship.y += e.value
      }
      if (spaceship.direction === 'S') {
        spaceship.y -= e.value
      }
    }
    if (e.action === 'E') {
      spaceship.x += e.value
    }
    if (e.action === 'W') {
      spaceship.x -= e.value
    }
    if (e.action === 'N') {
      spaceship.y += e.value
    }
    if (e.action === 'S') {
      spaceship.y -= e.value
    }
    if (e.action === 'R') {
      spaceship.direction =
        compass[
          (compass.findIndex((e) => e === spaceship.direction) +
            e.value / 90 +
            8) %
            4
        ]
    }
    if (e.action === 'L') {
      spaceship.direction =
        compass[
          (compass.findIndex((e) => e === spaceship.direction) -
            e.value / 90 +
            8) %
            4
        ]
    }
  })
  return [Math.abs(spaceship.x), Math.abs(spaceship.y)]
}

export function part2(input: string): [number, number] {
  const instructions = getInstructions(input)
  let spaceship: { x: number; y: number } = {
    x: 0,
    y: 0,
  }
  let waypoint: { x: number; y: number } = {
    x: 10,
    y: 1,
  }
  instructions.forEach((e) => {
    if (e.action === 'F') {
      spaceship.x += waypoint.x * e.value
      spaceship.y += waypoint.y * e.value
    }
    if (e.action === 'E') {
      waypoint.x += e.value
    }
    if (e.action === 'W') {
      waypoint.x -= e.value
    }
    if (e.action === 'N') {
      waypoint.y += e.value
    }
    if (e.action === 'S') {
      waypoint.y -= e.value
    }
    if (e.action === 'R') {
      for (let i = 0; i < e.value / 90; i++) {
        waypoint = { ...waypoint, x: waypoint.y, y: -waypoint.x }
      }
    }
    if (e.action === 'L') {
      for (let i = 0; i < e.value / 90; i++) {
        waypoint = { ...waypoint, x: -waypoint.y, y: waypoint.x }
      }
    }
  })
  return [Math.abs(spaceship.x), Math.abs(spaceship.y)]
}

console.log('\x1b[31mDay 12')
const [e, n] = part1(input)
console.log('\x1b[0mPart 1:\n\x1b[32m' + (e + n))
const [e1, n1] = part2(input)
console.log('\x1b[0mPart 2:\n\x1b[32m' + (e1 + n1) + '\x1b[33m')
