import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import axios from "axios";
import firebaseApp from "@/firebase";
import { SERVER_BASE_URL } from "@/config/index";

const auth = getAuth(firebaseApp);

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

export const FirebaseAuthProvider = ({
  children,
}: FirebaseAuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optional: Redirect after sign in
      router.push(router.query.redirect?.toString() || "/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Create user in Firebase for auth management
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Use backend endpoint to store additional user details
      await axios.post(`${SERVER_BASE_URL}/api/register`, {
        uid: userCredential.user.uid,
        email,
        name,
      });
      // Sign in the user after registration
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signInAnonymouslyHandler = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInAnonymously: signInAnonymouslyHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider");
  }
  return context;
};
