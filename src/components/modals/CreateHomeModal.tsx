import useCreateHomeModal from "@/hooks/useCreateHomeModal";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageUpload from "../Others/ImageUpload";
import CategorySelect from "../shared/inputs/CategorySelect";
import CountrySelect, {
  CountrySelectValue,
} from "../shared/inputs/CountrySelect";
import DateSelect from "../shared/inputs/DateSelect";
import InfoSelect from "../shared/inputs/InfoSelect";
import ModalContainer from "./Modal";
import axios from "axios";
import toast from "react-hot-toast";

type MainInfoSelectProps = {
  formik: FormikProps<FormikValues>;
};

const MainInfoSelect = ({ formik }: MainInfoSelectProps) => {
  return (
    <>
      <TextField
        label="Title"
        required
        color="secondary"
        variant="outlined"
        name="title"
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        label="Description"
        variant="outlined"
        color="secondary"
        name="description"
        onChange={formik.handleChange}
        multiline
        rows={4}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        placeholder="Describe your place..."
      />

      <TextField
        label="Price per day"
        variant="outlined"
        required
        type="number"
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
        color="secondary"
        sx={{
          width: "100%",
          mt: 2,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        inputProps={{ type: "number", min: 1 }}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
    </>
  );
};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  DATE = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
}

const Schema = z.object({
  location: z
    .object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
      latlng: z.array(z.number()),
    })
    .optional(),
  guestCount: z.number(),
  roomCount: z.number(),
  imageUrl: z.string(),
  title: z
    .string({ required_error: "Title is required." })
    .min(3, "Title is too short."),
  description: z.string().optional(),
  price: z.number({ required_error: "Number is required." }),
});

export type FormikValues = {
  category: string;
  location: null | CountrySelectValue;
  guestCount: number;
  roomCount: number;
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};

const CreateHomeModal = () => {
  const createHomeModal = useCreateHomeModal();
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik<FormikValues>({
    initialValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      date: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
      imageUrl: "dsds",
      title: "",
      description: "",
      price: 1,
    },
    onSubmit: (values) => {
      axios
        .post("/api/create-room", values)
        .then(() => {
          toast.success("New home was created!");
          setStep(0);
          createHomeModal.onClose();
          formik.resetForm();
        })
        .catch(() => {
          toast.error("Something get wrong!");
        });

      console.log(values);
    },
    validationSchema: toFormikValidationSchema(Schema),
  });

  const onSelectCategory = (category: string) => {
    formik.setFieldValue("category", category);
  };
  const onSelectLocation = (location: CountrySelectValue) => {
    formik.setFieldValue("location", location);
  };

  let body = (
    <>
      <Typography component="h2" variant="h5">
        Which of these best describes your place?
      </Typography>
      <Box
        sx={{
          overflow: "auto",
          maxHeight: "calc(100vh - 270px)", // Nastavte maximální výšku podle potřeby
        }}
      >
        <CategorySelect
          selectedCategory={formik.values.category}
          onSelectCategory={onSelectCategory}
          formik={formik}
        />
      </Box>
    </>
  );
  if (step === STEPS.LOCATION) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          Where people can find your place?
        </Typography>
        <CountrySelect
          value={formik.values.location}
          onChange={onSelectLocation}
        />
      </>
    );
  }
  if (step === STEPS.DATE) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          When is your place free?
        </Typography>
        <DateSelect
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue("date", value.selection)}
        />
      </>
    );
  }
  if (step === STEPS.INFO) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          Share some information about your place
        </Typography>
        <InfoSelect
          valueGuest={formik.values.guestCount}
          onChangeGuest={(value) => formik.setFieldValue("guestCount", value)}
          valueRoom={formik.values.roomCount}
          onChangeRoom={(value) => formik.setFieldValue("roomCount", value)}
        />
      </>
    );
  }
  if (step === STEPS.IMAGES) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          Add a photo of your place
        </Typography>
        <ImageUpload
          onSetImage={(value) => formik.setFieldValue("imageUrl", value)}
        />
      </>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          Describe your place
        </Typography>
        <MainInfoSelect formik={formik} />
      </>
    );
  }

  if (!createHomeModal.isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={createHomeModal.isOpen}
      onClose={createHomeModal.onClose}
      title="Airbnb your home"
      body={body}
      onSubmit={formik.handleSubmit}
      onBack={previousStep}
      onNext={nextStep}
      step={step}
      mobileBar
      totalSteps={Object.keys(STEPS).length / 2}
      submitLabel="Create"
    />
  );
};

export default CreateHomeModal;
