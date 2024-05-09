import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Box,
  Select,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useTodoContext } from "./useTodoContext";

export const AddTaskModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("LOW");

  const { newTask } = useTodoContext();

  const handleSave = async () => {
    await newTask({
      title,
      priority,
      status: "NOT_STARTED",
      due_on: null,
    });
    onClose();
  };

  return (
    <>
      <Button
        colorScheme="whiteAlpha"
        onClick={onOpen}
        // size={{ base: "lg", sm: "sm", md: "sm" }}
      >
        Create New Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Task</ModalHeader>
          <ModalBody>
            <Box>
              <Input
                placeholder="Task Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Flex alignItems="center">
                <Text mr={3}>Priority:</Text>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </Select>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button m={2} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button m={2} colorScheme="green" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
