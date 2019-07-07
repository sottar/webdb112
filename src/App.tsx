import React, { useState } from 'react';
import { Todo } from './types';

const initialState = {
  todoList: [],
};

interface State {
  todoList: Array<Todo>;
}

const App = () => {
  const [state, setState] = useState<State>(initialState);
  return (
    <>
      <h1>TODO APP with TypeScript</h1>
      <ul>
        <li>Task1</li>
      </ul>
      <input type="text" />
      <div>Add</div>
    </>
  );
};

export default App;
