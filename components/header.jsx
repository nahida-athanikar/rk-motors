// Header.jsx (Server Component)
import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./header-client";


const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";

  return <HeaderClient isAdminPage={isAdminPage} isAdmin={isAdmin} />;
};


export default Header;
