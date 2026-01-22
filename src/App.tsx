import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExampleRemotePage from './pages/ExampleRemotePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<ExampleRemotePage />} />
          {/* Add more remote module routes here */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
