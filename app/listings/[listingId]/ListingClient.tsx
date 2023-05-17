'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import { categories } from '@/app/components/Navbar/Categories';
import { Listing, Reservation, User } from '@prisma/client';
import { useMemo } from 'react';

interface ListingClientInterface {
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
  reservation?: Reservation[];
}

const ListingClient: React.FC<ListingClientInterface> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
