import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container relative">
        <Sidebar />
        <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
          <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
