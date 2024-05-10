import { Task, TaskForm } from "../types/task";

const baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://todo-server-dev.eu-west-2.elasticbeanstalk.com";

export const getAllTasks = async () => {
  const url = baseURL + "/tasks/";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return (await res.json()) as Task[];
};

export const createTask = async (task: TaskForm) => {
  const url = baseURL + "/tasks/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return (await res.json()) as Task;
};

export const updateTask = async (task: Task) => {
  const url = baseURL + `/tasks/${task.id}/`;
  const form: TaskForm = {
    title: task.title,
    priority: task.priority,
    status: task.status,
    due_on: task.due_on,
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    throw new Error("Failed to update task");
  }
  return (await res.json()) as Task;
};

export const deleteTask = async (task: Task) => {
  const url = baseURL + `/tasks/${task.id}/`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
};
