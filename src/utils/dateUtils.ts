import { differenceInDays, isEqual } from "date-fns";

export const getNightsBetween = (startDate: Date, endDate: Date) => {
  return differenceInDays(endDate, startDate);
};

export const checkIfDatesAreEqual = (date1: Date, date2: Date) => {
  return isEqual(date1, date2);
};
