import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SERVER_BASE_URL } from "@/config/index";
import firebase_app from "@/firebase";

const axiosWithAuth = axios.create({
  baseURL: SERVER_BASE_URL,
});

const auth = getAuth(firebase_app);

axiosWithAuth.interceptors.request.use(
  async (config) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
          resolve(config);
        },
        reject
      );
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
