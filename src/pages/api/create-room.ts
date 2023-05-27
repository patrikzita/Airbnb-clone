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
      return res.status(500).send({ error: "Fatal error" });
    }
    const body = req.body;
    console.log("body", body);
    const {
      category,
      location,
      guestCount,
      roomCount,
      date,
      imageUrl,
      title,
      description,
      price,
    } = body;
    const room = await client.room.create({
      data: {
        category,
        locationValue: location.value,
        guestCount,
        roomCount,
        startDate: date.startDate,
        endDate: date.endDate,
        imageUrl,
        title,
        description,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
    return res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
