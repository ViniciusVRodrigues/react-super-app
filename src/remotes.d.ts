declare module 'todoApp/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, unknown>>;
  export default App;
}

declare module 'despensa_inteligente/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, unknown>>;
  export default App;
}

// Route declarations for dynamic route loading
declare module 'todoApp/routes' {
  import { RouteConfig } from './types/routes';
  const routes: RouteConfig[];
  export default routes;
}

declare module 'despensa_inteligente/routes' {
  import { RouteConfig } from './types/routes';
  const routes: RouteConfig[];
  export default routes;
}

// Add more remote module declarations as needed
// declare module 'remoteApp/routes' {
//   import { RouteConfig } from './types/routes';
//   const routes: RouteConfig[];
//   export default routes;
// }