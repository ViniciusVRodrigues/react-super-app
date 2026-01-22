import { FeatureCard } from '../molecules';
import './FeaturesGrid.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

/**
 * FeaturesGrid - A grid organism for displaying multiple feature cards
 */
const FeaturesGrid = ({ features }: FeaturesGridProps) => (
  <div className="features-grid">
    {features.map((feature) => (
      <FeatureCard 
        key={feature.title}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    ))}
  </div>
);

export default FeaturesGrid;
