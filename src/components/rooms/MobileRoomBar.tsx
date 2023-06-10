import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { differenceInDays, isEqual } from "date-fns";
import { Range } from "react-date-range";

type MobileBarPriceProps = {
  price: number;
  nights: number;
  areDatesEqual: boolean;
};
const MobileBarPrice = ({
  price,
  nights,
  areDatesEqual,
}: MobileBarPriceProps) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    {!areDatesEqual && <Typography component="span">Total:</Typography>}
    <Typography component="h5" sx={{ fontWeight: "600" }}>
      {areDatesEqual
        ? "Add dates for prices"
        : `${formatCurrency(price * nights)} `}
    </Typography>
  </Box>
);

type MobileBarDateProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  areDatesEqual: boolean;
};
const MobileBarDateRange = ({
  startDate,
  endDate,
  areDatesEqual,
}: MobileBarDateProps) =>
  !areDatesEqual ? (
    <Typography>
      {`${formatDate(startDate ?? new Date())} - ${formatDate(
        endDate ?? new Date()
      )}`}
    </Typography>
  ) : null;

type MobileBarProps = {
  price: number;
  dateRange: Range;
  onSubmit: () => void;
};

const MobileRoomBar = ({ price, dateRange, onSubmit }: MobileBarProps) => {
  const nights = differenceInDays(
    dateRange.endDate ?? new Date(),
    dateRange.startDate ?? new Date()
  );
  const areDatesEqual = isEqual(
    dateRange.startDate ?? new Date(),
    dateRange.endDate ?? new Date()
  );
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "common.white",
        color: "black",
        height: "5rem",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 2 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <MobileBarPrice
            price={price}
            nights={nights}
            areDatesEqual={areDatesEqual}
          />
          <MobileBarDateRange
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            areDatesEqual={areDatesEqual}
          />
        </Box>
        <Button variant="contained" disabled={nights < 1} onClick={onSubmit}>
          Reserve
        </Button>
      </Box>
    </AppBar>
  );
};

export default MobileRoomBar;
