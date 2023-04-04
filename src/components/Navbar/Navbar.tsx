import {
  AppBar,
  Toolbar,
  styled,
  Box,
  Button,
  Menu,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  Typography,
  Stack,
  ButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-around",
  padding: 2,
  "& > *": {
    flex: "1",
  },
});
const settings = [
  "Sign Up",
  "Log in",
  "Airbnb your home",
  "Host an experience",
  "Help",
];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(209, 209, 209, 0.26)",
      }}
    >
      <StyledToolBar>
        <Link href="/">
          <img src="/airbnb-icon.svg" style={{ width: "35px" }} />
        </Link>
        <SearchBar />
        <Stack direction="row" gap={2} justifyContent="end">
          <Button
            color="secondary"
            sx={{
              padding: ".5rem",
              borderRadius: "1rem",
            }}
          >
            Airbnb your home
          </Button>
          <IconButton color="secondary">
            <LanguageIcon />
          </IconButton>
          <Button
            onClick={handleOpenUserMenu}
            sx={{
              p: 1,
              border: "1px solid rgba(209, 209, 209, 0.5)",
              borderRadius: "10px",
              "&:hover": {
                boxShadow: "0px 2px 1px 1px rgba(0,0,0,0.15)",
                backgroundColor: "common.white",
              },
            }}
          >
            <MenuIcon sx={{ mr: 1, color: "common.black" }} />
            <Avatar
              alt=""
              src="/static/images/avatar/2.jpg"
              sx={{ width: 24, height: 24 }}
            />
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
