import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useRegisterModal from "./useRegisterModal";

type useFavoriteProps = {
  roomId: string;
  currentUser?: SafeUser | null;
};

const useFavorite = ({ roomId, currentUser }: useFavoriteProps) => {
  const registerModal = useRegisterModal();
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(roomId);
  }, [roomId, currentUser]);

  const toggleFavorite = useCallback(
    async (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();

      if (!currentUser) {
        registerModal.onOpen();
      } else {
        try {
          let request;
          let successMessage;
          if (!hasFavorited) {
            request = () => axios.post(`/api/favorite/${roomId}`);
            successMessage =
              "You have successfully added accommodation to wishlist";
          } else {
            request = () => axios.delete(`/api/favorite/${roomId}`);
            successMessage =
              "You have removed an accommodation from the wishlist";
          }
          await request();

          router.refresh();
          toast.success(successMessage);
        } catch (err) {
          toast.error("Something went wrong");
        }
      }
    },
    [roomId, registerModal, currentUser, hasFavorited]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
