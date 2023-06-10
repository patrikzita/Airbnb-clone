import CategoryInput from "@/components/Others/CategoryInput";
import { categories } from "@/utils/categories";
import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import { FormikValues } from "../modals/CreateHomeModal";

type CategorySelectProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  formik: FormikProps<FormikValues>;
};
const CategorySelect = ({
  selectedCategory,
  onSelectCategory,
}: CategorySelectProps) => {
  return (
    <>
      <Grid container spacing={2}>
        {categories.map((categoryItem) => (
          <Grid item xs={12} sm={6} md={6} key={categoryItem.label}>
            <CategoryInput
              label={categoryItem.label}
              icon={categoryItem.icon}
              selected={selectedCategory === categoryItem.label}
              onSelectCategory={onSelectCategory}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategorySelect;
