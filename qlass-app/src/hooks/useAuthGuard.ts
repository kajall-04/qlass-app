"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import type { Role } from "@/types/auth";

export function useAuthGuard(requiredRole?: Role) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!user) {
      // In a real app, you might want to save the return URL
      // sessionStorage.setItem("returnUrl", pathname);
      router.push("/login");
      return;
    }

    // If a specific role is required and user doesn't match
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to their actual role dashboard
      router.push(`/${user.role}/dashboard`);
      return;
    }

    setIsChecking(false);
  }, [user, requiredRole, router, pathname]);

  return { isChecking, user };
}
