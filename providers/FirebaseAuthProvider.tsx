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
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import axios from "axios";
import firebaseApp from "@/firebase";
import { SERVER_BASE_URL } from "@/config/index";
import { toast } from "react-toastify";
import firebaseErrorHandler from "@/utils/firebaseErrorHandler";
import { AddressType } from "@/types/cart";

const auth = getAuth(firebaseApp);

interface AuthContextType {
  user: FirebaseUser | null;
  addresses: Array<AddressType & { id: string }>; 
  loading: boolean;
  addAddress: (address: AddressType) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  fetchAddresses: () => Promise<void>;
  logout: () => Promise<void>;
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
  const [addresses, setAddresses] = useState<Array<AddressType & { id: string }>>([]);
  const router = useRouter();
  const db = getFirestore(firebaseApp);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(router.query.redirect?.toString() || "/");
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await axios.post(`${SERVER_BASE_URL}/api/register`, {
        uid: userCredential.user.uid,
        email,
        name,
      });
      await signIn(email, password);
    } catch (error: any) {
      toast.error(firebaseErrorHandler(error));
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

  const logout = async () => {
    await signOut(auth);
    // TODO should only go home if it is on protected routes
    router.push("/");
  };

  const addAddress = async (address: AddressType) => {
    if (!user) {
      // Redirect to login with a redirect back to the current page
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }
    try {
      await addDoc(collection(db, "addresses"), {
        ...address,
        userId: user.uid,
      });
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address: ", error);
      toast.error("Error adding address.");
    }
  };
  
  const deleteAddress = async (addressId: string) => {
    if (!user) {
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }
    try {
      await deleteDoc(doc(db, "addresses", addressId));
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address: ", error);
      toast.error("Error deleting address.");
    }
  };
  
  const fetchAddresses = async () => {
    if (!user) {
      return;
    }
    const fetchedAddresses: Array<AddressType & { id: string }> = [];
    try {
      const q = query(collection(db, "addresses"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        fetchedAddresses.push({ id: doc.id, ...(doc.data() as AddressType) });
      });
      setAddresses(fetchedAddresses); // Update the state instead of returning addresses
    } catch (error) {
      console.error("Error fetching addresses: ", error);
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
    addresses,
    loading,
    addAddress,
    deleteAddress,
    fetchAddresses,
    signIn,
    signUp,
    logout,
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
