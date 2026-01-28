import { Link, useLocation } from 'react-router-dom';
import { NavLink } from '../molecules';
import './Navbar.css';

interface NavItem {
  to: string;
  label: string;
}

interface NavbarProps {
  brand?: string;
  navItems: NavItem[];
  isLoadingRoutes?: boolean;
}

/**
 * Navbar - A navigation bar organism combining brand and navigation links
 * Now supports a loading state while routes are being fetched
 */
const Navbar = ({ brand = '🚀 Super App', navItems, isLoadingRoutes = false }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">{brand}</Link>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <NavLink 
            key={item.to}
            to={item.to} 
            label={item.label} 
            isActive={location.pathname === item.to} 
          />
        ))}
        {isLoadingRoutes && (
          <li className="nav-loading">
            <span>Carregando rotas...</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
