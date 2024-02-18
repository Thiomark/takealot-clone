import React, { useEffect, ReactNode } from "react";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect them to the login page, but save the current location they were trying to go to.
      router.push(`/account/login?redirect=${router.asPath}`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
