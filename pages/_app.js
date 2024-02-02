import { AppProvider } from "../providers/AppProvider";
import { ProductProvider } from "../providers/ProductProvider";
import { CartProvider } from "../providers/CartProvider";
import { FirebaseAuthProvider } from "../providers/FirebaseAuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <FirebaseAuthProvider>
        <ProductProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ProductProvider>
      </FirebaseAuthProvider>
    </AppProvider>
  );
}

export default MyApp;
