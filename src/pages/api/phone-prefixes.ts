import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://restcountries.com/v2/all");

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching fruit data:", error);
    res.status(500).json({ error: "Error fetching fruit data" });
  }
}
