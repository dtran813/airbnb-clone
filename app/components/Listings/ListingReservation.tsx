'use client';

import { Range } from 'react-date-range';
import Calendar from '../Inputs/Calendar';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl border-neutral-200 border-[1px] overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="font-semibold text-2xl">
          $ {price} <span className="font-light text-neutral-600">night</span>
        </p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
    </div>
  );
};

export default ListingReservation;
