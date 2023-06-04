import client from "@/libs/prisma";

const getRoomsData = async (page: number, pageSize: number = 1) => {
  try {
    console.log("Dostal jsem se do getRoomsData");

    const rooms = await client.room.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    if (!rooms) {
      return null;
    }

    const safeListings = rooms.map((room) => ({
      ...room,
      createdAt: room.createdAt.toISOString(),
      startDate: room.startDate.toISOString(),
      endDate: room.endDate.toISOString(),
    }));

    console.log("SafeListings: ", safeListings);

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getRoomsData;
