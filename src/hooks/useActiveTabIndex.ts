import { routes } from "@/config/siteConfig";
import { useRouter } from "next/router";

export const useActiveTabIndex = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const tabsRoutes = Object.values(routes);
  let activeIndex = tabsRoutes.findIndex((route) => currentPath === route);
  if (activeIndex === -1) {
    activeIndex = 0;
  }

  return activeIndex;
};
