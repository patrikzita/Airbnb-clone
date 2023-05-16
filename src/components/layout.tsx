import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import CreateHomeModal from "./modals/CreateHomeModal";
import LoginModal from "./modals/LoginModal";
import SearchModal from "./modals/SearchModal";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar session={session} />
      <LoginModal />
      <SearchModal />
      <CreateHomeModal />
      <main>{children}</main>
    </>
  );
};

export default Layout;
