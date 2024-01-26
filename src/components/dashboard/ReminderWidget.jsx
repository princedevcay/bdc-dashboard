import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const RemindersWidget = () => {
  const [reminders, setReminders] = useState(['Meeting at 10 AM', 'Submit report by 2 PM']);
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    if (newReminder.trim() !== '') {
      setReminders([...reminders, newReminder]);
      setNewReminder('');
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <Heading size="md" mb={4}>
        Reminders
      </Heading>
      <UnorderedList>
        {reminders.map((reminder, index) => (
          <ListItem key={index}>
            <Text>{reminder}</Text>
          </ListItem>
        ))}
      </UnorderedList>
      <VStack mt={4} align="stretch">
        <Input
          placeholder="New Reminder"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
        <Button colorScheme="blue" variant={"outline"} onClick={addReminder}>
        + Reminder
        </Button>
      </VStack>
    </Box>
  );
};

export default RemindersWidget;
