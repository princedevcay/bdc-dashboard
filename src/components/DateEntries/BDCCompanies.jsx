import { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack, Spinner,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import * as bdcService from '../../services/bdcService'; // Updated import for bdcService
import { useBDCCompaniesContext } from '../../contexts/BDCCompaniesContext';

const BDCCompanies = () => {
  const { BDCCompanies, setBDCCompanies } = useBDCCompaniesContext();
  const [newBDCCompanyName, setNewBDCCompanyName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingBDCCompanyId, setEditingBDCCompanyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const cancelRef = useRef();
  const recordsPerPage = 10;

  useEffect(() => {
    document.title = 'BDC Companies';
    return () => {
      document.title = 'Tor Monitoring & Control System'; // Reset the title when the component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bdcService.fetchBDCCompanies();
        setBDCCompanies(data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching BDC companies:', error.message);
      }
    };

    fetchData();
  }, [setBDCCompanies]);

  const addBDCCompany = async () => {
    if (newBDCCompanyName) {
      try {
        const data = await bdcService.createBDCCompany({ name: newBDCCompanyName });
        setBDCCompanies([...BDCCompanies, data]);
        setNewBDCCompanyName('');
        toast({
          title: 'BDC Company added.',
          description: 'New BDC Company Added Successfully.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error adding BDC Company:', error.message);
      }
    }
  };

  const startEditBDCCompany = (BDCCompanyId) => {
    const BDCCompany = BDCCompanies.find(bdc => bdc.id === BDCCompanyId);
    setNewBDCCompanyName(BDCCompany.title.rendered);
    setEditingBDCCompanyId(BDCCompanyId);
    setIsEditing(true);
  };

  const editBDCCompany = async () => {
    if (newBDCCompanyName && editingBDCCompanyId) {
      try {
        console.log('Editing BDC Company:', editingBDCCompanyId);
  
        const data = await bdcService.updateBDCCompany(editingBDCCompanyId, { name: newBDCCompanyName });
        console.log('API Response after edit:', data);
  
        const updatedBDCCompany = { ...BDCCompanies.find(bdc => bdc.id === editingBDCCompanyId), name: newBDCCompanyName };
        console.log('Updated BDC Company:', updatedBDCCompany);
  
        const updatedCompanies = BDCCompanies.map(bdc => (bdc.id === editingBDCCompanyId ? updatedBDCCompany : bdc));
        console.log('Updated BDC Companies Array:', updatedCompanies);
  
        setBDCCompanies(updatedCompanies);
  
        setNewBDCCompanyName('');
        setIsEditing(false);
        setEditingBDCCompanyId(null);
  
        toast({
          title: 'BDC Company updated.',
          description: 'BDC Company Updated Successfully.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating BDC Company:', error.message);
      }
    }
  };
  

  const deleteBDCCompany = async (BDCCompanyId) => {
    try {
      await bdcService.deleteBDCCompany(BDCCompanyId);
      setBDCCompanies(BDCCompanies.filter(bdc => bdc.id !== BDCCompanyId));
  
      toast({
        title: 'BDC Company deleted.',
        description: 'BDC Company Successfully deleted.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting BDC Company:', error.message);
    }
  };

  const onOpenDeleteDialog = (BDCCompanyId) => {
    setEditingBDCCompanyId(BDCCompanyId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteBDCCompany = async () => {
    try {
      await bdcService.deleteBDCCompany(editingBDCCompanyId);
      onCloseDeleteDialog();
      setBDCCompanies(BDCCompanies.filter(bdc => bdc.id !== editingBDCCompanyId));
      toast({
        title: 'BDC Company deleted.',
        description: 'BDC Company Successfully deleted.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting BDC Company:', error.message);
    }
  };

  const filteredBDCCompanies = searchQuery
  ? (BDCCompanies || []).filter(bdc => { // Add a nullish coalescing operator to handle undefined
      const title = bdc.title.rendered || '';
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    })
  : (BDCCompanies || []).slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);


  const totalPages = Math.ceil((BDCCompanies || []).length / recordsPerPage);


  return (
    <Box p={4} mb={10}>
      <Flex gap={2} mb={4} alignItems="center">
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search BDC Company"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search BDC Company"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
              variant="outline" colorScheme="blue"
            />
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md">
          <Input
            value={newBDCCompanyName || ''}
            onChange={(e) => setNewBDCCompanyName(e.target.value)}
            placeholder={isEditing ? 'Edit BDC Company' : 'Add New BDC Company'}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label={isEditing ? 'Confirm Edit' : 'Add BDC Company'}>
              <IconButton
                aria-label={isEditing ? 'Confirm edit' : 'Add BDC Company'}
                icon={isEditing ? <EditIcon /> : <AddIcon />}
                h="1.75rem" size="sm"
                onClick={isEditing ? editBDCCompany : addBDCCompany}
                variant="outline" colorScheme="blue"
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </Flex>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr bgColor="#0C4DA2">
              <Th color="white">ID</Th>
              <Th color="white">Name</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBDCCompanies.map((bdc) => (
              <Tr key={bdc.id}>
                <Td>{bdc.id}</Td>
                <Td>{bdc.title.rendered}</Td>
                <Td>
                  <IconButton aria-label="Edit BDC Company" icon={<EditIcon />} variant="outline" colorScheme="blue" onClick={() => startEditBDCCompany(bdc.id)} />
                  <IconButton aria-label="Delete BDC Company" icon={<DeleteIcon />} variant="outline" colorScheme="red" onClick={() => onOpenDeleteDialog(bdc.id)} ml={2} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Flex justifyContent="center" mt="4">
        <Stack direction="row" spacing={4}>
          <IconButton icon={<ArrowBackIcon />} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} isDisabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} colorScheme="blue"  onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </Button>
          ))}
          <IconButton icon={<ArrowForwardIcon />} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} isDisabled={currentPage === totalPages} />
        </Stack>
      </Flex>

      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={onCloseDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete BDC Company
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this BDC Company? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteBDCCompany} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default BDCCompanies;
