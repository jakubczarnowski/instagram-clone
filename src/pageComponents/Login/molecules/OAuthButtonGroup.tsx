"use client";

import React from "react";
import { type IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { type Provider } from "@supabase/supabase-js";
import { Button } from "~/components/ui/button";
import { supabase } from "~/shared/supabaseClient";

const providers: { name: string; icon: IconType; provider: Provider }[] = [
  { provider: "google", name: "Google", icon: FcGoogle },
  { provider: "github", name: "GitHub", icon: FaGithub },
];

export const OAuthButtonGroup = () => {
  const handleLogin = (provider: Provider) => {
    void supabase().auth.signInWithOAuth({ provider });
  };
  return (
    <div className="flex flex-col gap-4">
      {providers.map(({ name, icon: Icon, provider }) => (
        <Button
          variant={"outline"}
          key={provider}
          onClick={() => handleLogin(provider)}
        >
          <Icon className="mx-3 h-5 w-5" />
          Sign in with {name}
        </Button>
      ))}
    </div>
  );
};
