import { categories } from "@/utils/categories";
import { Box, Button, Container, Tabs, tabsClasses } from "@mui/material";
import { useSearchParams } from "next/navigation";
import CategoryItem from "../Others/CategoryItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const categoryIndex = categories.findIndex(
    (categoryItem) => categoryItem.label === category
  );
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          px: { xs: 0, md: 2 },
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Tabs
          value={categoryIndex !== -1 ? categoryIndex : false}
          variant="scrollable"
          indicatorColor="secondary"
          scrollButtons
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {categories.map((categoryItem) => (
            <CategoryItem
              key={categoryItem.label}
              label={categoryItem.label}
              icon={categoryItem.icon}
            />
          ))}
        </Tabs>
        <Button
          color="secondary"
          disableRipple
          sx={{
            display: { xs: "none", md: "flex" },
            border: "1px solid #ddd",
            minWidth: 90,
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "capitalize",
            py: 1,
            "&:hover": {
              backgroundColor: "none",
            },
          }}
        >
          <FilterAltIcon /> Filters
        </Button>
      </Box>
    </Container>
  );
};

export default Categories;
