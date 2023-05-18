import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalenderProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalenderProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      ranges={[value]}
      rangeColors={['#262626']}
      direction="vertical"
      date={new Date()}
      minDate={new Date()}
      showDateDisplay={false}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  );
};

export default Calendar;
