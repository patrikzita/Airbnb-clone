import { routes } from "@/config/siteConfig";
import { AppBar, useScrollTrigger } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Categories from "./Categories";
import Navbar from "./Navbar";

type ElevationScrollProps = {
  children: React.ReactElement;
};
function ElevationScroll({ children }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const StickyHeader = () => {
  const router = useRouter();

  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky" color="inherit">
          <Navbar />
          {router.pathname === routes.home && <Categories />}
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default StickyHeader;
