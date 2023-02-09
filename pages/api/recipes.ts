// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Recipe = {
  name: string;
  description: string | null;
  tags: string;
  ingredients: string;
  instructions: string;
  notes: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const result: Recipe[] = await (await fetch("http://localhost:1337/api/recipes")).json()
  console.log(result);

  res.status(200).json(result);
}
