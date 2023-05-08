import { Button, Stack } from "@mui/material";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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

export default DateSelect;
