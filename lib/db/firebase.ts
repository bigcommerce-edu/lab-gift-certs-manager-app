import { User, UserData } from "@/types/db";
import { AuthResult } from "../auth";
import { initializeApp } from "firebase/app";
import { 
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc
} from "firebase/firestore";

const { FIRE_API_KEY, FIRE_DOMAIN, FIRE_PROJECT_ID } = process.env;

const app = initializeApp({
  apiKey: FIRE_API_KEY,
  authDomain: FIRE_DOMAIN,
  projectId: FIRE_PROJECT_ID,
});
const db = getFirestore(app);

export const setUser = async (user: User) => {
  if (!user) return Promise.resolve();

  const { email, id, username } = user;
  const ref = doc(db, 'users', String(id));
  const data: UserData = { email };

  if (username) {
    data.username = username;
  }

  await setDoc(ref, data, { merge: true });
};

export const setStore = async (props: AuthResult) => {
  const {
    access_token: accessToken,
    context,
    scope,
    user: { id },
  } = props;
  
  if (!accessToken || !scope) return Promise.resolve();

  const storeHash = context?.split('/')[1] || '';
  const ref = doc(db, 'store', storeHash);
  const data = { accessToken, adminId: id, scope };

  await setDoc(ref, data);
};

export const setStoreUser = async (props: AuthResult) => {
  const {
    context,
    user: { id: userId },
  } = props;

  if (!userId) return Promise.resolve();

  const storeHash = context.split('/')[1];
  const documentId = `${userId}_${storeHash}`;
  const ref = doc(db, 'storeUsers', documentId);

  await setDoc(ref, { storeHash });
};

export const deleteUser = async (storeHash: string, userId: number) => {
  const docId = `${userId}_${storeHash}`;
  const ref = doc(db, 'storeUsers', docId);

  await deleteDoc(ref);
};

export const getStoreToken = async (storeHash: string) => {
  if (!storeHash) return Promise.resolve();
  const storeDoc = await getDoc(doc(db, 'store', storeHash));

  return storeDoc.data()?.accessToken;
};

export const deleteStore = async (storeHash: string) => {
  const ref = doc(db, 'store', storeHash);
  await deleteDoc(ref);
};
