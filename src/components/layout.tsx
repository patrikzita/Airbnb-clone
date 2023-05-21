import { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import CreateHomeModal from "./modals/CreateHomeModal";
import LoginModal from "./modals/LoginModal";
import SearchModal from "./modals/SearchModal";
import { Toaster } from "react-hot-toast";
import StickyHeader from "./Navbar/StickyHeader";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
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
    </>
  );
};

export default Layout;
