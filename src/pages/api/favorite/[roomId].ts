import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;
  if (req.method === "POST") {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      return res.status(500).send({ error: "User is not authorized." });
    }

    if (!roomId || typeof roomId !== "string") {
      throw new Error("Invalid ID");
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

    if (!roomId || typeof roomId !== "string") {
      throw new Error("Invalid ID");
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
