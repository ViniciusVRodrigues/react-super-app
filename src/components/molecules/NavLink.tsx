import { Link } from 'react-router-dom';
import './NavLink.css';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

/**
 * NavLink - A navigation link molecule combining Link with active state styling
 */
const NavLink = ({ to, label, isActive }: NavLinkProps) => (
  <li>
    <Link to={to} className={isActive ? 'nav-link active' : 'nav-link'}>
      {label}
    </Link>
  </li>
);

export default NavLink;
