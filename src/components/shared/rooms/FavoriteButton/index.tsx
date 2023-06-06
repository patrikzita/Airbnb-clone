import useFavorite from "@/hooks/useFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type FavoriteButtonProps = {
  roomId: string;
  label?: string;
};
export const FavoriteButton = ({ roomId, label }: FavoriteButtonProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  /* 
    TODO: Change for use react-query, Suspense?, Loading? 
  */
  useEffect(() => {
    axios
      .get("/api/current-user")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { hasFavorited, toggleFavorite } = useFavorite({
    roomId,
    currentUser,
  });

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleFavorite(event);
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    toggleFavorite(event);
  };

  return label ? (
    <Button
      variant="text"
      color="secondary"
      onClick={handleButtonClick}
      startIcon={
        <Checkbox
          icon={<FavoriteTwoToneIcon />}
          checkedIcon={<FavoriteIcon />}
          checked={hasFavorited}
          sx={{
            padding: 0,
            color: hasFavorited ? "primary.main" : "common.black",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      }
    >
      {label}
    </Button>
  ) : (
    <Checkbox
      icon={<FavoriteTwoToneIcon />}
      checkedIcon={<FavoriteIcon />}
      checked={hasFavorited}
      onChange={handleClick}
      sx={{
        backgroundColor: "common.white",
        color: hasFavorited ? "primary.main" : "common.black",
        "&:hover": {
          backgroundColor: "common.white",
          transform: "scale(1.1)",
        },
      }}
    />
  );
};
