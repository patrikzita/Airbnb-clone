import client from "@/libs/prisma";

const getRoomsData = async () => {
  try {
    const rooms = await client.room.findMany();

    if(!rooms){
      return null;
    }

    const safeListings = rooms.map((room) => ({
      ...room,
      createdAt: room.createdAt.toISOString(),
      startDate: room.startDate.toISOString(),
      endDate: room.endDate.toISOString(),
    }));
    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getRoomsData;
