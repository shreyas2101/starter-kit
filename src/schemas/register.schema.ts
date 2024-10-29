import { UserRole } from "@/enums";
import z from "@/lib/validator";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(2),
  name: z.string().min(1),
  role: z.enum([UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER]),
});
