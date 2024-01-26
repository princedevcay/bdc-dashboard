import  { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack, Spinner,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import {
  AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon
} from '@chakra-ui/icons';
import * as ProductService from '../../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();

  const recordsPerPage = 10;

  useEffect(() => {
    document.title = 'Products';
    return () => {
      document.title = 'Tor Monitoring & Control System'; // Reset the title when the component unmounts
    };
  }, []);

  // Fetch products from the API when the component mounts
  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const productsData = await ProductService.fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []); // Fetch products when the component mounts

  // Function to add a new product
  const addProduct = () => {
    if (newProductName) {
      ProductService.createProduct({ title: { rendered: newProductName } })
        .then((data) => {
          setProducts([...products, data]);
          setNewProductName('');
          toast({
            title: 'Product added.',
            description: "We've added the product for you.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }
  };

  // Function to delete a product by ID
  const deleteProduct = async () => {
    if (productToDelete !== null) {
      try {
        setLoading(true);
        // Make an API call to delete the product
        await ProductService.deleteProduct(productToDelete);

        // Update the products array by filtering out the deleted product
        const updatedProducts = products.filter((product) => product.id !== productToDelete);

        setProducts(updatedProducts);
        toast({
          title: 'Product deleted.',
          description: "We've deleted the product for you.",
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
        onCloseDeleteDialog();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: 'Error Deleting Product',
          description: 'An error occurred while deleting the product.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to edit a product
  const editProduct = async () => {
    if (selectedProductId !== null && newProductName) {
      try {
        setLoading(true);
        // Make an API call to update the product
        const updatedProduct = await ProductService.updateProduct(selectedProductId, {
          title: { rendered: newProductName },
        });

        // Update the products array with the updated product
        const updatedProducts = products.map((product) => {
          if (product.id === selectedProductId) {
            return updatedProduct;
          }
          return product;
        });

        setProducts(updatedProducts);
        setNewProductName('');
        setSelectedProductId(null);

        toast({
          title: 'Product updated.',
          description: "We've updated the product for you.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating product:', error);
        toast({
          title: 'Error Updating Product',
          description: 'An error occurred while updating the product.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * recordsPerPage;

  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - recordsPerPage;

  // Slice the products array to get only the products for the current page
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages based on the number of products
  const totalPages = Math.ceil(products.length / recordsPerPage);

  // Function to handle opening the Delete Confirmation Dialog
  const onOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  // Function to handle closing the Delete Confirmation Dialog
  const onCloseDeleteDialog = () => {
    setProductToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box p={4} mb={10}>
    <Flex gap={2} mb={4} alignItems="center">
  {/* Search Functionality */}
  <InputGroup size="md">
    <Input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search products"
      pr="4.5rem"
    />
    <InputRightElement width="4.5rem">
      <IconButton
        aria-label="Search products"
        icon={<SearchIcon />}
        variant="outline" colorScheme="blue"
        h="1.75rem" size="sm"
      />
    </InputRightElement>
  </InputGroup>

  {/* Add/Edit Product */}
  <InputGroup size="md">
    <Input
      value={newProductName}
      onChange={(e) => setNewProductName(e.target.value)}
      placeholder={isEditing ? "Edit product name" : "New product name"}
      pr="4.5rem"
    />
    <InputRightElement width="4.5rem">
      <Tooltip label={isEditing ? "Confirm Edit" : "Add Product"}>
        <IconButton
          aria-label={isEditing ? "Confirm edit" : "Add product"}
          icon={isEditing ? <EditIcon /> : <AddIcon />}
          h="1.75rem" size="sm"
          variant="outline" colorScheme="blue"
          onClick={isEditing ? editProduct : addProduct}
        />
      </Tooltip>
    </InputRightElement>
  </InputGroup>
</Flex>


      {/* Display Spinner if loading */}
      {loading && <Flex justifyContent="center" alignItems="center" height="300px">
        <Spinner size="lg" color="blue.500" />
        </Flex>}

      {/* Display Table if not loading */}
      {!loading && (
        <Table variant="simple">
          <Thead>
            <Tr bgColor="#0C4DA2">
              <Th color="white">ID</Th>
              <Th color="white">Name</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentProducts.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title.rendered}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit product"
                    icon={<EditIcon />}
                    variant="outline" colorScheme="blue"
                    onClick={() => setSelectedProductId(product.id)}
                  />
                  <IconButton
                    aria-label="Delete product"
                    icon={<DeleteIcon />}
                    variant="outline" colorScheme="red"
                    onClick={() => onOpenDeleteDialog(product.id)}
                    ml={2}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Pagination Controls */}
      <Flex justifyContent="center" mt="4">
        <Stack direction="row" spacing={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              isActive={currentPage === i + 1}
              colorScheme="blue" 
            >
              {i + 1}
            </Button>
          ))}
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
          />
        </Stack>
      </Flex>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                No
              </Button>
              <Button colorScheme="red" onClick={deleteProduct} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductsPage;
