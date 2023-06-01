import { Reservation, Room, User } from "@prisma/client";

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type SafeRoom = Omit<Room, "createdAt" | "startDate" | "endDate"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  user: SafeUser;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};