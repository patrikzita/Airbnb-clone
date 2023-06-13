import { z } from "zod";

export const createReservationRequestValidator = z.object({
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  roomId: z.string(),
});

export const createRoomRequestValidator = z.object({
  category: z.string(),
  location: z.object({
    flag: z.string(),
    value: z.string(),
    latlng: z.array(z.number().or(z.string())),
    region: z.string(),
  }),
  guestCount: z.number().or(z.string()),
  roomCount: z.number().or(z.string()),
  date: z.object({
    key: z.string(),
    startDate: z.date().or(z.string()),
    endDate: z.date().or(z.string()),
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
