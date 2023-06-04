import getRoomsData from "@/actions/getRoomsData";

import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const page = Number(req.query.page) || 0;
  const pageSize = Number(req.query.pageSize) || 3;
  try {
    const room = await getRoomsData(page, pageSize);
    console.log("Room v get-rooms: ", room);

    res.status(200).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
