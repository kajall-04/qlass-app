import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { LoginFormData, RegisterFormData } from "@/schemas/auth.schema";

export function useAuth() {
  const router = useRouter();
  const loginStore = useAuthStore((s) => s.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await authenticateUser(data.identifier, data.password);
      
      if (result.success && result.user) {
        setSuccess("Login successful! Redirecting...");
        loginStore(result.user);
        setTimeout(() => {
          router.push(result.redirectPath || "/admin/dashboard");
        }, 800);
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (_data: RegisterFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Mocking a registration call since there's no registerUser in auth.service yet
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoading,
    error,
    success,
  };
}
