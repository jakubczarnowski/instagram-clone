"use client";
import { Navbar } from "~/components/Navbar/Navbar";
import { Sidebar } from "~/components/Sidebar/Sidebar";
import withPrivateRoute from "~/shared/hocs/withPrivateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="flex h-full w-full grow flex-col md:flex-row-reverse ">
      <div className="flex h-full w-full grow flex-col md:border-l">
        {children}
      </div>
      <div className="w-[80px] lg:w-[250px]">
        <Sidebar />
      </div>
    </div>
  </>
);
export default withPrivateRoute(Layout);
