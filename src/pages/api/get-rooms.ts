import getRoomsData from "@/actions/getRoomsData";
import { getRoomsDataRequestValidator } from "@/libs/apiRequestValidators";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type GetRoomRequest = z.infer<typeof getRoomsDataRequestValidator>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let query;
  try {
    query = getRoomsDataRequestValidator.parse(req.query);
  } catch (err) {
    return res.status(400).send({ error: "Invalid query parameters." });
  }
  const {
    page = "0",
    pageSize = "9",
    ...restParams
  } = req.query as Partial<GetRoomRequest>;

  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
    return res.status(400).send({ error: "Invalid page or pageSize value." });
  }

  try {
    const room = await getRoomsData(pageNumber, pageSizeNumber, restParams);
    res.status(200).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
