import * as React from "react";
import { Task, TaskForm } from "../types/task";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../api/tasksAPI";

type TodoContextType = {
  tasks: Task[];
  newTask: (task: TaskForm) => Promise<Task>;
  editTask: (task: Task) => Promise<Task>;
  removeTask: (task: Task) => Promise<void>;
};

const defaultValue: TodoContextType = {
  tasks: [],
  newTask: async () => ({} as Task),
  editTask: async () => ({} as Task),
  removeTask: async () => {},
};

export const TodoContext = React.createContext<TodoContextType>(defaultValue);

export const TodoProvider = ({ children }: { children: React.JSX.Element }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const refreshTasks = async () => {
    const fetchedTasks = await getAllTasks();
    setTasks(fetchedTasks);
    console.log("Tasks refreshed.");
  };

  // Populate task state on load
  React.useEffect(() => {
    refreshTasks();
  }, []);

  const newTask = React.useCallback(async (taskForm: TaskForm) => {
    const task = await createTask(taskForm);
    await refreshTasks();
    return task;
  }, []);

  const editTask = React.useCallback(async (editedTask: Task) => {
    const task = await updateTask(editedTask);
    await refreshTasks();
    return task;
  }, []);

  const removeTask = React.useCallback(async (task: Task) => {
    await deleteTask(task);
    await refreshTasks();
  }, []);

  const value = React.useMemo(
    () => ({ tasks, newTask, editTask, removeTask }),
    [tasks, newTask, editTask, removeTask]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
