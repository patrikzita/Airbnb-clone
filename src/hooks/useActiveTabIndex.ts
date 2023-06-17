import {
  authenticatedRoutes,
  routes,
  unauthenticatedRoutes,
} from "@/config/siteConfig";
import type { Session } from "next-auth";
import { useRouter } from "next/router";

export const useActiveTabIndex = (session: Session | null) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const tabsRoutes = session ? authenticatedRoutes : unauthenticatedRoutes;

  let activeIndex = Object.values(tabsRoutes).findIndex(
    (route) => currentPath === route
  );

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  return activeIndex;
};
