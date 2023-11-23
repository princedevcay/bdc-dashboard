import { useState, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const initialProducts = [
  { id: 1, name: 'Crude Oil' },
  { id: 2, name: 'LPG' },
  { id: 3, name: 'Light Naphtha' },
  { id: 4, name: 'Heavy Naphtha' },
  { id: 5, name: 'Straight Run Naphtha' },
  { id: 6, name: 'Condensate' },
  { id: 7, name: 'Gasoline Condensate Blend' },
  { id: 8, name: 'Gasoline' },
  { id: 9, name: 'Gasoil' },
  { id: 10, name: 'Kerosene' },
  { id: 11, name: 'ATK' },
  { id: 12, name: 'RFO' },
  { id: 13, name: 'AR' },
  { id: 14, name: 'Premix' },
  { id: 15, name: 'Marine Oil' },
  // ... other products ...
];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProductName, setNewProductName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  const editProduct = (productId) => {
    // Placeholder for edit functionality
  };

  const sortProductsAsc = () => {
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
  };

  const sortProductsDesc = () => {
    const sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setProducts(sortedProducts);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastProduct = currentPage * recordsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - recordsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / recordsPerPage);

  const filteredProducts = searchQuery
    ? products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentProducts;
  // AlertDialog related state and functions
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const cancelRef = useRef();

  const onOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteProduct = () => {
    deleteProduct(productToDelete);
    onCloseDeleteDialog();
  };

  return (
    <Box p={4}>
      <Flex gap={2} mb={4} alignItems="center">
        {/* Search Functionality */}
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search product"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
            />
          </InputRightElement>
        </InputGroup>
  
        {/* Add Product */}
        <InputGroup size="md">
          <Input
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="New product name"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label="Add Product">
              <IconButton
                aria-label="Add product"
                icon={<AddIcon />}
                h="1.75rem" size="sm"
                onClick={addProduct}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
  
        {/* Sort Products */}
        <Tooltip label="Sort Products Ascending">
          <IconButton
            aria-label="Sort products ascending"
            icon={<ArrowUpIcon />}
            onClick={sortProductsAsc}
          />
        </Tooltip>
        <Tooltip label="Sort Products Descending">
          <IconButton
            aria-label="Sort products descending"
            icon={<ArrowDownIcon />}
            onClick={sortProductsDesc}
          />
        </Tooltip>
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
          {filteredProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>
                <IconButton aria-label="Edit product" icon={<EditIcon />} onClick={() => editProduct(product.id)} />
                <IconButton aria-label="Delete product" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(product.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
  
      {/* Pagination Controls */}
      <Flex justifyContent="center" mt="4">
        <Stack direction="row" spacing={4}>
          <IconButton icon={<ArrowBackIcon />} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} isDisabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </Button>
          ))}
          <IconButton icon={<ArrowForwardIcon />} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages} />
        </Stack>
      </Flex>
  
      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={onCloseDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>No</Button>
              <Button colorScheme="red" onClick={confirmDeleteProduct} ml={3}>Yes</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
  
};

export default ProductsPage;
