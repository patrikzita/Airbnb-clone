import client from "@/libs/prisma";

type Params = {
  roomId?: string;
};
export default async function getRoomById(params: Params) {
  const { roomId } = params;

  const room = await client.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      user: true,
    },
  });

  if (!room) {
    return null;
  }

  return {
    ...room,
    createdAt: room.createdAt.toString(),
    startDate: room.startDate.toString(),
    endDate: room.endDate.toString(),
    user: {
      ...room.user,
      createdAt: room.user.createdAt.toString(),
      updatedAt: room.user.updatedAt.toString(),
    },
  };
}
