import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_14.txt', 'utf-8')

function decodeInput(
  input: string
): { operation: 'mask' | 'mem'; index: string | undefined; value: string }[] {
  return input.split('\n').map((e) => {
    const parsed = Array.from(
      e.matchAll(/(mask|mem)\[?(\d*)\]? = ([\dX]+)/g)
    )[0]
    if (parsed[1] === 'mask') {
      return { operation: 'mask', value: parsed[3], index: undefined }
    } else {
      return {
        operation: 'mem',
        value: (+parsed[3]).toString(2).padStart(36, '0'),
        index: (+parsed[2]).toString(2).padStart(36, '0'),
      }
    }
  })
}

export function part1(input: string): bigint {
  let instructions = decodeInput(input)
  let lastMask = instructions[0].value
  let registers = new Map<string, string>()
  for (let i = 1; i < instructions.length; i++) {
    if (instructions[i].operation === 'mask') {
      lastMask = instructions[i].value
    } else {
      let temp = instructions[i].value.split('')
      for (let j = 0; j < 36; j++) {
        temp[j] = lastMask[j] === 'X' ? instructions[i].value[j] : lastMask[j]
      }
      registers.set(instructions[i].index!, temp.join(''))
    }
  }
  return Array.from(registers.values()).reduce(
    (a: bigint, b) => a + BigInt(`0b${b}`),
    BigInt(0)
  )
}

export function part2(input: string): bigint {
  function getAddresses(str: string[]): string[] {
    const yes = [...str]
    const no = [...str]
    const index = str.findIndex((e) => e === 'X')
    if (index === -1) {
      return []
    }
    yes[index] = '1'
    no[index] = '0'
    return yes.findIndex((e) => e === 'X') > -1
      ? [...getAddresses(yes), ...getAddresses(no)]
      : [yes.join(''), no.join('')]
  }
  let instructions = decodeInput(input)
  let lastMask = instructions[0].value
  let registers = new Map<string, bigint>()
  for (let i = 1; i < instructions.length; i++) {
    if (instructions[i].operation === 'mask') {
      lastMask = instructions[i].value
    } else {
      let temp = instructions[i].index!.split('')
      for (let j = 0; j < 36; j++) {
        temp[j] =
          lastMask[j] === 'X' ? 'X' : lastMask[j] === '1' ? '1' : temp[j]
      }
      getAddresses(temp).forEach((address) => {
        registers.set(address, BigInt(`0b${instructions[i].value}`))
      })
    }
  }
  return Array.from(registers.values()).reduce((a, b) => a + b)
}

console.log('\x1b[31mDay 14')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
