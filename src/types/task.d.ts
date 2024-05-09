export type TaskForm = {
  title: string;
  priority: string;
  due_on: string | null;
  status: string;
};

export type Task = TaskForm & {
  id: number;
  created_on: string;
};
