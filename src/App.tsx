import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import TodoList from './pages/TodoList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<ExampleRemotePage />} />
          <Route path="/todo" element={<TodoList />} />
          {/* Add more remote module routes here */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
