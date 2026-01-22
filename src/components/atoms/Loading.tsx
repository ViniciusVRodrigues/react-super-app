import './Loading.css';

interface LoadingProps {
  message?: string;
}

/**
 * Loading - A simple loading spinner atom
 */
const Loading = ({ message = 'Carregando módulo...' }: LoadingProps) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>{message}</p>
  </div>
);

export default Loading;
