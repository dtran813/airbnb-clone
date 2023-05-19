import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';

import EmptyState from '../components/EmptyState';
import FavoriteListingClient from './FavoriteListingClient';

const FavoriteListingsPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login!" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoriteListingClient listings={listings} currentUser={currentUser} />
  );
};

export default FavoriteListingsPage;
