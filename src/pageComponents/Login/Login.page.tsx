import React from "react";
import { OAuthButtonGroup } from "./molecules/OAuthButtonGroup";
import { InstagramLogo } from "~/assets/instagram";

export const Login = () => {
  return (
    <main className="flex h-full grow items-center justify-center">
      <div className="flex h-[400px] w-[350px] flex-col items-center justify-around border border-slate-300">
        <InstagramLogo height="50px" className="mb-3 mt-8" />
        <OAuthButtonGroup />
      </div>
      <div className="">
        <p className="text-center text-slate-500"></p>
      </div>
    </main>
  );
};
