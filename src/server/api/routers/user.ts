import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { hashString } from "@/lib/crypto";
import { RegisterSchema } from "@/schemas/register.schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userWithGivenEmail = await ctx.db
          .select()
          .from(users)
          .where(eq(users.email, input.email));

        if (userWithGivenEmail.length > 0) {
          throw new TRPCClientError("User already exists");
        }

        const hash = await hashString(input.password);

        await ctx.db.insert(users).values({ ...input, password: hash });

        return { message: "Success!" };
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCClientError) {
          throw error;
        }
        throw new TRPCClientError(
          "Something went wrong while creating a new user",
        );
      }
    }),
});
