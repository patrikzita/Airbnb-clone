import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import useRegisterModal from "@/hooks/useRegisterModal";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
}));
const settings = ["Airbnb your home", "Host an experience", "Help"];

const Navbar = () => {
  const theme = useTheme();
  const registerModal = useRegisterModal();

  const isXsorSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return !isXsorSM ? (
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
          <Image
            src="/images/airbnb-icon.svg"
            alt="Airbnb logo"
            height="40"
            width="40"
          />
        </Link>
        <SearchBar />
        <Stack direction="row" gap={2} justifyContent="end">
          <Button
            color="secondary"
            sx={{
              display: { xs: "none", md: "block" },
              padding: ".5rem",
              borderRadius: "1rem",
              letterSpacing: "1px",
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
            <MenuItem onClick={registerModal.onOpen}>
              <Typography textAlign="center">Sign Up</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Sign In</Typography>
            </MenuItem>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </StyledToolBar>
    </AppBar>
  ) : null;
};

export default Navbar;
