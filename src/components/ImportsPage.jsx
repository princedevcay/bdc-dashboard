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

const initialImports = [
  { id: 1, date: '3-Oct-23', typeOfProduct: 'LPG', trade: 'IMP', pipeline: 'OLD JETTY', vessel: '<<MT HELSINKI>>', bdcAssigned: 'FUEL TRADE', quantityLitres: 'MT AIR', quantityMtons: 4024.342 },
  { id: 2, date: '6-Oct-23', typeOfProduct: 'CRUDE OIL', trade: 'IMP', pipeline: 'CBM', vessel: '<< NISSOS TINOS >>', bdcAssigned: 'EVERSTONE', quantityLitres: 41550388, quantityMtons: 34867.384 },
  { id: 3, date: '10-Oct-23', typeOfProduct: 'LPG', trade: 'IMP', pipeline: 'OLD JETTY', vessel: '<<GT BARUMK>>', bdcAssigned: 'PWSL', quantityLitres: 'MT AIR', quantityMtons: 1553.551 },
  { id: 4, date: '10-Oct-23', typeOfProduct: 'GASOLINE', trade: 'IMP', pipeline: 'ABB', vessel: '<<MT DORIC BREEZE (P/L)>>', bdcAssigned: 'DOMINION', quantityLitres: 49600, quantityMtons: 35.474 },
  // ... add other import records as needed ...
];

const ImportsPage = () => {
  const [imports, setImports] = useState(initialImports);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const [sortDirection, setSortDirection] = useState('asc'); // State to track sort direction


  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentImports = imports.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(imports.length / recordsPerPage);

  const sortImports = (direction) => {
    setSortDirection(direction);
    const sortedImports = [...imports].sort((a, b) => {
      if (direction === 'asc') {
        return a.date.localeCompare(b.date); // Example: sorting by date in ascending order
      } else {
        return b.date.localeCompare(a.date); // Sorting in descending order
      }
    });
    setImports(sortedImports);
  };

  // Add new import (placeholder function)
  const addImport = () => {
    toast({
      title: 'Feature Not Implemented',
      description: 'This feature is not yet implemented.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  // Search imports (placeholder function)
  const searchImports = () => {
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
            placeholder="Search imports"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            icon={<SearchIcon />}
            onClick={searchImports}
          />
          {/* Sorting Buttons */}
        <IconButton
          aria-label="Sort ascending"
          icon={<ArrowUpIcon />}
          onClick={() => sortImports('asc')}
        />
        <IconButton
          aria-label="Sort descending"
          icon={<ArrowDownIcon />}
          onClick={() => sortImports('desc')}
        />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={addImport}
          >
            Add New
          </Button>
        </HStack>

        <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Date</Th>
            <Th>Type Of Product</Th>
            <Th>Trade</Th>
            <Th>Pipeline</Th>
            <Th>Vessel</Th>
            <Th>BDC(S) Assigned</Th>
            <Th>Quantity (ltrs)</Th>
            <Th>Quantity (mton)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {imports.map((imp) => (
            <Tr key={imp.id}>
              <Td>{imp.id}</Td>
              <Td>{imp.date}</Td>
              <Td>{imp.typeOfProduct}</Td>
              <Td>{imp.trade}</Td>
              <Td>{imp.pipeline}</Td>
              <Td>{imp.vessel}</Td>
              <Td>{imp.bdcAssigned}</Td>
              <Td>{imp.quantityLitres}</Td>
              <Td>{imp.quantityMtons}</Td>
              <Td>
                <IconButton 
                  aria-label="Edit import" 
                  icon={<EditIcon />} 
                  onClick={() => handleEdit(imp.id)} 
                  mr={2}
                />
                <IconButton 
                  aria-label="Delete import" 
                  icon={<DeleteIcon />} 
                  onClick={() => handleDelete(imp.id)}
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

export default ImportsPage;
