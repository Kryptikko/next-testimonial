import type { NextApiRequest, NextApiResponse } from 'next'
import db from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  if (method === "GET") {

    const product = await db.testimonial.findUnique({
      where: { id: String(query.id) }
    })

    return res.status(200).json(product)
  }

  if (method === "PUT") {
    const { tagline, body, name, url, avatar, status } = JSON.parse(req.body);
    const result = await db.testimonial.update({
      where: { id: String(query.id) },
      data: { tagline, body, name, url, avatar, status }
    })
    return res.json(result)
  }

  if (method === "DELETE") {
    const result = await db.testimonial.delete({
      where: { id: String(query.id) }
    })
    return res.json(result)
  }

  // test if you need to manually set status 500 ?
  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}
