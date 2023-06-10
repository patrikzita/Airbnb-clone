import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const requestSchema = z.object({
  roomId: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const validationResult = requestSchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const { roomId } = validationResult.data;

  if (req.method === "POST") {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      return res.status(500).send({ error: "User is not authorized." });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(roomId);

    const user = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    return res.json(user);
  }
  if (req.method === "DELETE") {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      return res.status(500).send({ error: "User is not authorized." });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== roomId);

    const user = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    return res.json(user);
  }
}
