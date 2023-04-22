import { CountryType, countries } from "@/utils/countries";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
};

const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null)
  const handleCountryChange = (event: any, newValue: CountryType | null) => {
    setSelectedCountry(newValue);
  };
 

  console.log(selectedCountry);

  return (
    <Box>
      <FormGroup>
        <Autocomplete
          id="country-select"
          sx={{ width: "100%" }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => `${option.label} (+${option.phone})`}
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
            sx={{ width: "100%", mt: 2 }}
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
    </Box>
  );
};

const ModalContainer = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
}: ModalProps) => {
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
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
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
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={700}
                fontSize={16}
              >
                {title}
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
                Welcome to Airbnb
              </Typography>
              <CountrySelect />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalContainer;
