import client from "@/libs/prisma";

const getUserRoomsData = async (userId?: string) => {
  try {
    const rooms = await client.room.findMany({
      where: {
        userId,
      },
    });

    if (!rooms) {
      return null;
    }
    const safeRooms = rooms.map((room) => ({
      ...room,
      createdAt: room.createdAt.toISOString(),
      startDate: room.startDate.toISOString(),
      endDate: room.endDate.toISOString(),
    }));

    return safeRooms;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getUserRoomsData;
