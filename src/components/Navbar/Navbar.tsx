import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
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
import type { User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import useSearchModal from "@/hooks/useSearchModal";
import Categories from "./Categories";
import useCreateHomeModal from "@/hooks/useCreateHomeModal";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
}));

const Navbar = () => {
  const theme = useTheme();
  const registerModal = useRegisterModal();
  const createHomeModal = useCreateHomeModal();
  const { data: session } = useSession();

  const isXsorSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      {!isXsorSM ? (
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
                onClick={()=>{
                  createHomeModal.onOpen()
                  handleCloseUserMenu();
                }}
              >
                Airbnb your home
              </Button>
              <IconButton color="secondary">
                <LanguageIcon />
              </IconButton>
              <Button
                onClick={handleOpenUserMenu}
                color="secondary"
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
                  alt={`${session?.user?.name}'s name`}
                  src={session?.user?.image?.toString()}
                  sx={{ width: 30, height: 30 }}
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
                {session
                  ? React.Children.toArray([
                      <MenuItem>
                        <Typography textAlign="center">My trips</Typography>
                      </MenuItem>,
                      <MenuItem>
                        <Typography textAlign="center">My favorites</Typography>
                      </MenuItem>,
                      <MenuItem>
                        <Typography textAlign="center">
                          My reservations
                        </Typography>
                      </MenuItem>,
                      <MenuItem onClick={()=>{
                        createHomeModal.onOpen()
                        handleCloseUserMenu();
                      }}>
                        <Typography textAlign="center">
                          Airbnb my home
                        </Typography>
                      </MenuItem>,
                      <Divider light />,
                      <MenuItem onClick={() => signOut()}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>,
                    ])
                  : React.Children.toArray([
                      <MenuItem onClick={registerModal.onOpen}>
                        <Typography textAlign="center">Sign Up</Typography>
                      </MenuItem>,
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Log In</Typography>
                      </MenuItem>,
                      <Divider light />,
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          Airbnb my home
                        </Typography>
                      </MenuItem>,
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Help</Typography>
                      </MenuItem>,
                    ])}
              </Menu>
            </Stack>
          </StyledToolBar>
        </AppBar>
      ) : null}
      <Categories />
    </div>
  );
};

export default Navbar;
