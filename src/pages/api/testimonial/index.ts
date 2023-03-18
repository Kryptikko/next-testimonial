import type { NextApiRequest, NextApiResponse } from 'next'
import db from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const { tagline, body, name, url, avatar, project_id } = JSON.parse(req.body);
    //TODO: validate required fields
    const result = await db.testimonial.create({
      data: { tagline, body, name, url, avatar, project_id }
    })
    return res.json(result)
  }

  // test if you need to manually set status 500 ?
  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}
