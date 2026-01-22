import './Footer.css';

interface FooterProps {
  text?: string;
}

/**
 * Footer - A simple footer organism
 */
const Footer = ({ text = `Super App © ${new Date().getFullYear()} - Conectando aplicações com Module Federation` }: FooterProps) => (
  <footer className="footer">
    <p>{text}</p>
  </footer>
);

export default Footer;
