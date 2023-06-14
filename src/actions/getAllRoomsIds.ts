import client from "@/libs/prisma";

const getAllRoomsIds = async () => {
  try {
    const rooms = await client.room.findMany({
      select: {
        id: true,
      },
    });

    if (!rooms) {
      return null;
    }

    return rooms.map((room) => room.id);
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getAllRoomsIds;
