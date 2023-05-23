import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useRegisterModal from "./useRegisterModal";
import { useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type useFavoriteProps = {
  roomId: string;
  currentUser?: User | null;
};

const useFavorite = ({ roomId, currentUser }: useFavoriteProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(roomId);
  }, [roomId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return registerModal.onOpen();
      }

      try {
        let request;
        if (!hasFavorited) {
          request = () => axios.post(`/api/favorite/${roomId}`);
        } else {
          request = () => axios.delete(`/api/favorite/${roomId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [roomId, registerModal, router, currentUser, hasFavorited]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
