import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4rem",
  backgroundColor: "white",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  gap: 1,
});

const SearchBar = () => {
  return (
    <ButtonGroup
      color="secondary"
      variant="outlined"
      sx={{
        justifyContent: "center",
        "& .MuiButton-root": {
          borderRadius: "4rem",
        },
      }}
    >
      <Button
        sx={{
          fontWeight: "bold",
          letterSpacing: "3px",
          paddingInline: 3,
          fontSize: { xs: ".7rem", sm: "1rem" },
        }}
      >
        Anywhere
      </Button>
      <Button
        sx={{
          fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: "1rem" },
        }}
      >
        Any week
      </Button>
      <Button
        sx={{
          fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: "1rem" },
        }}
      >
        Add guest
      </Button>
      <Button
        sx={{
          backgroundColor: "red",
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
