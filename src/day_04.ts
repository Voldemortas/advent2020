import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_04.txt', 'utf-8')

export type Passport = {
  byr?: string //Birth Year
  iyr?: string //Issue Year
  eyr?: string //Expiration Year
  hgt?: string //Height
  hcl?: string //Hair Colour
  ecl?: string //Eye Colour
  pid?: string //Passport ID
  cid?: string //Country ID
}

export function decodeData(input: string): Passport[] {
  return JSON.parse(
    `[${input
      .split('\n\n')
      .map(
        (e) =>
          `{${e
            .replace(/(\n)|\s/g, ', ')
            .replace(/(\w+):([\w#]+)/g, '"$1":"$2"')}}`
      )
      .join(', ')}]`
  )
}

export function isValid(pass: Passport): boolean {
  const temp: Passport = {
    byr: '0',
    iyr: '0',
    eyr: '0',
    hgt: '0',
    hcl: '0',
    ecl: '0',
    pid: '0',
  }
  return Object.keys(temp).reduce(
    (acc: boolean, cur: string) => acc && pass.hasOwnProperty(cur),
    true
  )
}

export function part1(input: string): number {
  return decodeData(input)
    .map((e) => isValid(e))
    .filter((e) => e).length
}

export function part2(input: string): number {
  return 0
}

console.log('\x1b[31mDay 04')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
