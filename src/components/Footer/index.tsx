import { Box, Container, Typography, styled, Divider } from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import { useRouter } from "next/router";
import { routes } from "@/config/siteConfig";
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
  return (
    <>
      {router.pathname === routes.home && (
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
            <Box sx={{ display: "flex", gap: 2 }}>
              {footerIcons.map((item, index) => (
                <Link key={index} href={item.url} target={item.target}>
                  <item.Icon />
                </Link>
              ))}
            </Box>
          </Container>
        </StyledFixedFooter>
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
