import DateSelect from "@/components/shared/inputs/DateSelect";
import useCountries from "@/hooks/useCountries";
import { checkIfDatesAreEqual, getNightsBetween } from "@/utils/dateUtils";
import { formatDate } from "@/utils/formatDate";
import { Box, Typography } from "@mui/material";
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  isAfter,
  isBefore,
  startOfDay,
} from "date-fns";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Range } from "react-date-range";

type RoomReservationProps = {
  locationValue: string;
  startDate: string;
  endDate: string;
  dateRange: Range;
  setDateRange: Dispatch<SetStateAction<Range>>;
  onSubmit: () => void;
};
const RoomReservation = ({
  locationValue,
  startDate,
  endDate,
  dateRange,
  setDateRange,
  onSubmit,
}: RoomReservationProps) => {
  const { getByValue } = useCountries();

  const locationDetails = getByValue(locationValue);
  const disabledDates = useMemo(() => {
    const availableStartDate = new Date(startDate);
    const availableEndDate = new Date(endDate);

    const allDays = eachDayOfInterval({
      start: startOfDay(addDays(new Date(), -1)),
      end: endOfDay(addDays(new Date(), 365)),
    });
    const disabledDates = allDays.filter((day) => {
      return (
        isBefore(day, availableStartDate) || isAfter(day, availableEndDate)
      );
    });

    return disabledDates;
  }, [startDate, endDate]);
  const nights = getNightsBetween(
    dateRange.startDate ?? new Date(),
    dateRange.endDate ?? new Date()
  );
  const areDatesEqual = checkIfDatesAreEqual(
    dateRange.startDate ?? new Date(),
    dateRange.endDate ?? new Date()
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h5" fontWeight={600}>
        {areDatesEqual
          ? "Select checkout date"
          : `${nights} ${nights > 1 ? "nights" : "night"} in ${
              locationDetails?.label
            }`}
      </Typography>
      <Typography variant="subtitle1">
        {areDatesEqual
          ? "Add your travel dates for exact pricing"
          : `${formatDate(dateRange.startDate ?? new Date())} - ${formatDate(
              dateRange.endDate ?? new Date()
            )}`}
      </Typography>
      <DateSelect
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
        disabledDates={disabledDates}
      />
    </Box>
  );
};
export default RoomReservation;
