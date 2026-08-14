import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminLayout;
