import useCountries from "@/hooks/useCountries";
import {
  Autocomplete,
  Divider,
  FormGroup,
  Stack,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormikProps } from "formik";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FormikValues } from "../modals/CreateHomeModal";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue | null;
  onChange: (location: CountrySelectValue) => void;
};
const CountrySelect = ({
  value,
  onChange,
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
    </Box>
  );
};

export default CountrySelect;
