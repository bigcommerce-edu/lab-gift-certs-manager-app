import { AuthResult } from "@/lib/auth";

export type Db = {
  setUser(user: User): Promise<void>
  setStore(props: AuthResult): Promise<void>
  setStoreUser(props: AuthResult): Promise<void>
  deleteUser(storeHash: string, userId: number): Promise<void>
  getStoreToken(storeHash: string): Promise<string | null>
  deleteStore(storeHash: string): Promise<void>
};

export type UserData = {
  email: string
  username?: string
}

export type User = UserData & {
  id: number
};
