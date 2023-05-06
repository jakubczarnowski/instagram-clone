"use client";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { AuthProvider } from "~/providers/AuthProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
        </head>
        <body>
          <div className="flex h-full min-h-screen w-full flex-col items-center">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </body>
      </html>
    </>
  );
}
export default api.withTRPC(RootLayout);
