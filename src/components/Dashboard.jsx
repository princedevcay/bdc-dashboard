import { SimpleGrid } from '@chakra-ui/react';
import StockLevelWidget from './dashboard/StockLevelWidget';
import RecentTransactionsWidget from './dashboard/RecentTransactionsWidget';
import StockTurnoverRateComponent from './dashboard/StockTurnoverRateComponent';
import AverageInventoryComponent from './dashboard/AverageInventoryComponent';
import WarehouseCapacityUtilization from './WarehouseCapacityUtilization';
import StockLevelTrendGraph from './dashboard/StockLevelTrendGraph';
import StockPositionWidget from './dashboard/StockPositionWidget';
import StockSummaryWidget from './dashboard/StockSummaryWidget';


const Dashboard = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5} p={5} mb={10}>
       <StockPositionWidget/>
       <RecentTransactionsWidget />
      <StockLevelTrendGraph/>
      <AverageInventoryComponent/>
      <WarehouseCapacityUtilization/>
      <StockSummaryWidget/>
      <StockLevelWidget />
      <StockTurnoverRateComponent/>
      {/* Add other wid
      gets here */}
    </SimpleGrid>
  );
};

export default Dashboard;
