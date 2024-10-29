import type { DefaultSession, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "@/lib/validator";
import { LoginSchema } from "@/schemas/login.schema";
import { eq } from "drizzle-orm";
import { compareHash } from "@/lib/crypto";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, users } from "./db/schema";
import { UserRole } from "@/enums";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

declare module "next-auth" {
  interface User {
    role: keyof typeof UserRole;
  }

  interface Session {
    user: {
      role: keyof typeof UserRole;
      id: string;
    } & DefaultSession["user"];
  }
}

export default {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (!token.sub) return token;

      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, session, user }) {
      if (token.user.role && token.sub) {
        session.user.role = token.user.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          let user = null;
          const { email, password } = await LoginSchema.parseAsync(credentials);

          [user] = await db.select().from(users).where(eq(users.email, email));

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect = await compareHash(
            password,
            user.password ?? "",
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error(error);

          if (error instanceof z.ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
