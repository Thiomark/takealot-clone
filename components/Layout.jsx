import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TakealotIcon from "./TakealotIcon";

const Layout = ({ title, children, showFooter, bg }) => {
  return (
    <div className={`${bg} min-h-screen flex flex-col`}>
      <ToastContainer />
      <HeaderComponent title={title} />
      <main className="flex-1 flex flex-col">{children}</main>
      {showFooter && <FooterComponent />}
    </div>
  );
};

export const CheckoutLayout = ({ children }) => {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <ToastContainer />
      <header className="hidden bg-white lg:block">
        <div className="container w-full px-10 py-4 mx-auto">
          <TakealotIcon />
        </div>
      </header>
      <main className="flex-1 flex flex-col bg-gray-100">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  showFooter: true,
  bg: "bg-gray-100",
};

export default Layout;
