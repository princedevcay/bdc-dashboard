// TotalActivitiesReport.js
import  { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex, Input, InputGroup, InputRightElement, IconButton, Icon } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi'
import { FaPrint } from 'react-icons/fa'
import { fetchAllActivityLogs } from '../../services/activitylogsService';

const TotalActivitiesReport = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [filteredLogEntries, setFilteredLogEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchActivityLogsData = async () => {
      try {
        const logsData = await fetchAllActivityLogs();
        setLogEntries(logsData);
        setFilteredLogEntries(logsData);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityLogsData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);

    const searchTermLower = searchTerm.toLowerCase();
    const filteredLogs = logEntries.filter((log) =>
      Object.values(log.acf).some((value) =>
        value ? value.toLowerCase().includes(searchTermLower) : false
      )
    );

    setFilteredLogEntries(filteredLogs);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Flex justifyContent="space-between" mb={4} alignItems="center" className="print-hide">
        <InputGroup size="md" maxW="500px">
          <Input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search activity (e.g., Date, Product, Activity)"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search activity"
              icon={<BiSearch />}
              h="1.75rem"
              size="sm"
              onClick={() => handleSearch(searchQuery)}
            />
          </InputRightElement>
        </InputGroup>

        <IconButton
          aria-label="Print report"
          icon={<FaPrint />}
          h="1.75rem"
          size="sm"
          onClick={handlePrint}
        />
      </Flex>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Spinner size="xl" thickness="4px" color="blue.500" mt={8} />
        </Flex>
      ) : (
        <Table variant="simple" mt={8}>
          <Thead>
            <Tr bgColor="#0C4DA2" color="white">
              <Th color="white">Date/Time Stamp</Th>
              <Th color="white">Product</Th>
              <Th color="white">Activity</Th>
              <Th color="white">From (BDC)</Th>
              <Th color="white">In Depot</Th>
              <Th color="white">To Depot</Th>
              <Th color="white">At Depot</Th>
              <Th color="white">Remarks</Th>
              <Th color="white">Quantity (GSV)</Th>
              <Th color="white"> Quantity (MT)</Th>
              <Th color="white">Actioned By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLogEntries.map((log, index) => (
              <Tr key={index}>
                <Td>{log.acf && log.acf.timestamp}</Td>
                <Td>{log.acf && log.acf.product}</Td>
                <Td>{log.acf && log.acf.activity}</Td>
                <Td>{log.acf && log.acf.from}</Td>
                <Td>{log.acf && log.acf.inDepot}</Td>
                <Td>{log.acf && log.acf.to}</Td>
                <Td>{log.acf && log.acf.atDepot}</Td>
                <Td>{log.acf && log.acf.remarks}</Td>
                <Td>{log.acf && log.acf.quantityGsv}</Td>
                <Td>{log.acf && log.acf.quantityMt}</Td>
                <Td>Jesse Ayertey</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default TotalActivitiesReport;
