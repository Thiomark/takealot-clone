import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"

const Layout = ({title, children, showFooter, bg}) => {
    return (
        <div className={`${bg} min-h-screen flex flex-col`}>
            <HeaderComponent title={title}/>
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            {showFooter && <FooterComponent /> }
        </div>
    )
}

Layout.defaultProps = {
    showFooter: true,
    bg: 'bg-gray-100'
}

export default Layout