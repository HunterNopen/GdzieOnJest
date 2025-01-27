import logo from "./logo.svg";
import "./Layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="Layout">
      <header className="Layout-header">
        <main>
          <Outlet />
        </main>
      </header>
    </div>
  );
}

export default Layout;
