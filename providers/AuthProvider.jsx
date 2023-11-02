import { createContext, useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { setCookie } from 'cookies-next';
import { toast } from "react-toastify";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserSession = async () => {
    const authUser = await supabase.auth.getUser();

    if (authUser && !user) {
      await updateUserProfile(authUser.id);
    } else if (!authUser && !cartIdFromCookie) {
      await createGuestUser(cartIdFromCookie);
    }
  };

  const updateUserProfile = async (userId) => {
    try {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("*, carts(*)")
        .eq("id", userId)
        .single();

      setCookie("cart_id", userProfile.carts.id);
      setUser(userProfile);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }

  const createGuestUser = async (cartIdFromCookie) => {
    if (cartIdFromCookie) {
      setCookie("cart_id", userProfile.carts.id);
      return;
    }

    try {
      const { data: cart_id, error } = await supabase.rpc(
        "create_guest_profile"
      );
      if (error) throw error;

      setCookie("cart_id", cart_id);
      // Handle your cart ID setting in state here
    } catch (error) {
      console.error("Error creating guest user:", error);
    }
  }

  useEffect(() => {
    checkUserSession();

    // const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   switch (event) {
    //     case "SIGNED_IN":
    //       await updateUserProfile(session.user.id);
    //       break;
    //     case "SIGNED_OUT":
    //       deleteCookie('cart_id');
    //       setUser(null);
    //       break;
    //   }
    // });

    // return () => {
    //   listener.unsubscribe();
    // };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
