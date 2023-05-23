import client from "@/libs/prisma";

const getRoomsData = async () => {
  try {
    const listings = await client.listing.findMany();

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      startDate: listing.startDate.toISOString(),
      endDate: listing.endDate.toISOString(),
    }));
    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getRoomsData;
