import { Stack, SvgIcon, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

type CategoryItemProps = {
  icon: typeof SvgIcon;
  label: string;
  selected: boolean;
};

const CategoryItem = ({ label, icon: Icon, selected }: CategoryItemProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, router, params]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      pb={1}
      sx={{
        borderBottom: "2px solid",
        borderColor: selected ? "customGray.main" : "transparent",
        transition: "border-color 0.3s",
        cursor: "pointer",
        ":hover": {
          borderColor: "customGray.main",
        },
      }}
      onClick={handleClick}
    >
      <Icon sx={{color: "customGray.main"}} />
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default CategoryItem;
