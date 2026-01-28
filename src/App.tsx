import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainTemplate } from './components';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import type { RouteConfig } from './types/routes';
import { loadMultipleRemoteRoutes, type RouteLoader } from './utils/loadRemoteRoutes';
import { remoteApps } from './config/remoteApps';
import './App.css';

function App() {
  const [remoteRoutes, setRemoteRoutes] = useState<RouteConfig[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      // Get all enabled remote apps with route loaders
      const loaders = remoteApps
        .filter(app => app.enabled && app.routeLoader !== null)
        .map(app => app.routeLoader as RouteLoader);

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
          {remoteRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  );
}

export default App;
