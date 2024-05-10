import { Box, Heading, VStack } from "@chakra-ui/react";
import { TaskCard } from "./TaskCard";
import { Task } from "../types/task";

type Props = {
  title: string;
  tasks: Task[];
};

export const Column = ({ title, tasks }: Props) => {
  return (
    <Box
      w="full"
      p={4}
      borderWidth={1}
      borderRadius="md"
      margin={{ base: "auto", sm: "auto", md: 5, lg: 5 }}
    >
      <Heading as="h3" size="md" mb={4} textAlign="center">
        {title}
      </Heading>
      <VStack spacing={3}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>
    </Box>
  );
};
