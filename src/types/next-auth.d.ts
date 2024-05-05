import NextAuth from "next-auth";

interface Store {
  id: number;
}

interface StoreOwner {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  city: string;
  stores: Store[];
}

export interface User {
  token: string;
  storeOwner: StoreOwner;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
