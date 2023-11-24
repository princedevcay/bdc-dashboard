import { SimpleGrid } from '@chakra-ui/react';
import StockLevelWidget from './dashboard/StockLevelWidget';
import RecentTransactionsWidget from './dashboard/RecentTransactionsWidget';
import AlertsWidget from './dashboard/AlertsWidget';
import StockTurnoverRateComponent from './dashboard/StockTurnoverRateComponent';
import AverageInventoryComponent from './dashboard/AverageInventoryComponent';
import StockLevelTrendGraph from './dashboard/StockLevelTrendGraph';
import StockPositionWidget from './dashboard/StockPositionWidget';
import StockSummaryWidget from './dashboard/StockSummaryWidget';


const Dashboard = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5} p={5} mb={10}>
       <AlertsWidget/>
       <StockSummaryWidget/>
      <StockPositionWidget/>
      <StockLevelTrendGraph/>
      <StockLevelWidget />
      <RecentTransactionsWidget />
      <StockTurnoverRateComponent/>
      <AverageInventoryComponent/>
      {/* Add other wid
      gets here */}
    </SimpleGrid>
  );
};

export default Dashboard;
