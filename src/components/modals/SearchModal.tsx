import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import {
  Autocomplete,
  Divider,
  FormGroup,
  Stack,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Counter from "../Others/Counter";
import DateSelect from "../shared/inputs/DateSelect";
import ModalContainer from "./Modal";

type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};
const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
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
    </Box>
  );
};

type InfoSelectProps = {
  valueGuest: number;
  onChangeGuest: (value: number) => void;
  valueRoom: number;
  onChangeRoom: (value: number) => void;
};
const InfoSelect = ({
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
    </>
  );
};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
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

  const handleClearQuery = () => {
    router.push("/");
    searchModal.onClose();
  };

  let body = (
    <>
      <Typography component="h2" variant="h5">
        Where do you wanna go?
      </Typography>
      <CountrySelect
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
          valueGuest={guestCount}
          onChangeGuest={(value) => setGuestCount(value)}
          valueRoom={roomCount}
          onChangeRoom={(value) => setRoomCount(value)}
        />
      </>
    );
  }

  if (!searchModal.isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Filters"
      body={body}
      mobileBar
      step={step}
      totalSteps={Object.keys(STEPS).length / 2}
      onBack={previousStep}
      onNext={nextStep}
      onSubmit={onSubmit}
    />
  );
};

export default SearchModal;
