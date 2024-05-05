import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export default async function getSession() {
  const session = await getServerSession(authOptions);

  if (session) return session.user;
  else return null;
}
