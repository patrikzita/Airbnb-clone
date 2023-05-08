import { Button, Divider, Stack,Box, Typography, IconButton } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

type CounterProps = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const increaseCounter = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);
  const decreaseCounter = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2" component="div" sx={{ color: "gray" }}>
          {subtitle}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton
          aria-label="reduce"
          onClick={decreaseCounter}
          sx={{ border: "1px solid gray" }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6" sx={{ minWidth: "2rem", textAlign: "center" }}>
          {value}
        </Typography>
        <IconButton
          aria-label="add"
          onClick={increaseCounter}
          sx={{ border: "1px solid gray" }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Box>
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
export default InfoSelect;
