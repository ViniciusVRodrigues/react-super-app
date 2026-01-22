import './ErrorMessage.css';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
}

/**
 * ErrorMessage - A simple error message atom
 */
const ErrorMessage = ({ 
  title = 'Oops! Algo deu errado',
  message = 'Não foi possível carregar este módulo.',
  details,
  onRetry 
}: ErrorMessageProps) => (
  <div className="error-message">
    <h2>{title}</h2>
    <p>{message}</p>
    {details && <p className="error-details">{details}</p>}
    {onRetry && (
      <button onClick={onRetry}>
        Tentar novamente
      </button>
    )}
  </div>
);

export default ErrorMessage;
