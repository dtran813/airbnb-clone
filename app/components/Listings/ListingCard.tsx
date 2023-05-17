'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountry';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

interface ListingCardProps {
  currentUser: User | null;
  data: Listing;
  reservation: Reservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = '',
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return <div>ListingCard</div>;
};

export default ListingCard;
