import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/FirebaseAuthProvider";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("iotsoela@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      console.error("Login Error:", error);
      // Handle login error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login" showFooter={false}>
      <div className="bg-white flex-1 w-full sm:bg-transparent p-8 max-w-3xl mx-auto">
        <form onSubmit={submit} className="sm:bg-white p-12">
          <h1 className="font-bold mb-4 text-xl">Login</h1>
          <label className="text-sm" htmlFor="email">
            Email Address
          </label>
          <input
            required
            type="email"
            className="p-1.5 border w-full sm:p-0.5 text-sm px-4 mt-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm flex items-center justify-between py-3">
            <label htmlFor="password">Password</label>
            <Link href="#" className="hover:underline text-blue-450">
              Forgot Password
            </Link>
          </div>
          <input
            required
            type="password"
            className="p-1.5 border w-full sm:p-0.5 text-sm px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-center space-y-5 mt-20">
            <button
              type="submit"
              className="flex items-center bg-blue-450 text-white py-2 px-12 text-sm space-x-2"
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi h-4 w-4 bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <span>{loading ? "Loading..." : "Login"}</span>
            </button>
            <h1 className="text-sm text-center">
              New to Takealot?{" "}
              <Link
                href="/account/register"
                className="hover:underline text-blue-450"
              >
                Create account
              </Link>
            </h1>
          </div>
        </form>
        <div className="text-center mt-8 text-xs md:text-left">
          <p className="sm:text-left font-bold mb-2">
            Safe Shopping at Takealot
          </p>
          <p className="max-w-md mx-auto md:mx-0">
            Rest assured your transaction is safe. This technology safeguards
            your personal information and guarantees privacy.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
