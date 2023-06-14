import React from "react";
import { Box, SvgIcon, Typography } from "@mui/material";

type CategoryInputProps = {
  icon: typeof SvgIcon;
  label: string;
  selected: boolean;
  onSelectCategory: (category: string) => void;
};
const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onSelectCategory,
}: CategoryInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: 2,
        gap: ".5rem",
        border: selected ? "2px solid" : "1px solid",
        borderColor: selected ? "grey-800" : "grey.500",
        borderRadius: "0.75rem",
      }}
      onClick={() => onSelectCategory(label)}
    >
      <Icon />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default CategoryInput;
