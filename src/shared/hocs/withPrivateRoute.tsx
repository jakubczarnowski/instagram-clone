"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingScreen } from "~/components/Spinner";
import { useUser } from "~/providers/AuthProvider";
import { api } from "~/utils/api";

const withPrivateRoute = <T extends object>(
  WrappedComponent: React.FunctionComponent<T>
) => {
  const ComponentWithPrivateRoute = (props: T) => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const { isLoading: isProfileLoading } = api.auth.getProfile.useQuery();
    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (!user || isLoading || isProfileLoading) return <LoadingScreen />;
    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};

export default withPrivateRoute;
