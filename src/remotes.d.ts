// Type declarations for remote modules exposed via Module Federation

// TodoApp components
declare module 'todoApp/HomePage' {
  import { ComponentType } from 'react';
  const HomePage: ComponentType<Record<string, unknown>>;
  export default HomePage;
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