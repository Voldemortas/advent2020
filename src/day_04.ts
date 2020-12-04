import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day_04.txt', 'utf-8')

export type Passport<T = string> = {
  byr?: T //Birth Year
  iyr?: T //Issue Year
  eyr?: T //Expiration Year
  hgt?: T //Height
  hcl?: T //Hair Colour
  ecl?: T //Eye Colour
  pid?: T //Passport ID
  cid?: T //Country ID
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

export function isValid2(pass: Passport): boolean {
  const temp: Passport<(e: string) => boolean> = {
    byr: (e) => +e >= 1920 && +e <= 2002,
    iyr: (e) => +e >= 2010 && +e <= 2020,
    eyr: (e) => +e >= 2020 && +e <= 2030,
    hgt: (e) => {
      if (/^(\d{2,3})(in|cm)$/g.test(e) === false) {
        return false
      }
      const parsed = Array.from(e.matchAll(/^(\d{2,3})(in|cm)$/g))[0]
      const value: number = +parsed[1]
      const unit: string = parsed[2] + ''
      return (
        (unit === 'cm' && value >= 150 && value <= 193) ||
        (unit === 'in' && value >= 59 && value <= 76)
      )
    },
    hcl: (e) => /^#[0-9a-f]{6}$/g.test(e),
    ecl: (e) => /^(amb|blu|brn|gry|grn|hzl|oth)$/g.test(e),
    pid: (e) => /^\d{9}$/g.test(e),
    cid: (e) => true,
  }
  const keys = (Object.keys(temp) as unknown) as (keyof Passport<any>)[]
  return keys.reduce(
    (acc: boolean, cur) => acc && temp[cur]!(pass[cur] || '0'),
    true
  )
}

export function part1(input: string): number {
  return decodeData(input).filter((e) => isValid(e)).length
}

export function part2(input: string): number {
  return decodeData(input).filter((e) => isValid2(e)).length
}

console.log('\x1b[31mDay 04')
console.log('\x1b[0mPart 1:\n\x1b[32m' + part1(input))
console.log('\x1b[0mPart 2:\n\x1b[32m' + part2(input) + '\x1b[33m')
