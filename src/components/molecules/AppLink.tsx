import { Link } from 'react-router-dom';
import { Icon } from '../atoms';
import './AppLink.css';

interface AppLinkProps {
  to: string;
  icon: string;
  name: string;
}

/**
 * AppLink - A link molecule for app navigation with icon and name
 */
const AppLink = ({ to, icon, name }: AppLinkProps) => (
  <Link to={to} className="app-link">
    <Icon emoji={icon} size="medium" className="app-icon" />
    <span className="app-name">{name}</span>
  </Link>
);

export default AppLink;
