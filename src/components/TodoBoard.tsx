import * as React from "react";
import { Box, Flex, Input, Text, Select } from "@chakra-ui/react";
import { Column } from "./Column";
import { useTodoContext } from "./useTodoContext";

export const TodoBoard = () => {
  const [titleFilter, setTitleFilter] = React.useState("");
  const [priorityStatus, setPriorityStatus] = React.useState("");

  const { tasks } = useTodoContext();

  const filteredTasks = React.useMemo(() => {
    let allTasks = [...tasks];
    if (priorityStatus) {
      allTasks = allTasks.filter((task) => task.priority === priorityStatus);
    }
    if (titleFilter) {
      allTasks = allTasks.filter((task) =>
        task.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }
    return allTasks;
  }, [tasks, priorityStatus, titleFilter]);

  const notStartedTodos = React.useMemo(
    () => filteredTasks.filter((task) => task.status === "NOT_STARTED"),
    [filteredTasks]
  );
  const inProgressTodos = React.useMemo(
    () => filteredTasks.filter((task) => task.status === "IN_PROGRESS"),
    [filteredTasks]
  );
  const doneTodos = React.useMemo(
    () => filteredTasks.filter((task) => task.status === "DONE"),
    [filteredTasks]
  );

  React.useEffect(() => {
    console.log("Status Filter:", priorityStatus);
    console.log("Tasks:", tasks);
  }, [priorityStatus, tasks]);

  return (
    <Box p={5}>
      {/* Search/Filter */}
      <Flex justifyContent="center">
        <Input
          mr={5}
          flex={4}
          variant="filled"
          // maxWidth="50%"
          placeholder="Type here to filter your tasks..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <Flex alignItems="center">
          <Text mr={2}>Filter by Status:</Text>
          <Select
            flex={1}
            value={priorityStatus}
            onChange={(e) => setPriorityStatus(e.target.value)}
          >
            <option value="">None</option>
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </Select>
        </Flex>
      </Flex>

      <Box
        p={4}
        display="flex"
        justifyContent="space-around"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Column
          title="Not Started"
          tasks={notStartedTodos}
          onDeleteTask={() => {}}
          onUpdateTask={() => {}}
        />
        <Column
          title="In Progress"
          tasks={inProgressTodos}
          onDeleteTask={() => {}}
          onUpdateTask={() => {}}
        />
        <Column
          title="Done"
          tasks={doneTodos}
          onDeleteTask={() => {}}
          onUpdateTask={() => {}}
        />
      </Box>
    </Box>
  );
};
