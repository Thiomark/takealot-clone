import { AppProvider } from "../providers/AppProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { CartProvider } from "../providers/CartProvider";
import { ProductProvider } from "../providers/ProductProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default MyApp;
