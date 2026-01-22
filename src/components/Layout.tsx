import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">🚀 Super App</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/example" className={location.pathname === '/example' ? 'active' : ''}>
              Exemplo
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>Super App © {new Date().getFullYear()} - Conectando aplicações com Module Federation</p>
      </footer>
    </div>
  );
};

export default Layout;
