import * as React from "react";
import {
  Box,
  Text,
  Flex,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Task } from "../types/task";
import { useTodoContext } from "./useTodoContext";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const { editTask, removeTask } = useTodoContext();

  const handleTitleChange = React.useCallback(
    (value: string) => {
      const newTask = { ...task, title: value };
      editTask(newTask);
    },
    [editTask, task]
  );

  const handlePriorityChange = React.useCallback(
    (value: string) => {
      const newTask = { ...task, priority: value };
      editTask(newTask);
    },
    [editTask, task]
  );

  const handleStatusChange = React.useCallback(
    (value: string) => {
      const newTask = { ...task, status: value };
      editTask(newTask);
    },
    [editTask, task]
  );

  const handleDelete = React.useCallback(() => {
    removeTask(task);
  }, [removeTask, task]);

  const backgroundColor = React.useMemo(() => {
    let color = "white";
    switch (task.priority) {
      case "LOW":
        color = "#5cb85c";
        break;
      case "MEDIUM":
        color = "#ffc400";
        break;
      case "HIGH":
        color = "#ff6347";
        break;
    }
    return color;
  }, [task.priority]);

  // UseDisclosure hook to manage delete confirmation modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      p={3}
      borderRadius="md"
      shadow="base"
      width="100%"
      backgroundColor={backgroundColor}
    >
      <Flex direction="column" justifyContent="space-around">
        <Flex justifyContent="space-between" mb={5}>
          {/* Editable task title */}
          <Editable
            color="white"
            defaultValue={task.title}
            onSubmit={(value) => handleTitleChange(value)}
            _hover={{
              backgroundColor: "white",
              textColor: "black",
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

          {/* Delete task button */}
          <IconButton
            icon={<DeleteIcon />}
            onClick={onOpen}
            size="sm"
            aria-label="Delete Task"
          />
        </Flex>

        {/* Priority selector */}
        <Select
          backgroundColor="white"
          defaultValue={task.priority}
          onChange={(event) => handlePriorityChange(event.target.value)}
          mb={2}
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
        </Select>

        {/* Status selector */}
        <Select
          backgroundColor="white"
          defaultValue={task.status}
          onChange={(event) => handleStatusChange(event.target.value)}
          mb={2}
        >
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </Select>

        <Flex justifyContent="flex-end">
          {task.due_on && (
            <Text fontSize="xs">
              Due: {new Date(task.due_on).toLocaleString()}
            </Text>
          )}
          <Text fontSize="xs" color="white">
            Created: {new Date(task.created_on).toLocaleString()}
          </Text>
        </Flex>
      </Flex>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>
          <Flex justifyContent="flex-end">
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};
