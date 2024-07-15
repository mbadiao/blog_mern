import Header from "./Header.js";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <main>
      <ToastContainer
        className="notification"
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Outlet />
      <footer className={{textAligne: "center"}}> &copy; 2024 @mbadiao. All Rights Reserved.</footer>
    </main>
  );
};

export default Layout;
