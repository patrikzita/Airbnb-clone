import { CountryType, countries } from "@/utils/countries";
import {
  Autocomplete,
  Button,
  FormGroup,
  InputAdornment,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

const CountryPhoneNumberSelect = () => {
  const defaultCountry =
    countries.find((country) => country.code === "CZ") || null;
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    defaultCountry
  );
  const handleCountryChange = (event: any, newValue: CountryType | null) => {
    setSelectedCountry(newValue);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormGroup>
        <Autocomplete
          id="country-select"
          sx={{ width: "100%" }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => `${option.label} (+${option.phone})`}
          value={selectedCountry}
          onChange={handleCountryChange}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
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
        {selectedCountry && (
          <TextField
            label="Phone Number"
            variant="outlined"
            sx={{
              width: "100%",
              mt: 2,
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  margin: 0,
                },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  +{selectedCountry.phone}
                </InputAdornment>
              ),
            }}
            inputProps={{ type: "number" }}
          />
        )}
      </FormGroup>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: 2,
          paddingY: 1,
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default CountryPhoneNumberSelect;
