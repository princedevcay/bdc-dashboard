import { SimpleGrid } from '@chakra-ui/react';
import TotalActivitiesWidget from './dashboard/TotalActivitiesWidget';
import TotalProductsWidget from './dashboard/TotalProductsWidget';
import DepotTransferOutWidget from './dashboard/DepotTransferOutWidget';

const Dashboard = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5} p={5} mb={10}>
       <TotalActivitiesWidget/>
       <TotalProductsWidget/>
       <DepotTransferOutWidget/>
    </SimpleGrid>
  );
};

export default Dashboard;
