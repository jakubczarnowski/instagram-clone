"use client";
import { Navbar } from "~/components/Navbar/Navbar";
import { Sidebar } from "~/components/Sidebar/Sidebar";
import withPrivateRoute from "~/shared/hocs/withPrivateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="flex h-full w-full grow flex-col md:flex-row-reverse ">
      <div className="flex h-full w-full grow flex-col md:ml-[--sidebarMd] lg:ml-[--sidebarLg]">
        {children}
      </div>
      <Sidebar />
    </div>
  </>
);
export default withPrivateRoute(Layout);
