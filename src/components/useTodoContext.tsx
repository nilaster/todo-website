import * as React from "react";
import { TodoContext } from "../contexts/todoContext";

export const useTodoContext = () => React.useContext(TodoContext);
