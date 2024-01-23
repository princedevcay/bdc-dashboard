import { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { fetchDepots, createDepot, updateDepot, deleteDepot as deleteDepotApi } from '../../services/depotService';

const DepotsPage = () => {
  const [depots, setDepots] = useState([]);
  const [newDepotName, setNewDepotName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingDepotId, setEditingDepotId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const recordsPerPage = 10;
  const toast = useToast();
  const cancelRef = useRef();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchDepotsFromApi();
  }, []);

  const fetchDepotsFromApi = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const depotsData = await fetchDepots();
      setDepots(depotsData);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching depots:', error.message);
      setIsLoading(false); // Set loading to false in case of an error
      toast({
        title: 'Error',
        description: 'Failed to fetch depots',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addDepot = async () => {
    if (newDepotName) {
      try {
        const newDepot = await createDepot({ name: newDepotName });
        setDepots([...depots, newDepot]);
        setNewDepotName('');
        toast({
          title: 'Depot added.',
          description: "New Depot Added Successfully.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error adding depot:', error.message);
        toast({
          title: 'Error',
          description: 'Failed to add depot',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const startEditDepot = (depotId) => {
    const depot = depots.find(d => d.id === depotId);
    setNewDepotName(depot.title.rendered);
    setEditingDepotId(depotId);
    setIsEditing(true);
  };  

  const editDepot = async () => {
    if (newDepotName && editingDepotId) {
      try {
        const updatedDepot = await updateDepot(editingDepotId, { name: newDepotName });
        setDepots(depots.map(depot => (depot.id === editingDepotId ? updatedDepot : depot)));
        setNewDepotName('');
        setIsEditing(false);
        setEditingDepotId(null);
        toast({
          title: 'Depot updated.',
          description: "Depot Updated Successfully.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating depot:', error.message);
        toast({
          title: 'Error',
          description: 'Failed to update depot',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const deleteDepot = async (depotId) => {
    try {
      await deleteDepotApi(depotId);  // Make sure to call the correct function from depotService.js
      setDepots(depots.filter(depot => depot.id !== depotId));
      toast({
        title: 'Depot deleted.',
        description: "Depot Deleted Successfully.",
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting depot:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to delete depot',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  
  const onOpenDeleteDialog = (depotId) => {
    setEditingDepotId(depotId);
    setIsDeleteDialogOpen(true);
  };
  
  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  
  const confirmDeleteDepot = () => {
    deleteDepot(editingDepotId);
    onCloseDeleteDialog();
  };
  
  const filteredDepots = searchQuery
  ? depots.filter(depot => depot.title.rendered?.toLowerCase().includes(searchQuery.toLowerCase()))
  : depots.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const totalPages = Math.ceil(depots.length / recordsPerPage);

  return (
    <Box p={4} mb={10}>
      <Flex gap={2} mb={4} alignItems="center">
        {/* Search Functionality */}
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search depots"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search depots"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
            />
          </InputRightElement>
        </InputGroup>
  
        {/* Add/Edit Depot */}
        <InputGroup size="md">
          <Input
            value={newDepotName}
            onChange={(e) => setNewDepotName(e.target.value)}
            placeholder={isEditing ? "Edit depot name" : "New depot name"}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label={isEditing ? "Confirm Edit" : "Add Depot"}>
              <IconButton
                aria-label={isEditing ? "Confirm edit" : "Add depot"}
                icon={isEditing ? <EditIcon /> : <AddIcon />}
                h="1.75rem" size="sm"
                onClick={isEditing ? editDepot : addDepot}
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
          {filteredDepots.map((depot) => (
            <Tr key={depot.id}>
              <Td>{depot.id}</Td>
              <Td>{depot.title.rendered}</Td>
              <Td>
                <IconButton aria-label="Edit depot" icon={<EditIcon />} onClick={() => startEditDepot(depot.id)} />
                <IconButton aria-label="Delete depot" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(depot.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )}
      {/* Pagination Controls */}
      <Flex justifyContent="center" mt="4">
        <Stack direction="row" spacing={4}>
          <IconButton icon={<ArrowBackIcon />} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} isDisabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </Button>
          ))}
          <IconButton icon={<ArrowForwardIcon />} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} isDisabled={currentPage === totalPages} />
        </Stack>
      </Flex>
  
      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={onCloseDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Depot
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this depot? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteDepot} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );  
};

export default DepotsPage;
