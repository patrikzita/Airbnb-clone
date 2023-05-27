import getCurrentUser from "@/actions/getCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      return res.status(500).send({ error: "Current use not found." });
    }

    const body = req.body;

    const { roomId, startDate, endDate, totalPrice } = body;

    if (!roomId || !startDate || !endDate || !totalPrice) {
      return res.status(400).send({ error: "Incomplete request data." });
    }

    const room = await client.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send({ error: "Room not found." }); // Room not found
    }

    /* 
    TODO: Zkontrolovat jestli room je available na request date
    */

    const updatedRoom = await client.room.update({
      where: {
        id: roomId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return res.json(updatedRoom);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating room reservation." });
  }
}
