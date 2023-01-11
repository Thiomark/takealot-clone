import { AppProvider } from '../providers/AppProvider'
import { AuthProvider } from '../providers/AuthProvider'
import { ProductProvider } from '../providers/ProductProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <AuthProvider>
                <ProductProvider>
                    <Component {...pageProps} />
                </ProductProvider>
            </AuthProvider>
        </AppProvider>
    )
}

export default MyApp
