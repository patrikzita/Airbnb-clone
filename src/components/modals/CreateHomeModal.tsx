import useCreateHomeModal from "@/hooks/useCreateHomeModal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageUpload from "../Others/ImageUpload";
import CategorySelect from "../shared/inputs/CategorySelect";
import CountrySelect, { CountrySelectValue } from "../shared/inputs/CountrySelect";
import DateSelect from "../shared/inputs/DateSelect";
import InfoSelect from "../shared/inputs/InfoSelect";

type MainInfoSelectProps = {
  previousStep: () => void;
  nextStep: () => void;
  onSubmit: () => void;
  formik: FormikProps<FormikValues>;
};

const MainInfoSelect = ({
  previousStep,
  nextStep,
  onSubmit,
  formik,
}: MainInfoSelectProps) => {
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

      <Stack direction="row" gap={2}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            width: "100%",
            borderRadius: 2,
            paddingY: 1,
          }}
          onClick={previousStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: 2,
            paddingY: 1,
          }}
          onClick={onSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Create
        </Button>
      </Stack>
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
  location: z.object({
    value: z.string(),
    label: z.string(),
    flag: z.string(),
    latlng: z.array(z.number()),

  }).optional(),
  guestCount: z.number(),
  roomCount: z.number(),
  imageUrl: z.string(),
  title: z.string({ required_error: "Title is required." }).min(3, "Title is too short."),
  description: z.string().optional(),
  price: z.number({required_error: "Number is required."}),
});

export interface FormikValues {
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
}

const CreateHomeModal = () => {
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 568,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
  };
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
      console.log(values);
      setStep(0);
      createHomeModal.onClose();
      formik.resetForm();
    },
    validationSchema: toFormikValidationSchema(Schema),
  });

  const onSelectCategory = (category: string) => {
    formik.setFieldValue("category", category);
  };
  const onSelectLocation = (location: CountrySelectValue) => {
    formik.setFieldValue("location", location);
  };
  console.log(formik.errors);
  

  if (!createHomeModal.isOpen) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={createHomeModal.isOpen}
      onClose={createHomeModal.onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      disableEnforceFocus
    >
      <Fade in={createHomeModal.isOpen}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#f4f4f4",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingInline: 1,
              paddingY: 2,
            }}
          >
            <IconButton onClick={createHomeModal.onClose}>
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={700}
              fontSize={16}
            >
              Filters
            </Typography>
            <div></div>
          </Box>
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5" component="h2" fontWeight={500}>
              Create home for others
            </Typography>
            {step === STEPS.CATEGORY && (
              <CategorySelect
                nextStep={nextStep}
                selectedCategory={formik.values.category}
                onSelectCategory={onSelectCategory}
                formik={formik} 
              />
            )}
            {step === STEPS.LOCATION && (
              <CountrySelect
                nextStep={nextStep}
                previousStep={previousStep}
                value={formik.values.location}
                onChange={onSelectLocation}
                formik={formik}
              />
            )}
            {step === STEPS.DATE && (
              <DateSelect
                nextStep={nextStep}
                previousStep={previousStep}
                value={formik.values.date}
                onChange={(value) =>
                  formik.setFieldValue("date", value.selection)
                }
              />
            )}
            {step === STEPS.INFO && (
              <InfoSelect
                nextStep={nextStep}
                previousStep={previousStep}
                valueGuest={formik.values.guestCount}
                onChangeGuest={(value) =>
                  formik.setFieldValue("guestCount", value)
                }
                valueRoom={formik.values.roomCount}
                onChangeRoom={(value) =>
                  formik.setFieldValue("roomCount", value)
                }
              />
            )}
            {step === STEPS.IMAGES && (
              <ImageUpload
                nextStep={nextStep}
                previousStep={previousStep}
                onSetImage={(value) => formik.setFieldValue("imageUrl", value)}
              />
            )}
            {step === STEPS.DESCRIPTION && (
              <MainInfoSelect
                nextStep={nextStep}
                previousStep={previousStep}
                onSubmit={formik.handleSubmit}
                formik={formik}
              />
            )}
          </Box>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateHomeModal;
