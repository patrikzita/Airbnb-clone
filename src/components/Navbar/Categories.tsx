import { categories } from "@/utils/categories";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import CategoryItem from "../Others/CategoryItem";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        sx={{
            width: {sm: "100%", md: "80%"},
            mx: "auto"
        }}
      >
        {categories.map((categoryItem) => (
          <CategoryItem
            key={categoryItem.label}
            label={categoryItem.label}
            icon={categoryItem.icon}
            selected={category === categoryItem.label}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Categories;
