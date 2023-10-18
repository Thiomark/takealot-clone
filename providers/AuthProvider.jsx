import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    mobileNumber,
  }) => {
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      // You can use react-toastify here for better error handling
      return;
    }

    // Update additional user details in your profiles table
    const { data, error: updateError } = await supabase
      .from("profiles")
      .upsert([
        {
          id: user.id,
          name: firstName,
          surname: lastName,
          phone: mobileNumber,
        },
      ]);

    if (updateError) {
      console.error(updateError);
      return;
    }

    console.log(data);
  };

  return (
    <AuthContext.Provider value={{ user, error, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
