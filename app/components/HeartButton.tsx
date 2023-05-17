'use client';

import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative transition cursor-pointer hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-rose-500/40'}
      />
    </div>
  );
};

export default HeartButton;
