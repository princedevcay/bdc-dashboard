import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Select, VStack, Input, Grid, GridItem
} from '@chakra-ui/react';

import { saveLog } from '../../services/productService';
import { fetchProducts } from '../../services/productService';
import { fetchActivities } from '../../services/activityService';
import { fetchBDCCompanies } from '../../services/bdcService';
import { fetchDepots } from '../../services/depotService';

const LogsPage = () => {
  const currentUser = "John Doe";
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedActivities, setFetchedActivities] = useState([]);
  const [fetchedBDCCompanies, setFetchedBDCCompanies] = useState([]);
  const [fetchedDepots, setFetchedDepots] = useState([]);

  useEffect(() => {
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
    actionedBy: currentUser
  });

  const [logEntries, setLogEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogEntry({ ...logEntry, [name]: value });
  };

  const handleSubmit = () => {
    const timestamp = new Date().toLocaleString();
    const logData = { ...logEntry, timestamp };
    setLogEntries([...logEntries, logData]);

    // Clear the log entry form
    setLogEntry({
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
      actionedBy: currentUser
    });
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
            <Select name="activity" value={logEntry.activity} onChange={handleChange} placeholder="Select Activity">
              {fetchedActivities && fetchedActivities.map((activity) => (
                <option key={activity.id} value={activity.title.rendered}>
                  {activity.title.rendered}
                </option>
              ))}
            </Select>
            <Select name="from" value={logEntry.from} onChange={handleChange} placeholder="Select From">
              {fetchedBDCCompanies.map((company) => (
                <option key={company.id} value={company.title.rendered}>
                  {company.title.rendered}
                </option>
              ))}
            </Select>
            <Select name="inDepot" value={logEntry.inDepot} onChange={handleChange} placeholder="Select In Depot">
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
            <Select name="to" value={logEntry.to} onChange={handleChange} placeholder="Select To">
              {fetchedBDCCompanies.map((company) => (
                <option key={company.id} value={company.title.rendered}>
                  {company.title.rendered}
                </option>
              ))}
            </Select>
            <Select name="atDepot" value={logEntry.atDepot} onChange={handleChange} placeholder="Select At Depot">
              {fetchedDepots.map((depot) => (
                <option key={depot.id} value={depot.title.rendered}>
                  {depot.title.rendered}
                </option>
              ))}
            </Select>
            <Input name="remarks" value={logEntry.remarks} onChange={handleChange} placeholder="Remarks" />
            <Input name="quantityGsv" value={logEntry.quantityGsv} onChange={handleChange} placeholder="Quantity (GSV)" />
            <Input name="quantityMt" value={logEntry.quantityMt} onChange={handleChange} placeholder="Quantity (MT)" />
            <Button mt={4} onClick={handleSubmit}>
              Submit Log Entry
            </Button>
          </VStack>
        </GridItem>
      </Grid>

      {logEntries.length > 0 && (
        <Table variant="simple" mt={8}>
          <Thead>
            <Tr>
              <Th>Date/Time Stamp</Th>
              <Th>Product</Th>
              <Th>Activity</Th>
              <Th>From (BDC)</Th>
              <Th>In Depot</Th>
              <Th>To Depot</Th>
              <Th>At Depot</Th>
              <Th>Remarks</Th>
              <Th>Quantity (GSV)</Th>
              <Th>Quantity (MT)</Th>
              <Th>Actioned By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logEntries.map((log, index) => (
              <Tr key={index}>
                <Td>{log.timestamp}</Td>
                <Td>{log.product}</Td>
                <Td>{log.activity}</Td>
                <Td>{log.from}</Td>
                <Td>{log.inDepot}</Td>
                <Td>{log.to}</Td>
                <Td>{log.atDepot}</Td>
                <Td>{log.remarks}</Td>
                <Td>{log.quantityGsv}</Td>
                <Td>{log.quantityMt}</Td>
                <Td>{log.actionedBy}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default LogsPage;
