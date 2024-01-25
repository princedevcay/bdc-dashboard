import  { useEffect, useState } from 'react';
import { Box, Heading, Alert } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { fetchProducts } from '../../services/productService';

const TotalProductsWidget = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const productsData = await fetchProducts();
        const totalProductsCount = productsData.length;
        setTotalProducts(totalProductsCount);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
     <Heading size="md">TOTAL PRODUCTS</Heading>
     <Heading size="xl">{totalProducts}</Heading>
   </Box>
  );
};

export default TotalProductsWidget;
