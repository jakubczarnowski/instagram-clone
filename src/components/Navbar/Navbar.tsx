import React from "react";
import { InstagramLogo } from "~/assets/instagram";

export const Navbar = () => {
  return (
    <div className="flex flex-row px-4 py-2 md:hidden">
      <InstagramLogo height="50px" className="mb-3 mt-8" />
    </div>
  );
};
