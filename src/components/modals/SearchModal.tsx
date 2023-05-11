import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Divider,
  FormGroup,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Range, DateRange, RangeKeyDict } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Counter from "../Others/Counter";
import { formatISO } from "date-fns";
import qs from "query-string";
import ModalContainer from "./Modal";
import DateSelect from "../shared/inputs/DateSelect";

type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  nextStep: () => void;
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};
const CountrySelect = ({ nextStep, value, onChange }: CountrySelectProps) => {
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
    </Box>
  );
};

type InfoSelectProps = {
  previousStep: () => void;
  valueGuest: number;
  onChangeGuest: (value: number) => void;
  valueRoom: number;
  onChangeRoom: (value: number) => void;
  onSubmit: () => void;
};
const InfoSelect = ({
  previousStep,
  valueGuest,
  onChangeGuest,
  valueRoom,
  onChangeRoom,
  onSubmit,
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
      <Stack direction="row" gap={2} mt={2}>
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
        >
          Search
        </Button>
      </Stack>
    </>
  );
};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
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
  const searchModal = useSearchModal();
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

  const onSubmit = useCallback(async () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const query: any = {
      ...currentQuery,
      locationValue: selectedCountry?.value,
      guestCount,
      roomCount,
    };

    if (dateRange.startDate) {
      query.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      query.endDate = formatISO(dateRange.endDate);
    }

    const newUrl = qs.stringifyUrl(
      {
        url: "/",
        query: query,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(newUrl);
  }, [
    step,
    searchModal,
    dateRange,
    router,
    params,
    guestCount,
    roomCount,
    selectedCountry,
  ]);

  let body = (
    <>
      <Typography component="h2" variant="h5">
        Where do you wanna go?
      </Typography>
      <CountrySelect
        nextStep={nextStep}
        value={selectedCountry}
        onChange={(value) => setSelectedCountry(value as CountrySelectValue)}
      />
    </>
  );
  if (step === STEPS.DATE) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          When do you want to go?
        </Typography>
        <DateSelect
          nextStep={nextStep}
          previousStep={previousStep}
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </>
    );
  }
  if (step === STEPS.INFO) {
    body = (
      <>
        <Typography component="h2" variant="h5">
          More details
        </Typography>
        <InfoSelect
          previousStep={previousStep}
          valueGuest={guestCount}
          onChangeGuest={(value) => setGuestCount(value)}
          valueRoom={roomCount}
          onChangeRoom={(value) => setRoomCount(value)}
          onSubmit={onSubmit}
        />
      </>
    );
  }

  if (!searchModal.isOpen) {
    return null;
  }

  return (
    <ModalContainer isOpen={searchModal.isOpen} onClose={searchModal.onClose} title="Filters" body={body} />
  );
};

export default SearchModal;
