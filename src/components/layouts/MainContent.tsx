import type { ReactNode } from "react";
import { Box } from "@mui/material";
const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        py: 3,
      }}
    >
      <Box
        component="main"
        sx={{
          width: "90%",
          marginInline: "auto",
          gap: 2,
          marginBottom: 5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;
