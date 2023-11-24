import React, { useState } from 'react';
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
  VStack,
  HStack,
  IconButton,
  useToast,
  Text
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon, EditIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

const initialTransfers = [
  {
    id: 1,
    date: '3-Oct-23',
    product: 'GASOIL',
    from: 'G74',
    to: 'WOODFEILDS',
    bdcAssigned: 'DOMINION',
    quantityLitres: 23802865,
    quantityMtons: 19711.152
  },
  {
    id: 2,
    date: '6-Oct-23',
    product: 'CRUDE',
    from: 'G71',
    to: 'PLATON',
    bdcAssigned: 'PLATON',
    quantityLitres: 8196881,
    quantityMtons: 6949.316
  },
  {
    id: 3,
    date: '25-Oct-23',
    product: 'GASOIL',
    from: 'G26',
    to: 'GBS',
    bdcAssigned: 'GO ENERGY',
    quantityLitres: 1135162,
    quantityMtons: 939.030
  }
];


const TransfersPage = () => {
  const [Transfers, setTransfers] = useState(initialTransfers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const [sortDirection, setSortDirection] = useState('asc'); // State to track sort direction


  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentTransfers = Transfers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(Transfers.length / recordsPerPage);

  const sortTransfers = (direction) => {
    setSortDirection(direction);
    const sortedTransfers = [...Transfers].sort((a, b) => {
      if (direction === 'asc') {
        return a.date.localeCompare(b.date); // Example: sorting by date in ascending order
      } else {
        return b.date.localeCompare(a.date); // Sorting in descending order
      }
    });
    setTransfers(sortedTransfers);
  };

  // Add new Transfer (placeholder function)
  const addTransfer = () => {
    toast({
      title: 'Feature Not Implemented',
      description: 'This feature is not yet implemented.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  // Search Transfers (placeholder function)
  const searchTransfers = () => {
    toast({
      title: 'Feature Not Implemented',
      description: 'This feature is not yet implemented.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  

  return (
    <Box p={4} mb={10}>
      <VStack spacing={4}>
        <HStack width="full" justifyContent="space-between">
          <Input
            placeholder="Search Transfers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            icon={<SearchIcon />}
            onClick={searchTransfers}
          />
          {/* Sorting Buttons */}
        <IconButton
          aria-label="Sort ascending"
          icon={<ArrowUpIcon />}
          onClick={() => sortTransfers('asc')}
        />
        <IconButton
          aria-label="Sort descending"
          icon={<ArrowDownIcon />}
          onClick={() => sortTransfers('desc')}
        />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={addTransfer}
          >
            Add New
          </Button>
        </HStack>

        <Table variant="simple">
        <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Date</Th>
              <Th>Product</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>BDC(S) Assigned</Th>
              <Th>Quantity (ltrs)</Th>
              <Th>Quantity (mton)</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
        <Tbody>
          {Transfers.map((trans) => (
            <Tr key={trans.id}>
              <Td>{trans.id}</Td>
                <Td>{trans.date}</Td>
                <Td>{trans.product}</Td>
                <Td>{trans.from}</Td>
                <Td>{trans.to}</Td>
                <Td>{trans.bdcAssigned}</Td>
                <Td>{trans.quantityLitres}</Td>
                <Td>{trans.quantityMtons}</Td>
              <Td>
                <IconButton 
                  aria-label="Edit Transfer" 
                  icon={<EditIcon />} 
                  onClick={() => handleEdit(trans.id)} 
                  mr={2}
                />
                <IconButton 
                  aria-label="Delete Transfer" 
                  icon={<DeleteIcon />} 
                  onClick={() => handleDelete(trans.id)}
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

        <HStack spacing={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              isActive={currentPage === number + 1}
            >
              {number + 1}
            </Button>
          ))}
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default TransfersPage;
