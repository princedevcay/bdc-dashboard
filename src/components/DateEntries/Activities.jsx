// Activities.js
import { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useActivityContext } from '../../contexts/ActivityContext';

const Activities = () => {
  const [newActivityName, setNewActivityName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();
  const { activities, updateActivities } = useActivityContext();
  const recordsPerPage = 10;

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      // Fetch your data here
      const fetchedData = [
        { id: 1, name: 'DEPOT TRANSFER OUT' },
        { id: 2, name: 'IMPORT' },
        { id: 3, name: 'LOADING RACK LIFTINGS' },
        // ... other initial activities ...
      ];

      // Update the context with the fetched data
      updateActivities(fetchedData);
    };

    fetchData();
  }, [updateActivities]);

  const addActivity = () => {
    if (newActivityName) {
      const newActivity = { id: activities.length + 1, name: newActivityName };
      updateActivities([...activities, newActivity]);
      setNewActivityName('');
      toast({
        title: 'Activity added.',
        description: "We've added the activity for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const startEditActivity = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    setNewActivityName(activity.name);
    setEditingActivityId(activityId);
    setIsEditing(true);
  };

  const editActivity = () => {
    if (newActivityName && editingActivityId) {
      updateActivities(activities.map(activity => {
        if (activity.id === editingActivityId) {
          return { ...activity, name: newActivityName };
        }
        return activity;
      }));
      setNewActivityName('');
      setIsEditing(false);
      setEditingActivityId(null);
      toast({
        title: 'Activity updated.',
        description: "We've updated the activity for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteActivity = (activityId) => {
    updateActivities(activities.filter((activity) => activity.id !== activityId));
    toast({
      title: 'Activity deleted.',
      description: "We've deleted the activity for you.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const onOpenDeleteDialog = (activityId) => {
    setEditingActivityId(activityId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteActivity = () => {
    deleteActivity(editingActivityId);
    onCloseDeleteDialog();
  };

  const filteredActivities = searchQuery
    ? activities.filter(activity => activity.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : activities.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const totalPages = Math.ceil(activities.length / recordsPerPage);

  return (
    <Box p={4} mb={10}>
          <Flex gap={2} mb={4} alignItems="center">
        <InputGroup size="md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity"
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="Search activity"
              icon={<SearchIcon />}
              h="1.75rem" size="sm"
            />
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md">
          <Input
            value={newActivityName}
            onChange={(e) => setNewActivityName(e.target.value)}
            placeholder={isEditing ? "Edit activity name" : "New activity name"}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Tooltip label={isEditing ? "Confirm Edit" : "Add Activity"}>
              <IconButton
                aria-label={isEditing ? "Confirm edit" : "Add activity"}
                icon={isEditing ? <EditIcon /> : <AddIcon />}
                h="1.75rem" size="sm"
                onClick={isEditing ? editActivity : addActivity}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredActivities.map((activity) => (
            <Tr key={activity.id}>
              <Td>{activity.id}</Td>
              <Td>{activity.name}</Td>
              <Td>
                <IconButton aria-label="Edit activity" icon={<EditIcon />} onClick={() => startEditActivity(activity.id)} />
                <IconButton aria-label="Delete activity" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(activity.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center" mt="4">
        <Stack direction="row" spacing={4}>
          <IconButton icon={<ArrowBackIcon />} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} isDisabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </Button>
          ))}
          <IconButton icon={<ArrowForwardIcon />} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} isDisabled={currentPage === totalPages} />
        </Stack>
      </Flex>

      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={onCloseDeleteDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Activity
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this activity? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteActivity} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Activities;
