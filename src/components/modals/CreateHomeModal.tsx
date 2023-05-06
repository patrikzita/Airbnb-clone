import useCountries from "@/hooks/useCountries";
import useCreateHomeModal from "@/hooks/useCreateHomeModal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Tabs,
  TextField,
  tabsClasses,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Counter from "../Others/Counter";
import { categories } from "@/utils/categories";
import CategoryItem from "../Others/CategoryItem";
import CategoryInput from "../Others/CategoryInput";
import { useFormik } from "formik";

type CategorySelectProps = {
  nextStep: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const CategorySelect = ({
  nextStep,
  selectedCategory,
  onSelectCategory,
}: CategorySelectProps) => {
  // TODO: Změnit selection pro formik
  const params = useSearchParams();

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
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  nextStep: () => void;
  previousStep: () => void;
  value?: CountrySelectValue | null;
  onChange: (location: CountrySelectValue) => void;
};
const CountrySelect = ({
  nextStep,
  value,
  onChange,
  previousStep,
}: CountrySelectProps) => {
  const { getAll } = useCountries();
  const Map = useMemo(
    () =>
      dynamic(() => import("../Others/Map"), {
        ssr: false,
      }),
    [value]
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormGroup>
        <Autocomplete
          id="country-select"
          sx={{ width: "100%" }}
          options={getAll()}
          autoHighlight
          getOptionLabel={(option) =>
            `${option.flag} ${" "} ${option.label}, ${option.region}`
          }
          onChange={(event, newValue) =>
            onChange(newValue as CountrySelectValue)
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{ display: "flex", flexDirection: "row", gap: 2 }}
            >
              <div>{option.flag}</div>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>{option.label},</Typography>
                <Typography
                  component="p"
                  variant="subtitle1"
                  sx={{ color: " rgb(115, 115, 115)" }}
                >
                  {option.region}
                </Typography>
              </Stack>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      </FormGroup>
      <Divider light />
      <Map center={value?.latlng} />
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
          onClick={nextStep}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

type DateSelectProps = {
  nextStep: () => void;
  previousStep: () => void;
  value: Range;
  onChange: (value: RangeKeyDict) => void;
};
const DateSelect = ({
  nextStep,
  previousStep,
  value,
  onChange,
}: DateSelectProps) => {
  return (
    <>
      <DateRange
        rangeColors={["#262626"]}
        date={new Date()}
        ranges={[value]}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
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
          onClick={nextStep}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};
type InfoSelectProps = {
  nextStep: () => void;
  previousStep: () => void;
  valueGuest: number;
  onChangeGuest: (value: number) => void;
  valueRoom: number;
  onChangeRoom: (value: number) => void;
};
const InfoSelect = ({
  nextStep,
  previousStep,
  valueGuest,
  onChangeGuest,
  valueRoom,
  onChangeRoom,
}: InfoSelectProps) => {
  return (
    <>
      <Counter
        title="Guests"
        subtitle="How many guests are coming?"
        onChange={onChangeGuest}
        value={valueGuest}
      />
      <Divider />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you need?"
        onChange={onChangeRoom}
        value={valueRoom}
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
          onClick={nextStep}
        >
          Next
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
  PRICE = 6,
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
  const router = useRouter();
  const createHomeModal = useCreateHomeModal();
  const params = useSearchParams();
  const [step, setStep] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
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
      imageUrl: "",
      title: "",
      description: "",
      price: 1,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onSelectCategory = (category: string) => {
    formik.setFieldValue("category", category);
  };
  const onSelectLocation = (location: CountrySelectValue) => {
    formik.setFieldValue("location", location);
  };

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
              />
            )}
            {step === STEPS.LOCATION && (
              <CountrySelect
                nextStep={nextStep}
                previousStep={previousStep}
                value={formik.values.location}
                onChange={onSelectLocation}
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
          </Box>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateHomeModal;
