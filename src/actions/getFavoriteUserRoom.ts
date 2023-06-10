import client from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "./getCurrentUser";

const getFavoriteUserRoom = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      return [];
    }

    const favoritesRooms = await client.room.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavoritesRoom = favoritesRooms.map((favoriteRoom) => ({
      ...favoriteRoom,
      createdAt: favoriteRoom.createdAt.toString(),
      startDate: favoriteRoom.startDate.toString(),
      endDate: favoriteRoom.endDate.toString(),
    }));

    return safeFavoritesRoom;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getFavoriteUserRoom;
