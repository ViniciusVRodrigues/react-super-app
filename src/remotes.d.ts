// Type declarations for remote modules exposed via Module Federation

// TodoApp components
declare module 'todoApp/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, unknown>>;
  export default App;
}

// Despensa Inteligente components
declare module 'despensa_inteligente/Dashboard' {
  import { ComponentType } from 'react';
  const Dashboard: ComponentType<Record<string, unknown>>;
  export default Dashboard;
}

declare module 'despensa_inteligente/Products' {
  import { ComponentType } from 'react';
  const Products: ComponentType<Record<string, unknown>>;
  export default Products;
}

declare module 'despensa_inteligente/Pantry' {
  import { ComponentType } from 'react';
  const Pantry: ComponentType<Record<string, unknown>>;
  export default Pantry;
}

declare module 'despensa_inteligente/ShoppingList' {
  import { ComponentType } from 'react';
  const ShoppingList: ComponentType<Record<string, unknown>>;
  export default ShoppingList;
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
// Example:
// declare module 'remoteApp/ComponentName' {
//   import { ComponentType } from 'react';
//   const ComponentName: ComponentType<Record<string, unknown>>;
//   export default ComponentName;
// }
//
// declare module 'remoteApp/routes' {
//   import { RouteConfig } from './types/routes';
//   const routes: RouteConfig[];
//   export default routes;
// }