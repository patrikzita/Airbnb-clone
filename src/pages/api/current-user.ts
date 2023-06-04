import type { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getCurrentUser(req, res);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json(user);
}
