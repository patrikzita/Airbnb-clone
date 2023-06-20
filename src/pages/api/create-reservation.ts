import getCurrentUser from "@/actions/getCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/prisma";
import { getNightsBetween } from "@/utils/dateUtils";
import { createReservationRequestValidator } from "@/libs/apiRequestValidators";

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
      return res.status(401).send({
        error: "Sorry, you need to be logged in to perform this action.",
      });
    }

    const { roomId, startDate, endDate } =
      createReservationRequestValidator.parse(req.body);

    if (!roomId || !startDate || !endDate) {
      return res.status(422).send({ error: "Unprocessessable entity." });
    }
    const room = await client.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send({ error: "Room not found." }); // Room not found
    }

    if (room.userId === currentUser.id) {
      return res
        .status(422)
        .send({ error: "Sorry, but you cannot reserve your own property." });
    }

    const existingReservations = await client.reservation.findMany({
      where: {
        roomId: roomId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });

    if (existingReservations.length > 0) {
      return res
        .status(400)
        .send({ error: "Room is not available for the requested dates." });
    }
    const numberOfNights = getNightsBetween(
      new Date(startDate),
      new Date(endDate)
    );
    const totalPrice = numberOfNights * room.price;

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
