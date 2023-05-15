import useCountries from "@/hooks/useCountries";
import useCreateHomeModal from "@/hooks/useCreateHomeModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useSearchModal from "@/hooks/useSearchModal";
import AirbnbIcon from "@/icons/AirbnbIcon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import { Session } from "next-auth";

const MobileSearch = () => {
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
    <Paper
      component="form"
      sx={{
        cursor: "pointer",
        p: "6px 4px",
        display: "flex",
        alignItems: "center",
        width: 500,
        border: "1px solid #ccc",
        borderRadius: 20,
        "&:hover": {
          boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.3)",
          transition: "200ms ease-in-out",
        },
      }}
      onClick={searchModal.onOpen}
    >
      <SearchIcon sx={{ flexGrow: "1" }} />
      <Stack sx={{ flexGrow: "3" }}>
        <Typography variant="body1">{locationLabel}</Typography>
        <Typography variant="caption">{`${dateLabel} • ${guestLabel}`}</Typography>
      </Stack>
      <TuneIcon sx={{ flexGrow: "1" }} />
    </Paper>
  );
};

type BottomBarProps = {
  session: Session | null;
};
const BottomBar = ({ session }: BottomBarProps) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "common.white" }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Mobile Menu Tabs"
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            "@media (max-width: 450px)": {
              minWidth: 0,
              fontSize: "12px",
            },
          },
        }}
      >
        <Tab icon={<SearchIcon />} label="Explore" disableRipple />
        <Tab
          icon={<FavoriteBorderOutlinedIcon />}
          label="Wishlist"
          disableRipple
        />

        {session && <Tab icon={<AirbnbIcon />} label="Trips" disableRipple />}
        {session && (
          <Tab
            icon={<ChatBubbleOutlineOutlinedIcon />}
            label="Inbox"
            disableRipple
          />
        )}

        <Tab
          icon={<AccountCircleOutlinedIcon />}
          label={session ? "Profile" : "Log in"}
          disableRipple
          onClick={() =>
            router.push(`${session ? "/account-settings" : "/login"}`)
          }
        />
      </Tabs>
    </AppBar>
  );
};

const Navbar = () => {
  const registerModal = useRegisterModal();
  const createHomeModal = useCreateHomeModal();
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenRegisterModal = () => {
    handleCloseUserMenu();
    registerModal.onOpen();
  };

  return (
    <div>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(209, 209, 209, 0.26)",
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
          }}
        >
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
              onClick={() => {
                if (!session) {
                  registerModal.onOpen();
                } else {
                  createHomeModal.onOpen();
                }
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
                    <MenuItem
                      onClick={() => {
                        if (!session) {
                          registerModal.onOpen();
                        } else {
                          createHomeModal.onOpen();
                        }
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">Airbnb my home</Typography>
                    </MenuItem>,
                    <Divider light />,
                    <MenuItem onClick={() => signOut()}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>,
                  ])
                : React.Children.toArray([
                    <MenuItem onClick={handleOpenRegisterModal}>
                      <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>,
                    <MenuItem onClick={handleOpenRegisterModal}>
                      <Typography textAlign="center">Log In</Typography>
                    </MenuItem>,
                    <Divider light />,
                    <MenuItem
                      onClick={() => {
                        if (!session) {
                          registerModal.onOpen();
                        } else {
                          createHomeModal.onOpen();
                        }
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">Airbnb my home</Typography>
                    </MenuItem>,
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Help</Typography>
                    </MenuItem>,
                  ])}
            </Menu>
          </Stack>
        </Toolbar>
        <Toolbar
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            p: 2,
          }}
        >
          <MobileSearch />
        </Toolbar>
      </AppBar>

      <Categories />
      {isMobile && <BottomBar session={session} />}
    </div>
  );
};

export default Navbar;
