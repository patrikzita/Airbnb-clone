import { getNightsBetween } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Range } from "react-date-range";

type ReservationSummaryProps = {
  dateRange: Range;
  price: number;
};

const ReservationSummary = ({ price, dateRange }: ReservationSummaryProps) => {
  const nights = getNightsBetween(
    dateRange.startDate ?? new Date(),
    dateRange.endDate ?? new Date()
  );

  return (
    <Box p={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: nights >= 1 ? "row" : "column",
          justifyContent: nights >= 1 ? "space-between" : "flex-start",
          alignItems: nights >= 1 ? "center" : "flex-start",
        }}
      >
        <Box>
          {nights >= 1 ? (
            <>
              <Typography
                component="span"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                }}
              >
                {formatCurrency(price)}
              </Typography>
              <Typography component="span" ml={1}>
                night
              </Typography>
            </>
          ) : (
            <Typography
              component="span"
              sx={{
                fontSize: "1.4rem",
                fontWeight: 500,
              }}
            >
              Add dates for prices
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <StarRateIcon sx={{ fontSize: "1.3rem" }} />
          <Typography component="span">5</Typography>
          <Typography component="span" sx={{ mx: 1 }}>
            ·
          </Typography>
          <Typography component="span">151 reviews</Typography>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ width: "100%", fontSize: "1.2rem", textTransform: "capitalize" }}
          disabled={nights < 1}
        >
          Reserve
        </Button>
      </Box>
      {nights >= 1 && (
        <Box>
          <Typography textAlign="center" my={1}>
            You won't be charged yet
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>{`${formatCurrency(price)} x ${nights} ${
                nights > 1 ? "nights" : "night"
              }`}</Typography>
            </Box>
            <Typography>{formatCurrency(price * nights)}</Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Total</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {formatCurrency(price * nights)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ReservationSummary;
