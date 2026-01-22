import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainTemplate } from './components';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import TodoList from './pages/TodoList';
import EDespensa from './pages/EDespensa';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<ExampleRemotePage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/edespensa" element={<EDespensa />} />
          {/* Add more remote module routes here */}
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  );
}

export default App;
