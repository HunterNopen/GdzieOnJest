import logo from './logo.svg';
import './Layout.css';

function Layout() {
  return (
    <div className="Layout">
      <header className="Layout-header">
        <img src={logo} className="Layout-logo" alt="logo" />
        <p>
          Edit <code>src/Layout.js</code> and save to reload.
        </p>
        <a
          className="Layout-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Layout;