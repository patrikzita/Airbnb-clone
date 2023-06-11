import { SvgIcon, Tab } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

type CategoryItemProps = {
  icon: typeof SvgIcon;
  label: string;
};

const CategoryItem = ({ label, icon: Icon }: CategoryItemProps) => {
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
    <Tab
      icon={<SvgIcon component={Icon} />}
      label={label}
      onClick={handleClick}
      disableRipple
      sx={{
        borderBottom: "2px solid",
        borderColor: "transparent",
        "&:hover": {
          borderColor: "#c1bcbc",
        },
      }}
    />
  );
};

export default CategoryItem;
