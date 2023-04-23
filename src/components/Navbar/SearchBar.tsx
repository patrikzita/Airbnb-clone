import useSearchModal from "@/hooks/useSearchModal";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup } from "@mui/material";
const SearchBar = () => {
  const searchModal = useSearchModal();
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
        onClick={searchModal.onOpen}
      >
        Anywhere
      </Button>
      <Button
        sx={{
          fontWeight: "medium",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: ".9rem" },
        }}
        onClick={searchModal.onOpen}
      >
        Any week
      </Button>
      <Button
        sx={{
          fontWeight: "medium",
          letterSpacing: "3px",
          fontSize: { xs: ".7rem", sm: ".9rem" },
        }}
        onClick={searchModal.onOpen}
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
        onClick={searchModal.onOpen}
      >
        <SearchIcon sx={{ color: "common.white" }} />
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
