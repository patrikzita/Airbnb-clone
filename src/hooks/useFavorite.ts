import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useRegisterModal from "./useRegisterModal";
import { useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type useFavoriteProps = {
  listingId: string;
  currentUser?: User | null;
};

const useFavorite = ({ listingId, currentUser }: useFavoriteProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return registerModal.onOpen();
      }

      try {
        let request;
        if (!hasFavorited) {
          request = () => axios.post(`/api/favorite/${listingId}`);
        } else {
          request = () => axios.delete(`/api/favorite/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [listingId, registerModal, router, currentUser, hasFavorited]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
