
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider, VStack
} from '@chakra-ui/react';
import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
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
        </Routes>
      </Router>
      <VStack spacing={8} minHeight="100vh" justifyContent="space-between">
       
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
