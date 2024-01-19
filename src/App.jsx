import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import MainLayout from './components/MainLayout';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Hello from './components/Hello';

function App() {
  const [cookies] = useCookies(['isAuthenticated']);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/hello' element={<Hello/>}/>
          {/* Protected Routes */}
          <Route
            path="/*"
            element={cookies.isAuthenticated ? <MainLayout /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
