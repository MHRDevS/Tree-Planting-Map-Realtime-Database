import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBV_ofAanLAwRX-kEu-n6oroZPMPcBGBlM",
  authDomain: "tree-planting-app-a266c.firebaseapp.com",
  databaseURL: "https://tree-planting-app-a266c-default-rtdb.firebaseio.com",
  projectId: "tree-planting-app-a266c",
  storageBucket: "tree-planting-app-a266c.firebasestorage.app",
  messagingSenderId: "977654612260",
  appId: "1:977654612260:web:1d66304e4fd6c4e5ba73b1"
};

// Next.js fast-refresh ke dauran duplicate initialize hone se bachane ke liye:
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);