import { useState, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const initialBDCCompaniess = [
  { id: 1, name: 'ALFAPETRO' },
  { id: 2, name: 'ASTRA' },
  { id: 3, name: 'BATTOP' },
  { id: 4, name: 'BLUE OCEAN' },
  { id: 5, name: 'BOST (G4O)' },
  { id: 6, name: 'BOST - OLD' },
  { id: 7, name: 'CHASE' },
  { id: 8, name: 'CIRRUS' },
  { id: 9, name: 'DEEN PETRO' },
  { id: 10, name: 'DOME' },
  { id: 11, name: 'DOMINION' },
];

const BDCCompanies = () => {
  const [BDCCompaniess, setBDCCompaniess] = useState(initialBDCCompaniess);
  const [newBDCCompaniesName, setNewBDCCompaniesName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();
  const addBDCCompanies = () => {
    if (newBDCCompaniesName) {
      const newBDCCompanies = { id: BDCCompaniess.length + 1, name: newBDCCompaniesName };
      setBDCCompaniess([...BDCCompaniess, newBDCCompanies]);
      setNewBDCCompaniesName('');
      toast({
        title: 'BDCCompanies added.',
        description: "We've added the BDCCompanies for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteBDCCompanies = (BDCCompaniesId) => {
    setBDCCompaniess(BDCCompaniess.filter((BDCCompanies) => BDCCompanies.id !== BDCCompaniesId));
    toast({
      title: 'BDCCompanies deleted.',
      description: "We've deleted the BDCCompanies for you.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const editBDCCompanies = (BDCCompaniesId) => {
    // Placeholder for edit functionality
  };

  const sortBDCCompaniessAsc = () => {
    const sortedBDCCompaniess = [...BDCCompaniess].sort((a, b) => a.name.localeCompare(b.name));
    setBDCCompaniess(sortedBDCCompaniess);
  };

  const sortBDCCompaniessDesc = () => {
    const sortedBDCCompaniess = [...BDCCompaniess].sort((a, b) => b.name.localeCompare(a.name));
    setBDCCompaniess(sortedBDCCompaniess);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastBDCCompanies = currentPage * recordsPerPage;
  const indexOfFirstBDCCompanies = indexOfLastBDCCompanies - recordsPerPage;
  const currentBDCCompaniess = BDCCompaniess.slice(indexOfFirstBDCCompanies, indexOfLastBDCCompanies);
  const totalPages = Math.ceil(BDCCompaniess.length / recordsPerPage);

  const filteredBDCCompaniess = searchQuery
    ? BDCCompaniess.filter(BDCCompanies => BDCCompanies.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentBDCCompaniess;
  // AlertDialog related state and functions
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [BDCCompaniesToDelete, setBDCCompaniesToDelete] = useState(null);
  const cancelRef = useRef();

  const onOpenDeleteDialog = (BDCCompaniesId) => {
    setBDCCompaniesToDelete(BDCCompaniesId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteBDCCompanies = () => {
    deleteBDCCompanies(BDCCompaniesToDelete);
    onCloseDeleteDialog();
  };

  return (
    <Box p={4} mb={10}>
      <Flex gap={2} mb={4} alignItems="center">
        {/* Search Functionality */}
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search BDCCompanies"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search BDCCompanies"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
            />
          </InputRightElement>
        </InputGroup>
  
        {/* Add BDCCompanies */}
        <InputGroup size="md">
          <Input
            value={newBDCCompaniesName}
            onChange={(e) => setNewBDCCompaniesName(e.target.value)}
            placeholder="New BDCCompanies name"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label="Add BDCCompanies">
              <IconButton
                aria-label="Add BDCCompanies"
                icon={<AddIcon />}
                h="1.75rem" size="sm"
                onClick={addBDCCompanies}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
  
        {/* Sort BDCCompaniess */}
        <Tooltip label="Sort BDCCompaniess Ascending">
          <IconButton
            aria-label="Sort BDCCompaniess ascending"
            icon={<ArrowUpIcon />}
            onClick={sortBDCCompaniessAsc}
          />
        </Tooltip>
        <Tooltip label="Sort BDCCompaniess Descending">
          <IconButton
            aria-label="Sort BDCCompaniess descending"
            icon={<ArrowDownIcon />}
            onClick={sortBDCCompaniessDesc}
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
          {filteredBDCCompaniess.map((BDCCompanies) => (
            <Tr key={BDCCompanies.id}>
              <Td>{BDCCompanies.id}</Td>
              <Td>{BDCCompanies.name}</Td>
              <Td>
                <IconButton aria-label="Edit BDCCompanies" icon={<EditIcon />} onClick={() => editBDCCompanies(BDCCompanies.id)} />
                <IconButton aria-label="Delete BDCCompanies" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(BDCCompanies.id)} ml={2} />
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
              Delete BDCCompanies
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this BDCCompanies? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>No</Button>
              <Button colorScheme="red" onClick={confirmDeleteBDCCompanies} ml={3}>Yes</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
  
};

export default BDCCompanies;
