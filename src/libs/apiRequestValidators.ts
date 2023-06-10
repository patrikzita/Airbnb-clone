import { z } from "zod";

export const createReservationRequestValidator = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
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
  page: z.string().optional(),
  pageSize: z.number().optional(),
  guestCount: z.number().optional(),
  roomCount: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  locationValue: z.string().optional(),
  category: z.string().optional(),
});
