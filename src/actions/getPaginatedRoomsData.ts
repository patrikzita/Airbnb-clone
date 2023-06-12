import client from "@/libs/prisma";

const getPaginatedRoomsData = async (
  page: number,
  pageSize: number = 1,
  searchParams: any = {}
) => {
  try {
    let query: any = {};
    if (searchParams.category) {
      query.category = searchParams.category;
    }

    if (searchParams.roomCount) {
      query.roomCount = {
        gte: +searchParams.roomCount,
      };
    }

    if (searchParams.guestCount) {
      query.guestCount = {
        gte: +searchParams.guestCount,
      };
    }

    if (searchParams.locationValue) {
      query.locationValue = searchParams.locationValue;
    }

    if (searchParams.startDate && searchParams.endDate) {
      query.startDate = {
        lte: new Date(searchParams.startDate),
      };
      query.endDate = {
        gte: new Date(searchParams.endDate),
      };
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: new Date(searchParams.startDate) },
                startDate: { lte: new Date(searchParams.startDate) },
              },
              {
                startDate: { lte: new Date(searchParams.endDate) },
                endDate: { gte: new Date(searchParams.endDate) },
              },
            ],
          },
        },
      };
    }
    if (page < 1) {
      page = 1;
    }

    const rooms = await client.room.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: query,
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

export default getPaginatedRoomsData;
