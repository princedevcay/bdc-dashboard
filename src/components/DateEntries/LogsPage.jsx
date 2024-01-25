import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Select, VStack, Input, Grid, GridItem, useToast, Spinner, Flex
} from '@chakra-ui/react';

import { saveLog, fetchLogEntries } from '../../services/productService';
import { fetchProducts } from '../../services/productService';
import { fetchActivities } from '../../services/activityService';
import { fetchBDCCompanies } from '../../services/bdcService';
import { fetchDepots } from '../../services/depotService';

const LogsPage = ({ user }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedActivities, setFetchedActivities] = useState([]);
  const [fetchedBDCCompanies, setFetchedBDCCompanies] = useState([]);
  const [fetchedDepots, setFetchedDepots] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logEntries, setLogEntries] = useState([]);
  const toast = useToast();

  useEffect(() => {
    document.title = 'Activity Logs';
    return () => {
      document.title = 'Tor Monitoring & Control System';
    };
  }, []);

  useEffect(() => {
    const fetchLogEntriesData = async () => {
      try {
        setLoadingLogs(true);
        const logEntriesData = await fetchLogEntries();
        setLogEntries(logEntriesData);
      } catch (error) {
        console.error('Error fetching log entries:', error);
      } finally {
        setLoadingLogs(false);
      }
    };
  
    const fetchProductsData = async () => {
      try {
        const productsData = await fetchProducts();
        setFetchedProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const fetchBDCCompaniesData = async () => {
      try {
        const bdcCompaniesData = await fetchBDCCompanies();
        setFetchedBDCCompanies(bdcCompaniesData);
      } catch (error) {
        console.error('Error fetching BDC companies:', error);
      }
    };
  
    const fetchDepotsData = async () => {
      try {
        const depotsData = await fetchDepots();
        setFetchedDepots(depotsData);
      } catch (error) {
        console.error('Error fetching depots:', error);
      }
    };
  
    const fetchActivitiesData = async () => {
      try {
        const activitiesData = await fetchActivities();
        setFetchedActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
  
    fetchLogEntriesData();
    fetchProductsData();
    fetchBDCCompaniesData();
    fetchDepotsData();
    fetchActivitiesData();
  }, []);
  
  

  const [logEntry, setLogEntry] = useState({
    title: "Your Log Entry Title",
    content: "Additional content or description",
    status: "publish",
    timestamp: '',
    product: '',
    activity: '',
    from: '',
    inDepot: '',
    to: '',
    atDepot: '',
    remarks: '',
    quantityGsv: '',
    quantityMt: '',
    actionedBy: user ? user.name : 'John Doe',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogEntry({ ...logEntry, [name]: value });
  };

  const handleSubmit = async () => {
    const timestamp = new Date().toLocaleString();
    const updatedLogEntry = {
      ...logEntry,
      acf: {
        ...logEntry.acf,
        timestamp: timestamp,
        product: logEntry.product,
        activity: logEntry.activity,
        from: logEntry.from,
        inDepot: logEntry.inDepot,
        to: logEntry.to,
        atDepot: logEntry.atDepot,
        remarks: logEntry.remarks,
        quantityGsv: logEntry.quantityGsv,
        quantityMt: logEntry.quantityMt,
        actionedBy: logEntry.actionedBy,
      },
    };
  
    console.log('Name displayed:', updatedLogEntry.acf.actionedBy);
  
    try {
      await saveLog(updatedLogEntry);
      setLogEntries([...logEntries, updatedLogEntry]);
      setLogEntry({
        title: "Your Log Entry Title",
        content: "Additional content or description",
        status: "publish",
        timestamp: '',
        product: '',
        activity: '',
        from: '',
        inDepot: '',
        to: '',
        atDepot: '',
        remarks: '',
        quantityGsv: '',
        quantityMt: '',
        actionedBy: user ? user.name : 'John Doe',
        author: '',
      });
  
      toast({
        title: 'Log Entry Saved',
        description: 'Your log entry has been saved successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving log:', error);
  
      toast({
        title: 'Error Saving Log Entry',
        description: 'An error occurred while saving the log entry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box p={4} mb={10}>
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <GridItem colSpan={1}>
          <VStack spacing={4} align="flex-start">
            <Select name="product" value={logEntry.product} onChange={handleChange} placeholder="Select Product">
              {fetchedProducts.map((product) => (
                <option key={product.id} value={product.title.rendered}>
                  {product.title.rendered}
                </option>
              ))}
            </Select>
            <Select
              name="activity"
              value={logEntry.activity}
              onChange={handleChange}
              placeholder="Select Activity"
            >
              {loadingActivities ? (
                <option>Loading Activities...</option>
              ) : (
                fetchedActivities.map((activity) => (
                  <option key={activity.id} value={activity.title.rendered}>
                    {activity.title.rendered}
                  </option>
                ))
              )}
            </Select>
            <Select
              name="from"
              value={logEntry.from}
              onChange={handleChange}
              placeholder="Select From"
            >
              {fetchedBDCCompanies.map((company) => (
                <option key={company.id} value={company.title.rendered}>
                  {company.title.rendered}
                </option>
              ))}
            </Select>
            <Select
              name="inDepot"
              value={logEntry.inDepot}
              onChange={handleChange}
              placeholder="Select In Depot"
            >
              {fetchedDepots.map((depot) => (
                <option key={depot.id} value={depot.title.rendered}>
                  {depot.title.rendered}
                </option>
              ))}
            </Select>
          </VStack>
        </GridItem>

        <GridItem colSpan={1}>
          <VStack spacing={4} align="flex-start">
            <Select
              name="to"
              value={logEntry.to}
              onChange={handleChange}
              placeholder="Select To"
            >
              {fetchedBDCCompanies.map((company) => (
                <option key={company.id} value={company.title.rendered}>
                  {company.title.rendered}
                </option>
              ))}
            </Select>
            <Select
              name="atDepot"
              value={logEntry.atDepot}
              onChange={handleChange}
              placeholder="Select At Depot"
            >
              {fetchedDepots.map((depot) => (
                <option key={depot.id} value={depot.title.rendered}>
                  {depot.title.rendered}
                </option>
              ))}
            </Select>
            <Input
              name="remarks"
              value={logEntry.remarks}
              onChange={handleChange}
              placeholder="Remarks"
            />
            <Input
              name="quantityGsv"
              value={logEntry.quantityGsv}
              onChange={handleChange}
              placeholder="Quantity (GSV)"
            />
            <Input
              name="quantityMt"
              value={logEntry.quantityMt}
              onChange={handleChange}
              placeholder="Quantity (MT)"
            />
            <Button mt={4} onClick={handleSubmit} colorScheme='blue'>
              Submit Log Entry
            </Button>
          </VStack>
        </GridItem>
      </Grid>

      {loadingLogs ? (
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Spinner size="lg" color="blue.500" />
        </Flex>
      ) : (
        logEntries.length > 0 && (
          <Table variant="simple" mt={8}>
            <Thead>
              <Tr bgColor="#0C4DA2" color="white">
                <Th color="white" >Date/Time Stamp</Th>
                <Th color="white">Product</Th>
                <Th color="white">Activity</Th>
                <Th color="white">From (BDC)</Th>
                <Th color="white">In Depot</Th>
                <Th color="white">To Depot</Th>
                <Th color="white">At Depot</Th>
                <Th color="white">Remarks</Th>
                <Th color="white">Quantity (GSV)</Th>
                <Th color="white">Quantity (MT)</Th>
                <Th color="white">Actioned By</Th>
              </Tr>
            </Thead>
            <Tbody>
              {logEntries.map((log, index) => (
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
                  <Td>{log.acf && log.acf.actionedBy}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )
      )}
    </Box>
  );
};

export default LogsPage;
