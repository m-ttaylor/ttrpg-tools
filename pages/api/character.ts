// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type CharacterData = {
  name: string,
  strength: number,
  constitution: number,
  dexterity: number,
  intelligence: number,
  wisdom: number,
  charisma: number
}

function rollForAttribute(): number {
  const rolls: number[] = []
  let minRoll = 7

  for (let r = 0; r < 4; r++) {
    const roll = Math.floor(Math.random() * 6 + 1)
    if (roll < minRoll) {
      minRoll = roll
    }
    rolls.push(roll)
  }

  const minIndex = rolls.findIndex(i => i === minRoll)
  const dropLowest = [...rolls].filter((r, i) => i !== minIndex)
  const sum = dropLowest.reduce((partialSum, a) => partialSum+a, 0)

  console.log('your rolls, dropping the lowest:', dropLowest)
  console.log('your sum:', sum)
  
  return sum
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CharacterData>
) {

  const attributeNumber = 6
  
  // for (let i = 0; i < attributeNumber; i++) {
  //   const attributeScore = 
  // }

  const score = Math.floor(Math.random()*6+1)
  res.status(200).json(
    {
      name: 'John Doe',
      strength: rollForAttribute(),
      constitution: rollForAttribute(),
      dexterity: rollForAttribute(),
      intelligence: rollForAttribute(),
      wisdom: rollForAttribute(),
      charisma: rollForAttribute(),
    })
}
