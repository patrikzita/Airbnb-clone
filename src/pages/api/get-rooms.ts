import getRoomsData from "@/actions/getRoomsData";

import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Dostal jsem se do get-rooms API");
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  try {
    const room = await getRoomsData(page, pageSize);
    console.log("Room v get-rooms: ", room);

    return room;
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
