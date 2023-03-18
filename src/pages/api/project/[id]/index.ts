import type { NextApiRequest, NextApiResponse } from 'next'
import db from "@/models"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  if (method === "GET") {
    if (!query.id)
      return res.status(400).json({error: "id required"})

    const product = await db.project.findUnique({
      where: { id: String(query.id) }
    })

    return res.status(200).json(product)
  }

  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}
