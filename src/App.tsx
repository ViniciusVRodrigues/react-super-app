import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainTemplate } from './components';
import { RemoteWrapper } from './components';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import type { RemoteRouteConfig } from './types/routes';
import { loadMultipleRemoteRoutes, type RouteLoader } from './utils/loadRemoteRoutes';
import { createRemoteComponentByName } from './utils/createRemoteComponentByName';
import { remoteApps } from './config/remoteApps';
import { diagnoseAllRemotes } from './utils/diagnosticRemotes';
import './App.css';

function App() {
  const [remoteRoutes, setRemoteRoutes] = useState<RemoteRouteConfig[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      // Log remote configuration for debugging
      console.group('🚀 Super App - Remote Module Configuration');
      console.log('Base Path:', import.meta.env.VITE_BASE_PATH || '/');
      console.log('Todo App URL:', import.meta.env.VITE_TODO_APP_URL);
      console.log('Despensa App URL:', import.meta.env.VITE_DESPENSA_APP_URL);
      console.groupEnd();

      // Run diagnostics on remote entries (only in development or when needed)
      if (import.meta.env.DEV || import.meta.env.VITE_RUN_DIAGNOSTICS === 'true') {
        const remoteUrls: Record<string, string> = {};
        if (import.meta.env.VITE_TODO_APP_URL) {
          remoteUrls.todoApp = import.meta.env.VITE_TODO_APP_URL;
        }
        if (import.meta.env.VITE_DESPENSA_APP_URL) {
          remoteUrls.despensa_inteligente = import.meta.env.VITE_DESPENSA_APP_URL;
        }
        
        if (Object.keys(remoteUrls).length > 0) {
          await diagnoseAllRemotes(remoteUrls);
        }
      }

      // Get all enabled remote apps with route loaders
      const loaders = remoteApps
        .filter(app => app.enabled && app.routeLoader !== null)
        .map(app => ({
          loader: app.routeLoader as RouteLoader,
          appName: app.name,
        }));

      // Load routes from all remote apps
      const routes = await loadMultipleRemoteRoutes(loaders);
      setRemoteRoutes(routes);
      setIsLoadingRoutes(false);
    };

    loadRoutes();
  }, []); // remoteApps is a constant, safe to omit from dependencies

  // Get base path from environment variable, default to '/'
  const basename = import.meta.env.VITE_BASE_PATH || '/';

  return (
    <BrowserRouter basename={basename}>
      <MainTemplate remoteRoutes={remoteRoutes} isLoadingRoutes={isLoadingRoutes}>
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<ExampleRemotePage />} />
          
          {/* Dynamically loaded routes from remote apps */}
          {remoteRoutes.map((route) => {
            // Create the remote component dynamically based on name
            const RemoteComponent = createRemoteComponentByName(
              route.remoteApp,
              route.component
            );
            
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RemoteWrapper remoteComponent={RemoteComponent} />
                }
              />
            );
          })}
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  );
}

export default App;
