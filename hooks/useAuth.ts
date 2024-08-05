import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export function useAuth() {
  const { user, error, isLoading } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  return { user, error, isLoading, isAuthenticated };
}
