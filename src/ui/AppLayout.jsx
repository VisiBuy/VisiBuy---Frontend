import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <main
      className=" font-Montserrat visibuy"
      id="visibuy"
      style={{ paddingLeft: "0", maxWidth: "1600px" }}
    >
      <Header />

      <div>
        <Outlet />
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </main>
  );
}

export default AppLayout;
