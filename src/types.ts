interface Todo {
  id: number;
  text: string;
  status: 'todo' | 'done';
  createdDate: Date;
  completedDate?: Date;
}

export { Todo };
