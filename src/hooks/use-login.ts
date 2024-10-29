import type z from "@/lib/validator";
import { DEFAULT_ROUTE } from "@/routes";
import { type LoginSchema } from "@/schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!response?.error) {
        return { message: "Successfully Logged in" };
      }

      switch (response?.error) {
        case "CredentialsSignin":
          throw new Error("Invalid Credentials");

        default:
          throw new Error("Invalid Credentials");
      }
    },
    onSuccess(_data, _variables, _context) {
      void router.push(DEFAULT_ROUTE);
    },
  });
}
