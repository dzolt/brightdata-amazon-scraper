import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbREhYf7qI_gHWNIpWEVj63_zyjna2weU",
  authDomain: "brightdata-c0690.firebaseapp.com",
  projectId: "brightdata-c0690",
  storageBucket: "brightdata-c0690.appspot.com",
  messagingSenderId: "608839529601",
  appId: "1:608839529601:web:e8d5e4117fd4fed1ec4980",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
