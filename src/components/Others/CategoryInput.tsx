import React from "react";
import { Box, SvgIcon, Typography } from "@mui/material";

type CategoryInputProps = {
  icon: typeof SvgIcon;
  label: string;
  selected?: boolean;
  onClick?: (value: string) => void;
};
const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: 2,
        gap: ".5rem",
        border: "1px solid",
        borderColor: selected ? "grey-800" :"grey.500",
        borderRadius: "0.75rem", 

      }}
    >
        <Icon />
        <Typography>{label}</Typography>

    </Box>
  );
};

export default CategoryInput;
