import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TakealotIcon from "./TakealotIcon";
import SideNav from "@/components/account/SideNav";
import ProductHeaderComponent from "./single-product/ProductHeaderComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

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
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col`}>
        <ToastContainer />
        <header className="hidden bg-white lg:block">
          <div className="container w-full px-10 py-4 mx-auto">
            <TakealotIcon />
          </div>
        </header>
        <main className="flex-1 flex flex-col bg-gray-100">{children}</main>
      </div>
    </ProtectedRoute>
  );
};

export const AccountLayout = ({ title, children, showFooter, bg }) => {
  return (
    <ProtectedRoute>
      <div className={`${bg} min-h-screen flex flex-col`}>
        <ToastContainer />
        <HeaderComponent title={title} />
        <div className="sides w-full">
          <ProductHeaderComponent
            style={"hidden md:block"}
            showShare={false}
            links={["My Account", "Personal Details"]}
          />
        </div>
        <div className="grid w-full lg:grid-cols-[auto_1fr] sides">
          <aside className="hidden lg:block">
            <SideNav />
          </aside>
          <div>{children}</div>
        </div>
        {showFooter && <FooterComponent />}
      </div>
    </ProtectedRoute>
  );
};

Layout.defaultProps = {
  showFooter: true,
  bg: "bg-gray-100",
};

export default Layout;
