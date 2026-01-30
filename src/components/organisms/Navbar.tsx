import { Link, useLocation } from 'react-router-dom';
import { NavLink, ThemeToggle } from '../molecules';
import './Navbar.css';

interface NavItem {
  to: string;
  label: string;
}

interface NavbarProps {
  brand?: string;
  navItems: NavItem[];
}

/**
 * Navbar - Barra de navegação com links
 */
const Navbar = ({ brand = '🚀 Super App', navItems }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">{brand}</Link>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              label={item.label} 
              isActive={location.pathname === item.to} 
            />
          ))}
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
