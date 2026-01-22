declare module 'todoApp/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, unknown>>;
  export default App;
}

declare module 'eDespensa/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, unknown>>;
  export default App;
}

// Add more remote module declarations as needed
// declare module 'todoApp/OtherComponent' { ... }