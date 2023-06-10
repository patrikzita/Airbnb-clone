import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
export default InfoSelect;
