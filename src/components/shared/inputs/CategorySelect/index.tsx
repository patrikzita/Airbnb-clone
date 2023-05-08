import CategoryInput from "@/components/Others/CategoryInput";
import { categories } from "@/utils/categories";
import { Button, Grid, Stack } from "@mui/material";
import { FormikProps } from "formik";
import { FormikValues } from "../../../modals/CreateHomeModal";

type CategorySelectProps = {
  nextStep: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  formik: FormikProps<FormikValues>;
};
const CategorySelect = ({
  nextStep,
  selectedCategory,
  onSelectCategory,
  formik,
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
      <Stack direction="row" gap={2} marginTop={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: 2,
            paddingY: 1,
          }}
          onClick={nextStep}
          disabled={!formik.values.category}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default CategorySelect;
