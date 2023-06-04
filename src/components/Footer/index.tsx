import { Box, Container, Typography, styled, Divider } from "@mui/material";
import Link from "next/link";
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

const CustomLink = styled(Link)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 300,
  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
  },
}));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f7f7f7",
        pt: 8,
        pb: 3,
        px: 5,
        borderTop: "1px solid #cccccc",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {Object.entries(footerData).map(([headline, links]) => (
            <Box flex={1} component="section">
              <Typography fontWeight={500}>{headline}</Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", mt: 3, gap: 3 }}
                component="ul"
              >
                {/* 
                TODO: Udělat z Linku MATERIALUI komponentu
                */}
                {links.map((link) => (
                  <Box
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
        <Box></Box>
      </Container>
    </Box>
  );
};

export default Footer;
