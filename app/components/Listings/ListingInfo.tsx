'use client';

import useCountries from '@/app/hooks/useCountry';
import { User } from '@prisma/client';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-row items-center gap-2 font-semibold text-xl">
        <p>Hosted by {user?.name}</p>
        <Avatar src={user?.image} />
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <p>{guestCount} guests</p>
        <p>{roomCount} rooms</p>
        <p>{bathroomCount} bathrooms</p>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="font-light text-lg text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
