import client from "@/libs/prisma";

type Params = {
  userId: string | undefined;
};

const getUsersReservations = async ({ userId }: Params) => {
  try {
    const reservations = await client.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: true,
      },
    });

    const safeReservations = reservations.map((reservation) => {
      return {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        room: {
          ...reservation.room,
          createdAt: reservation.createdAt.toISOString(),
          startDate: reservation.startDate.toISOString(),
          endDate: reservation.endDate.toISOString(),
        },
      };
    });
    return safeReservations;
  } catch (err: any) {
    throw new Error("Failed to fetch reservations");
  }
};

export default getUsersReservations;
