import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const AuthContext = createContext({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logOut: async () => {},
	error: null,
	loading: null,
});

export const AuthProvider = ({ children }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setLoading(false);
			} else {
				setUser(null);
				setLoading(true);
				router.push("/login");
			}

			setInitialLoading(false);
		});
	}, [auth]);

	const signUp = async (email, password) => {
		setLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push("/");
				setLoading(false);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};

	const signIn = async (email, password) => {
		setLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push("/");
				setLoading(false);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};

	const logOut = async () => {
		setLoading(true);

		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};

	const memoedValue = useMemo(
		() => ({
			user,
			signUp,
			signIn,
			logOut,
			loading,
			error,
		}),
		[user, loading]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
