import { Icon } from '../atoms';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * FeatureCard - A card molecule displaying a feature with icon, title, and description
 */
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="feature-card">
    <Icon emoji={icon} size="large" className="feature-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureCard;
