import client from "@/libs/prisma";
type Params = {
  roomId: string;
};

const getAllReservations = async (params: Params) => {
  try {
    const { roomId } = params;
    const reservations = await client.reservation.findMany({
      where: {
        roomId: roomId,
      },
    });

    const safeReservations = reservations.map((reservation) => {
      return {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
      };
    });

    return safeReservations;
  } catch (err: any) {
    throw new Error("Failed to fetch reservations");
  }
};

export default getAllReservations;
