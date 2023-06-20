import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      res.status(404).json({ error: "User was not found" });
    }

    const { reservationId } = req.query;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid ID");
    }

    const room = await client.reservation.deleteMany({
      where: {
        id: reservationId,
        userId: currentUser?.id,
      },
    });
    res.status(200).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
