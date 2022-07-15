import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"

const Layout = ({title, children, showFooter}) => {
    return (
        <div className='bg-gray-100 min-h-screen flex flex-col'>
            <HeaderComponent title={title}/>
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            {showFooter && <FooterComponent /> }
        </div>
    )
}

Layout.defaultProps = {
    showFooter: true
}

export default Layout