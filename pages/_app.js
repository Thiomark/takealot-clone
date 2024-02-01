import { AppProvider } from "../providers/AppProvider";
import { ProductProvider } from "../providers/ProductProvider";
import { FirebaseAuthProvider } from "../providers/FirebaseAuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <FirebaseAuthProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
      </FirebaseAuthProvider>
    </AppProvider>
  );
}

export default MyApp;
