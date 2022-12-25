import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { verify } from "argon2";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { loginSchema } from "../../../utils/validation/auth-schemas";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "foo@bar.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = await loginSchema.parseAsync(credentials);
        console.log("\r\n\r\nUser\r\n====\r\n", prisma.user, "\r\n====\r\n");
        
        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verify(user.password, creds.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.log("JWT", token, user, account)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      console.log("SESSION", session, "\r\n===\r\n", token, "\r\n===\r\n", user)
      if(token && session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id as string;
      }

      return session;
    }
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/new-user",
  }
};

export default NextAuth(authOptions);
