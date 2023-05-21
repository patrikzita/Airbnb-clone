import React from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Categories from "./Categories";
import { routes } from "@/config/siteConfig";
import { AppBar, CssBaseline, useScrollTrigger } from "@mui/material";

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
        <AppBar position="sticky" color="transparent">
          <Navbar />
          {router.pathname === routes.home && <Categories />}
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default StickyHeader;
    