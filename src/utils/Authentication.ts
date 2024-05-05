import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

export default async function authenticate(type: string) {
  const session = await getServerSession(authOptions);
  if (type == "auth" && session) {
    return redirect("/dashboard");
  } else if (type == "notAuth" && !session) {
    return redirect("/");
  }
}
