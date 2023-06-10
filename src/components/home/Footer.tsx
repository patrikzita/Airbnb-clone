import {
  Box,
  Container,
  Typography,
  styled,
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { routes } from "@/config/siteConfig";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const footerData = {
  Support: [
    { name: "Help Center", url: "/help-center" },
    { name: "AirCover", url: "/aircover" },
    {
      name: "Supporting people with disabilities",
      url: "/support-people-with-disabilities",
    },
    { name: "Cancellation options", url: "/cancellation-options" },
    { name: "Our COVID-19 Response", url: "/covid-19-response" },
    { name: "Report a neighborhood concern", url: "/report-concern" },
  ],
  Community: [
    { name: "Airbnb.org: disaster relief housing", url: "/airbnb-org" },
    { name: "Combating discrimination", url: "/combating-discrimination" },
  ],
  Hosting: [
    { name: "Airbnb your home", url: "/airbnb-your-home" },
    { name: "AirCover for Hosts", url: "/aircover-for-hosts" },
    { name: "Explore hosting resources", url: "/hosting-resources" },
    { name: "Visit our community forum", url: "/community-forum" },
    { name: "How to host responsibly", url: "/host-responsibly" },
    { name: "Airbnb-friendly apartments", url: "/friendly-apartments" },
  ],
  Airbnb: [
    { name: "Newsroom", url: "/newsroom" },
    { name: "Learn about new features", url: "/new-features" },
    { name: "Letter from our founders", url: "/founders-letter" },
    { name: "Careers", url: "/careers" },
    { name: "Investors", url: "/investors" },
    { name: "Gift cards", url: "/gift-cards" },
  ],
};
const footerLinks = [
  { name: "Terms", url: "/help/terms" },
  { name: "Sitemap", url: "/help/site-map" },
  { name: "Privacy", url: "/help/privacy" },
];
const footerIcons = [
  { Icon: GitHubIcon, url: "https://github.com/patrikzita", target: "_blank" },
  { Icon: TwitterIcon, url: "https://twitter.com/patrikzit", target: "_blank" },
  {
    Icon: InstagramIcon,
    url: "https://www.instagram.com/patrikzita/",
    target: "_blank",
  },
];
const CustomLink = styled(Link)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 300,
  fontSize: ".9rem",
  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
  },
}));

const StyledFixedFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  backgroundColor: "#f7f7f7",
  borderTop: "1px solid #cccccc",
  paddingInline: theme.spacing(4),
  paddingBlock: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Footer = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        {Object.entries(footerData).map(([headline, links]) => (
          <Box component="section" key={headline}>
            <Typography fontWeight={500}>{headline}</Typography>
            <List component="ul">
              {links.map((link) => (
                <ListItem key={link.name} component="li" disableGutters>
                  <CustomLink href={link.url}>{link.name}</CustomLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Container>
    </Box>
  );
  return (
    <>
      {router.pathname === routes.home && (
        <>
          <StyledFixedFooter>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box>
                  <Typography>© 2023 PZ</Typography>
                </Box>
                {footerLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Typography component="span" fontSize="1.5rem">
                      ·
                    </Typography>
                    <Link href={link.url}>
                      <Typography>{link.name}</Typography>
                    </Link>
                  </React.Fragment>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {footerIcons.map((item, index) => (
                  <Link key={index} href={item.url} target={item.target}>
                    <item.Icon />
                  </Link>
                ))}
                <Button
                  onClick={toggleDrawer(true)}
                  color="secondary"
                  disableElevation
                  endIcon={<ExpandLessIcon />}
                >
                  Support & Resources
                </Button>
              </Box>
            </Container>
          </StyledFixedFooter>
          <Drawer
            anchor={"bottom"}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              ".MuiPaper-root": {
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              },
            }}
          >
            {list()}
          </Drawer>
        </>
      )}
      {router.pathname !== routes.home && (
        <Box
          component="footer"
          sx={{
            backgroundColor: "#f7f7f7",
            pt: 8,
            pb: { xs: "6rem", md: 3 },
            px: 5,
            borderTop: "1px solid #cccccc",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                gap: 6,
              }}
            >
              {Object.entries(footerData).map(([headline, links]) => (
                <Box flex={1} component="section" key={headline + links}>
                  <Typography fontWeight={500}>{headline}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: 3,
                      gap: 3,
                    }}
                    component="ul"
                  >
                    {links.map((link) => (
                      <Box
                        key={link.name}
                        component="li"
                        sx={{
                          listStyle: "none",
                        }}
                      >
                        <CustomLink href={link.url}>{link.name}</CustomLink>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "start", md: "center" },
                flexDirection: { xs: "column-reverse", md: "row" },
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: ".7rem", md: "1rem" },
                  }}
                >
                  © 2023 PZ
                </Typography>
                {footerLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Typography component="span" fontSize="1.5rem">
                      ·
                    </Typography>
                    <Link href={link.url}>
                      <Typography
                        sx={{
                          fontSize: { xs: ".7rem", md: "1rem" },
                        }}
                      >
                        {link.name}
                      </Typography>
                    </Link>
                  </React.Fragment>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {footerIcons.map((item, index) => (
                  <Link key={index} href={item.url} target={item.target}>
                    <item.Icon />
                  </Link>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Footer;
