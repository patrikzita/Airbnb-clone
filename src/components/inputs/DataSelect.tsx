import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type DateSelectProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};
const DateSelect = ({ value, onChange, disabledDates }: DateSelectProps) => {
  return (
    <>
      <DateRange
        rangeColors={["#262626"]}
        date={new Date()}
        ranges={[value]}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        disabledDates={disabledDates}
        minDate={new Date()}
      />
    </>
  );
};

export default DateSelect;
