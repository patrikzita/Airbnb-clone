import getRoomsData from "@/actions/getRoomsData";
import { RoomParams } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SearchParams = {
  page: number;
  pageSize: number;
  restParams: RoomParams;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const {
    page = 0,
    pageSize = 9,
    ...restParams
  } = req.query as Partial<SearchParams>;

  try {
    const room = await getRoomsData(page, pageSize, restParams);
    res.status(200).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
