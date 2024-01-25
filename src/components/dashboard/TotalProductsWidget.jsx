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
    <Box>
      <Heading size="md" my={2}>
        Total Products
      </Heading>
      <Box mx={4} my={2}>
        <Alert status="info">
          Products: {totalProducts}
        </Alert>
      </Box>
    </Box>
  );
};

export default TotalProductsWidget;
