import { Box, Flex, Heading } from "@chakra-ui/react";
import { AddTaskModal } from "./AddTaskModal";

export const TopBar = () => {
  return (
    <Box as="header" py={4} px={6} bg="teal.500" color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size={{ md: "md", sm: "xs" }}>To-Do Manager</Heading>
        <AddTaskModal />
      </Flex>
    </Box>
  );
};
