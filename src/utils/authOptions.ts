import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "@/types/next-auth";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
          placeholder: "Email",
        },
        password: {
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { headers: { "Accept-Language": "en" } }
          );
          const { expireAt, ...user }: any = res.data.data;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ token, session }) {
      const user = token.user as User;

      session.user = user;
      return session;
    },
  },
};
