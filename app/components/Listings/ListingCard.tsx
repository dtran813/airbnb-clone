'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useCountries from '@/app/hooks/useCountry';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
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

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="w-full flex flex-col gap-2 mb-2">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="w-full h-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <p className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </p>
      <p className="font-light text-neutral-500">
        {reservationDate || data.category}
      </p>
      <div className="my-1 flex flex-row items-center gap-1">
        <p className="font-semibold">${price}</p>
        {!reservation && <span className="font-light">night</span>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
