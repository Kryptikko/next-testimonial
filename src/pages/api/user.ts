import db from "@/models"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //TODO: handle authentication and sessio
  if (req.method === "GET") {
    const user = await db.user.findUnique({
      where: {email: "velin.br.vangelov@gmail.com"},
      include: {projects: true}
    })
    return res.json(user);
  }
  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}
