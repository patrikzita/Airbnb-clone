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
import { useState, useMemo } from "react";
import dynamic from 'next/dynamic'
type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
  }
const CountrySelect = () => {
  const { getAll } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>();
  const handleCountryChange = (event: any, newValue: any | null) => {
    setSelectedCountry(newValue);
  };

  const Map = useMemo(() => dynamic(() => import('../Others/Map'), { 
    ssr: false 
  }), [selectedCountry]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormGroup>
        <Autocomplete
          id="country-select"
          sx={{ width: "100%" }}
          options={getAll()}
          autoHighlight
          getOptionLabel={(option) => `${option.flag} ${" "} ${option.label}, ${option.region}`}
          onChange={handleCountryChange}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{ display: "flex", flexDirection: "row", gap: 2 }}
            >
              <div>{option.flag}</div>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>{option.label},</Typography>
                <Typography component="p" variant="subtitle1" sx={{color:" rgb(115, 115, 115)"}}>{option.region}</Typography>
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
      <Map center={selectedCountry?.latlng} />
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: 2,
          paddingY: 1,
        }}
      >
        Next
      </Button>
    </Box>
  );
};

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
  const searchModal = useSearchModal();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={searchModal.isOpen}
        onClose={searchModal.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={searchModal.isOpen}>
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
              <IconButton onClick={searchModal.onClose}>
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
                Where do you wanna go?
              </Typography>
              <CountrySelect />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchModal;
