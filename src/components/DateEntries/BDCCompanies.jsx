import { useState, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

// Replace this with actual BDC companies from your document
const initialBDCCompanies = [
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
  // ... add more BDC companies as necessary ...
];

const BDCCompanies = () => {
  const [BDCCompanies, setBDCCompanies] = useState(initialBDCCompanies);
  const [newBDCCompanyName, setNewBDCCompanyName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingBDCCompanyId, setEditingBDCCompanyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const toast = useToast();
  const cancelRef = useRef();

  const addBDCCompany = () => {
    if (newBDCCompanyName) {
      const newCompany = { id: BDCCompanies.length + 1, name: newBDCCompanyName };
      setBDCCompanies([...BDCCompanies, newCompany]);
      setNewBDCCompanyName('');
      toast({
        title: 'Company added.',
        description: "We've added the BDC company for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const startEditBDCCompany = (companyId) => {
    const company = BDCCompanies.find(c => c.id === companyId);
    setNewBDCCompanyName(company.name);
    setEditingBDCCompanyId(companyId);
    setIsEditing(true);
  };

  const editBDCCompany = () => {
    if (newBDCCompanyName && editingBDCCompanyId) {
      setBDCCompanies(BDCCompanies.map(company => {
        if (company.id === editingBDCCompanyId) {
          return { ...company, name: newBDCCompanyName };
        }
        return company;
      }));
      setNewBDCCompanyName('');
      setIsEditing(false);
      setEditingBDCCompanyId(null);
      toast({
        title: 'Company updated.',
        description: "We've updated the BDC company for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteBDCCompany = (companyId) => {
    setBDCCompanies(BDCCompanies.filter((company) => company.id !== companyId));
    toast({
      title: 'Company deleted.',
      description: "We've deleted the BDC company for you.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const onOpenDeleteDialog = (companyId) => {
    setEditingBDCCompanyId(companyId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteBDCCompany = () => {
    deleteBDCCompany(editingBDCCompanyId);
    onCloseDeleteDialog();
  };

  const filteredBDCCompanies = searchQuery
    ? BDCCompanies.filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : BDCCompanies.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const totalPages = Math.ceil(BDCCompanies.length / recordsPerPage);

  return (
    <Box p={4} mb={10}>
      <Flex gap={2} mb={4} alignItems="center">
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search company"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
            />
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md">
          <Input
            value={newBDCCompanyName}
            onChange={(e) => setNewBDCCompanyName(e.target.value)}
            placeholder={isEditing ? "Edit company name" : "New company name"}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label={isEditing ? "Confirm Edit" : "Add Company"}>
              <IconButton
                aria-label={isEditing ? "Confirm edit" : "Add company"}
                icon={isEditing ? <EditIcon /> : <AddIcon />}
                h="1.75rem" size="sm"
                onClick={isEditing ? editBDCCompany : addBDCCompany}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
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
          {filteredBDCCompanies.map((company) => (
            <Tr key={company.id}>
              <Td>{company.id}</Td>
              <Td>{company.name}</Td>
              <Td>
                <IconButton aria-label="Edit company" icon={<EditIcon />} onClick={() => startEditBDCCompany(company.id)} />
                <IconButton aria-label="Delete company" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(company.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

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

      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={onCloseDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Company
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this company? This action cannot be undone.
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
