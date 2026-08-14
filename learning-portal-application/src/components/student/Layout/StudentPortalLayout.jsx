import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const StudentPortalLayout = () => {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <Outlet />
        </div>
      </section>
    </>
  );
};
export default StudentPortalLayout;
