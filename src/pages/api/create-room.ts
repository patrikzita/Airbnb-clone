import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prisma";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

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
    } = req.body;

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    const { base64 } = await getPlaiceholder(buffer);

    const room = await client.room.create({
      data: {
        category,
        locationValue: location.value,
        guestCount: Number(guestCount),
        roomCount: Number(roomCount),
        startDate: date.startDate,
        endDate: date.endDate,
        imageUrl,
        imagePlaceholder: base64,
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
