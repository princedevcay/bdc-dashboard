// Activities.js

import { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Flex,
  InputGroup, InputRightElement, Tooltip, Stack,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { useActivityContext } from '../../contexts/ActivityContext';
import * as activityService from '../../services/activityService'; 

const Activities = () => {
  const [newActivityName, setNewActivityName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const toast = useToast();
  const cancelRef = useRef();
  const { activities, updateActivities } = useActivityContext();
  const recordsPerPage = 10;

  useEffect(() => {
    document.title = 'Activities';
    return () => {
      document.title = 'Tor Monitoring & Control System'; // Reset the title when the component unmounts
    };
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await activityService.fetchActivities();
        updateActivities(data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching activity data:', error.message);
      }
    };

    fetchData();
  }, [updateActivities]);

  const addActivity = async () => {
    if (newActivityName) {
      try {
        const data = await activityService.createActivity({ name: newActivityName });
        updateActivities([...activities, data]);
        setNewActivityName('');
        toast({
          title: 'Activity added.',
          description: "New Activity Added Successfully.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error adding activity:', error.message);
      }
    }
  };

  const startEditActivity = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    setNewActivityName(activity.title.rendered);  // Set the current activity's title
    setEditingActivityId(activityId);
    setIsEditing(true);
  };

  const editActivity = async () => {
    if (newActivityName && editingActivityId) {
      try {
        const data = await activityService.updateActivity(editingActivityId, { name: newActivityName });
        const updatedActivity = { ...activities.find(activity => activity.id === editingActivityId), name: newActivityName };
  
        updateActivities(activities.map(activity => (activity.id === editingActivityId ? updatedActivity : activity)));
        setNewActivityName('');
        setIsEditing(false);
        setEditingActivityId(null);
  
        toast({
          title: 'Activity updated.',
          description: "Activity Updated Successfully.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating activity:', error.message);
      }
    }
  };
  
  

  const deleteActivity = async (activityId) => {
    try {
      await activityService.deleteActivity(activityId);
      updateActivities(activities.filter(activity => activity.id !== activityId));
  
      toast({
        title: 'Activity deleted.',
        description: "Activity Successfully deleted.",
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting activity:', error.message);
    }
  };
  

  const onOpenDeleteDialog = (activityId) => {
    setEditingActivityId(activityId);
    setIsDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteActivity = async () => {
    try {
      await activityService.deleteActivity(editingActivityId);
      onCloseDeleteDialog();
      updateActivities(activities.filter(activity => activity.id !== editingActivityId));
      toast({
        title: 'Activity deleted.',
        description: "Activity Successfully deleted.",
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting activity:', error.message);
    }
  };

  const filteredActivities = searchQuery
  ? activities.filter(activity => {
      const title = activity.title.rendered || ''; // Default to an empty string if title.rendered is undefined
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    })
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
              value={newActivityName || ''}  // Ensure it's not undefined
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

      {isLoading ? ( // Show loading spinner when fetching data
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (

      <Table variant="simple">
        <Thead>
          <Tr bgColor="#0C4DA2" color="white">
            <Th color="white">ID</Th>
            <Th color="white">Name</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredActivities.map((activity) => (
            <Tr key={activity.id}>
              <Td>{activity.id}</Td>
              <Td>{activity.title.rendered}</Td>
              <Td>
                <IconButton aria-label="Edit activity" icon={<EditIcon />} onClick={() => startEditActivity(activity.id)} />
                <IconButton aria-label="Delete activity" icon={<DeleteIcon />} onClick={() => onOpenDeleteDialog(activity.id)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
     )}
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
