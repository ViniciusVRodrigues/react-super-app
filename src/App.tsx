import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts';
import { MainTemplate } from './components';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import TodoAppPage from './pages/TodoAppPage';
import DespensaPage from './pages/DespensaPage';
import DespensaProductsPage from './pages/DespensaProductsPage';
import DespensaPantryPage from './pages/DespensaPantryPage';
import DespensaShoppingListPage from './pages/DespensaShoppingListPage';
import './App.css';

function App() {
  // Get base path from environment variable, default to '/'
  const basename = import.meta.env.VITE_BASE_PATH || '/';

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <MainTemplate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/example" element={<ExampleRemotePage />} />
            <Route path="/todo" element={<TodoAppPage />} />
            <Route path="/despensa" element={<DespensaPage />} />
            <Route path="/despensa/products" element={<DespensaProductsPage />} />
            <Route path="/despensa/pantry" element={<DespensaPantryPage />} />
            <Route path="/despensa/shopping-list" element={<DespensaShoppingListPage />} />
          </Routes>
        </MainTemplate>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
