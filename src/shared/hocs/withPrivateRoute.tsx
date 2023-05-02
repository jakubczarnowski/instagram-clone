"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { LoadingScreen } from "~/components/Spinner";
import { useUser } from "~/providers/AuthProvider";

const withPrivateRoute = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: React.FunctionComponent<any>
) => {
  const ComponentWithPrivateRoute = (props: { children: ReactNode }) => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (!user || isLoading) return <LoadingScreen />;
    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};

export default withPrivateRoute;
