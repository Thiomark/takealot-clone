"use client";

import { createContext, FC, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import firebaseApp from "@/firebase/config";

type ContextState = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: ContextState = {
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
};

const FirebaseAuthContext = createContext<ContextState>(defaultContextValue);

const FirebaseAuthProvider: FC<FirebaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultContextValue.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false); // Add this flag
  const auth = getAuth(firebaseApp);

  const signIn = async (email: string, password: string): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error: AuthError): void => {
    // Handle error, e.g., display an error message to the user
    console.error("Authentication Error:", error.message);
  };

  const contextValue = { user, loading, signIn, signUp };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!user || authUser?.uid !== user?.uid) {
        setUser(authUser);
        if (shouldRedirect) {
          setShouldRedirect(false); // Reset the flag after redirect
          redirect("/admin");
        }
      }
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (!user) return;
    setShouldRedirect(true); // Set the flag before redirect
  }, [user]);

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider, FirebaseAuthContext };
