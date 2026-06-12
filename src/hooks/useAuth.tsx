"use client";

import { useEffect, useState } from "react";
import { subscribeAuth, type AuthUser } from "@/lib/auth";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeAuth((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
  }, []);

  return { user, loading, session: user ? { user } : null };
};
