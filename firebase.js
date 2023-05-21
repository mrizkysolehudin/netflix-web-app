import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// config di project setting (firebase)
const firebaseConfig = {
	apiKey: "AIzaSyCxzd9sQa3mR59I4Qf32yaU4Mrw8el6GEw",
	authDomain: "netflix-app-9c18a.firebaseapp.com",
	projectId: "netflix-app-9c18a",
	storageBucket: "netflix-app-9c18a.appspot.com",
	messagingSenderId: "420822918810",
	appId: "1:420822918810:web:f81da6ff74bdbcdd2de123",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const auth = getAuth();

export { db, auth };
export default app;
