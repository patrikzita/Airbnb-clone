import { z } from "zod";

export const createReservationRequestValidator = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  roomId: z.string(),
});

export const createRoomRequestValidator = z.object({
  category: z.string(),
  location: z.object({
    flag: z.string(),
    value: z.string(),
    latlng: z.array(z.number()),
    region: z.string(),
  }),
  guestCount: z.number(),
  roomCount: z.number(),
  date: z.object({
    key: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  }),
  imageUrl: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
});

export const getRoomsDataRequestValidator = z.object({
  page: z.string().nonempty().optional(),
  pageSize: z.string().nonempty().optional(),
  guestCount: z.string().nonempty().optional(),
  roomCount: z.string().nonempty().optional(),
  startDate: z.string().nonempty().optional(),
  endDate: z.string().nonempty().optional(),
  locationValue: z.string().nonempty().optional(),
  category: z.string().nonempty().optional(),
});

