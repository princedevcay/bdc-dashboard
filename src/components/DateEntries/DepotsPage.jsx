import { useState, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const initialDepots = [
  { id: 1, name: 'Depot 1' },
  { id: 2, name: 'Depot 2' },
  { id: 3, name: 'Depot 3' },
  // ... other initial depots ...
];

const DepotsPage = () => {
  const [depots, setDepots] = useState(initialDepots);
  const [newDepotName, setNewDepotName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingDepotId, setEditingDepotId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const toast = useToast();
  const cancelRef = useRef();

  const addDepot = () => {
    if (newDepotName) {
      const newDepot = { id: depots.length + 1, name: newDepotName };
      setDepots([...depots, newDepot]);
      setNewDepotName('');
      toast({
        title: 'Depot added.',
        description: "We've added the depot for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const startEditDepot = (depotId) => {
    const depot = depots.find(d => d.id === depotId);
    setNewDepotName(depot.name);
    setEditingDepotId(depotId);
    setIsEditing(true);
  };

  const editDepot = () => {
    if (newDepotName && editingDepotId) {
      setDepots(depots.map(depot => {
        if (depot.id === editingDepotId) {
          return { ...depot, name: newDepotName };
        }
        return depot;
      }));
      setNewDepotName('');
      setIsEditing(false);
      setEditingDepotId(null);
      toast({
        title: 'Depot updated.',
        description: "We've updated the depot for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteDepot = (depotId) => {
    setDepots(depots.filter((depot) => depot.id !== depotId));
    toast({
      title: 'Depot deleted.',
      description: "We've deleted the depot for you.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
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
    ? depots.filter(depot => depot.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : depots.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
  
      {/* Depots Table */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredDepots.map((depot) => (
            <Tr key={depot.id}>
              <Td>{depot.id}</Td>
              <Td>{depot.name}</Td>
              <Td>
                <IconButton aria-label="Edit depot" icon={<EditIcon />} onClick={() => startEditDepot(depot.id)} />
                <IconButton aria-label="Delete depot" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(depot.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
  
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
