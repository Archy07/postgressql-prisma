// export default App
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;