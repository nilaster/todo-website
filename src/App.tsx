import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { TodoBoard } from "./components/TodoBoard";
import { TopBar } from "./components/TopBar";
import { TodoProvider } from "./contexts/todoContext";

export const App = () => (
  <ChakraProvider theme={theme}>
    <TodoProvider>
      <>
        <TopBar />
        <TodoBoard />
      </>
    </TodoProvider>
  </ChakraProvider>
);
