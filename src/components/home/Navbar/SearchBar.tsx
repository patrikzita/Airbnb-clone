import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
const SearchBar = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [locationValue, getByValue]);

  const dateLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });
      } else if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })} - ${end.getDate()}`;
      } else {
        return `${start.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}`;
      }
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      const plular = Number(guestCount) > 1 ? " guests" : " guest";
      return guestCount + plular;
    }
    return "Add guest";
  }, [guestCount]);

  return (
    <ButtonGroup
      color="secondary"
      variant="outlined"
      disableRipple
      sx={{
        justifyContent: "center",
        padding: 0,
        "& .MuiButton-root": {
          borderWidth: "1px",
          borderRadius: "4rem",
          borderColor: "rgba(209, 209, 209, 0.5)",

        },
        "&:hover": {
          borderRadius: "4rem",
          borderColor: "rgba(209, 209, 209, 0.5)",
          boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.3)",
          transition: "200ms ease-in-out",
        },
      }}
    >
      <Button
        sx={{
          textTransform: "capitalize",
          fontWeight: "medium",
          fontSize: { xs: ".7rem", sm: ".9rem" },
          "&:hover": {
            borderColor: "rgba(209, 209, 209, 0.5)",
            borderRight: "1px solid rgba(209, 209, 209, 0.5)",
            borderLeft: "1px solid rgba(209, 209, 209, 0.5)",

          },
        }}
        onClick={searchModal.onOpen}
      >
        {locationLabel}
      </Button>
      <Button
        sx={{
          fontWeight: "medium",
          fontSize: { xs: ".7rem", sm: ".9rem" },
          "&:hover": {
            borderColor: "rgba(209, 209, 209, 0.5)",
            borderRight: "1px solid rgba(209, 209, 209, 0.5)",
            borderLeft: "1px solid rgba(209, 209, 209, 0.5)",
          },
        }}
        onClick={searchModal.onOpen}
      >
        {dateLabel}
      </Button>
      <Button
        sx={{
          fontWeight: "100",
          fontSize: { xs: ".7rem", sm: ".9rem" },
          textTransform: "capitalize",
          "&:hover": {
            borderColor: "rgba(209, 209, 209, 0.5)",
          },
        }}
        onClick={searchModal.onOpen}
      >
        {guestLabel}
        <Box sx={{ display: "flex", bgcolor: "red", p: "6px", borderRadius: "50%", marginLeft: 1 }}>
          <SearchIcon sx={{ color: "common.white", fontSize: "1.4rem" }} />
        </Box>
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
