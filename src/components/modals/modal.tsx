import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
};
const fetchData = async () => {
  const response = await axios.get("/api/phone-prefixes");
  const countries = response.data;
  const phonePrefixes = countries.map((country: any) => ({
    name: country.name,
    prefix: country.callingCodes[0],
  }));
  return phonePrefixes;
};

const CountrySelect = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Prefixes"],
    queryFn: fetchData,
  });

  const [selectedPrefix, setSelectedPrefix] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPrefix(event.target.value as string);
  };

  if (!data) return <h1>error</h1>;
  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="phone-prefix-select-label">Country/Region</InputLabel>
        <Select
          value={selectedPrefix}
          label="Country/Region"
          onChange={handleChange}
          disabled={isLoading}
        >
          {data.map((country: any) => (
            <MenuItem key={country.name} value={country.prefix}>
              {country.name} (+{country.prefix})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
