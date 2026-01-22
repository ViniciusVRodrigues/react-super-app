import './Icon.css';

interface IconProps {
  emoji: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Icon - A simple icon/emoji atom
 */
const Icon = ({ emoji, size = 'medium', className = '' }: IconProps) => (
  <span className={`icon icon--${size} ${className}`} role="img" aria-hidden="true">
    {emoji}
  </span>
);

export default Icon;
