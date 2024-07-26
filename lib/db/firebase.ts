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

export const setUser = async (user: User) => {
  return Promise.resolve();
};

export const setStore = async (props: AuthResult) => {
  return Promise.resolve();
};

export const setStoreUser = async (props: AuthResult) => {
  return Promise.resolve();
};

export const deleteUser = async (storeHash: string, userId: number) => {
  return Promise.resolve();
};

export const getStoreToken = async (storeHash: string) => {
  return '';
};

export const deleteStore = async (storeHash: string) => {
  return Promise.resolve();
};
