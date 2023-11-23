import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockLevelTrendGraph = () => {
  const data = [
    { name: 'Week 1', Diesel: 4000, Petrol: 2400, amt: 2400 },
    { name: 'Week 2', Diesel: 3000, Petrol: 1398, amt: 2210 },
    // Add more data points as needed
  ];

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Stock Level Trends</Heading>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Diesel" stroke="#8884d8" />
        <Line type="monotone" dataKey="Petrol" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
};

export default StockLevelTrendGraph;
