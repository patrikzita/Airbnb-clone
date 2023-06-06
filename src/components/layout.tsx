import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import StickyHeader from "./Navbar/StickyHeader";
import CreateHomeModal from "./modals/CreateHomeModal";
import LoginModal from "./modals/LoginModal";
import SearchModal from "./modals/SearchModal";
import { routes } from "@/config/siteConfig";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <StickyHeader />
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />

      <LoginModal />
      <SearchModal />
      <CreateHomeModal />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
