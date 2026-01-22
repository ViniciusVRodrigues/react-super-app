import { Suspense } from 'react';
import type { ReactNode, ComponentType } from 'react';
import { Loading } from '../atoms';
import ErrorBoundary from '../ErrorBoundary';

interface RemoteWrapperProps {
  remoteComponent: React.LazyExoticComponent<ComponentType<Record<string, unknown>>>;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

/**
 * RemoteWrapper - An organism for safely loading federated modules
 * with error handling and loading states.
 * 
 * @example
 * import { createRemoteComponent } from '../../utils/createRemoteComponent';
 * 
 * const RemoteApp = createRemoteComponent(() => import('remoteApp/Component'));
 * 
 * // In your component
 * <RemoteWrapper remoteComponent={RemoteApp} />
 */
const RemoteWrapper = ({ remoteComponent: RemoteComponent, fallback, errorFallback }: RemoteWrapperProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || <Loading />}>
        <RemoteComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RemoteWrapper;
