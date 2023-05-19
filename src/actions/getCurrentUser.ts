import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await client.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
