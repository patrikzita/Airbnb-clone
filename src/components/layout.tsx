import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./home/Footer";
import StickyHeader from "./home/Navbar/StickyHeader";
import CreateHomeModal from "./modals/CreateHomeModal";
import LoginModal from "./modals/LoginModal";
import SearchModal from "./modals/SearchModal";

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
      <Footer />
    </>
  );
};

export default Layout;
