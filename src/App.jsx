
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider
} from '@chakra-ui/react';
import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
// ... other imports ...

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<MainLayout />} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
        <Footer /> 
    </ChakraProvider>
  );
}

export default App;
