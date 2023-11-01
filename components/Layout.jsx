import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

Layout.defaultProps = {
  showFooter: true,
  bg: "bg-gray-100",
};

export default Layout;
