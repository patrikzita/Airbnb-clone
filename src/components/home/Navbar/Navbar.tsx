import { routes } from "@/config/siteConfig";
import { useActiveTabIndex } from "@/hooks/useActiveTabIndex";
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
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter as useRouterFromRouter } from "next/router";
import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";

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
type HideOnScrollProps = {
  children: React.ReactElement;
};
function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger} timeout={200}>
      {children}
    </Slide>
  );
}

type BottomBarProps = {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
};
const BottomBar = ({ session, status }: BottomBarProps) => {
  const router = useRouter();
  const activeTabIndex = useActiveTabIndex();

  if (status === "loading") {
    const circleSize = 40;
    return (
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, backgroundColor: "common.white" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-around", p: 1 }}>
            <Box>
              <Skeleton
                variant="circular"
                width={circleSize}
                height={circleSize}
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Box>
            <Box>
              <Skeleton
                variant="circular"
                width={circleSize}
                height={circleSize}
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Box>
            <Box>
              <Skeleton
                variant="circular"
                width={circleSize}
                height={circleSize}
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Box>
          </Box>
        </AppBar>
      </HideOnScroll>
    );
  }
  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "common.white" }}
      >
        <Tabs
          value={activeTabIndex}
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
          <Tab
            icon={<SearchIcon />}
            label="Explore"
            disableRipple
            onClick={() => router.push(routes.home)}
          />
          <Tab
            icon={<FavoriteBorderOutlinedIcon />}
            label="Wishlist"
            disableRipple
            onClick={() => router.push(routes.wishlists)}
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
              router.push(`${session ? routes.accountSettings : routes.login}`)
            }
          />
        </Tabs>
      </AppBar>
    </HideOnScroll>
  );
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const registerModal = useRegisterModal();
  const createHomeModal = useCreateHomeModal();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const router = useRouterFromRouter();

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

  const handlePushToUrl = (url: string) => {
    router.push(url);
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(209, 209, 209, 0.26)",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
          }}
        >
          <Link href={routes.home}>
            <Image
              src="/images/airbnb-icon.svg"
              alt="Airbnb logo"
              height="40"
              width="40"
            />
          </Link>
          {router.pathname === routes.home ||
          router.pathname.startsWith(`${routes.rooms}/`) ? (
            <SearchBar />
          ) : (
            <div></div>
          )}

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
                      <Typography textAlign="center">Messages</Typography>
                    </MenuItem>,
                    <MenuItem onClick={() => handlePushToUrl(routes.trips)}>
                      <Typography textAlign="center">Trips</Typography>
                    </MenuItem>,
                    <MenuItem onClick={() => handlePushToUrl(routes.wishlists)}>
                      <Typography textAlign="center">Wishlists</Typography>
                    </MenuItem>,
                    <Divider light />,
                    <MenuItem
                      onClick={() => handlePushToUrl(routes.properties)}
                    >
                      <Typography textAlign="center">My properties</Typography>
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
        {isMobile && router.pathname === routes.home && (
          <Toolbar
            sx={{
              justifyContent: "center",
              p: 2,
            }}
          >
            <MobileSearch />
          </Toolbar>
        )}
      </AppBar>

      {isMobile && !router.pathname.startsWith(`${routes.rooms}/`) && (
        <BottomBar session={session} status={status} />
      )}
    </>
  );
};

export default Navbar;
