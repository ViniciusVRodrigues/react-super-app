import { lazy } from 'react';
import type { ComponentType } from 'react';

/**
 * Factory function to create a lazy-loaded remote component.
 * Call this outside of your component render function.
 * 
 * @example
 * const RemoteApp = createRemoteComponent(() => import('remoteApp/Component'));
 * 
 * // In your component
 * <RemoteWrapper remoteComponent={RemoteApp} />
 */
export const createRemoteComponent = (
  loadComponent: () => Promise<{ default: ComponentType<Record<string, unknown>> }>
) => lazy(loadComponent);
