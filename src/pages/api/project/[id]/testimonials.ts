import type { NextApiRequest, NextApiResponse } from 'next'
import db from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  if (method === "GET") {
    const product = await db.testimonial.findMany({
      where: { project_id: String(query.id) }
    })

    return res.json(product)
  }

  if (method === "POST") {
    const {
      avatar,
      body,
      name,
      tagline,
      url,
    } = req.body
    const result = await db.testimonial.create({
      data: {
        avatar,
        body,
        name,
        tagline,
        url,
      },
    })
    return res.json(result)
  }

  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}
