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
  padding: 2,
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
      <Button>Anywhere</Button>
      <Button>Any week</Button>
      <Button>Add guest</Button>
      <Button
        sx={{
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        <SearchIcon sx={{ color: "common.white" }} />
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
