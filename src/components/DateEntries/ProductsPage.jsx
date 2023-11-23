import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useToast,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

// Mock initial data
const initialProducts = [
  { id: 1, name: 'PREMIUM' },
  // ... other products
];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProductName, setNewProductName] = useState('');
  const toast = useToast();

  const addProduct = () => {
    if (newProductName) {
      const newProduct = { id: products.length + 1, name: newProductName };
      setProducts([...products, newProduct]);
      setNewProductName('');
      toast({
        title: 'Product added.',
        description: "We've added the product for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast({
      title: 'Product deleted.',
      description: "We've deleted the product for you.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  // Placeholder function for edit functionality
  const editProduct = (productId) => {
    // Edit functionality here
  };

  // Sorting functionality (ascending by name)
  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProducts(sortedProducts);
  };

  // Placeholder for pagination logic
  // In a real app, you would also handle page changes, etc.

  return (
    <Box p={4}>
      <Flex gap={2} mb={4}>
        <Input
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="New product name"
        />
        <Button onClick={addProduct} leftIcon={<AddIcon />}>
          Add Product
        </Button>
        <Button onClick={sortProducts}>Sort Products</Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>
                <IconButton
                  aria-label="Edit product"
                  icon={<EditIcon />}
                  onClick={() => editProduct(product.id)}
                />
                <IconButton
                  aria-label="Delete product"
                  icon={<DeleteIcon />}
                  onClick={() => deleteProduct(product.id)}
                  ml={2}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination components would go here */}
    </Box>
  );
};

export default ProductsPage;
