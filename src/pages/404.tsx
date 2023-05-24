import { routes } from "@/config/siteConfig";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, but the requested page was not found.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        onClick={() => router.push(routes.home)}
        sx={{ mt: 3 }}
      >
        Go back to the home page
      </Button>
    </Box>
  );
}
