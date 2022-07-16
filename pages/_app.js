import { AppProvider } from 'providers/AppProvider'
import { ProductProvider } from 'providers/ProductProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
        </AppProvider>
    )
}

export default MyApp
