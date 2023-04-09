import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup } from "@mui/material";
const SearchBar = () => {
  return (
    <ButtonGroup
      color="secondary"
      variant="outlined"
      sx={{
        justifyContent: "center",
        padding: 0,
        "& .MuiButton-root": {
          borderRadius: "4rem",
        },
      }}
    >
      <Button
        disableElevation
        sx={{
          fontWeight: "medium",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: ".9rem" },
        }}
      >
        Anywhere
      </Button>
      <Button
        sx={{
          fontWeight: "medium",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: ".9rem" },
        }}
      >
        Any week
      </Button>
      <Button
        sx={{
          fontWeight: "medium",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: ".9rem" },
        }}
      >
        Add guest
      </Button>
      <Button
        sx={{
          backgroundColor: "#ff9bad",
          "&:hover": {
            backgroundColor: "#ff7279",
          },
        }}
      >
        <SearchIcon sx={{ color: "common.white" }} />
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
