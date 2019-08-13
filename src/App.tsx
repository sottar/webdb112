import React, { useState } from 'react';
import styled from 'styled-components';
import Items from './components/Items';
import { Todo } from './types';

const initialState = {
  taskList: [],
};

interface State {
  taskList: Array<Todo>;
}

const getTasks = (taskList: Todo[]) => {
  const todoList = [];
  const doneList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].status === 'todo') {
      todoList.push(taskList[i]);
      continue;
    }
    doneList.push(taskList[i]);
  }
  return [todoList, doneList];
};

const App = () => {
  const [state, setState] = useState<State>(initialState);
  const [todoText, setTodoText] = useState<string>('');

  const doneTask = (id: number) => {
    const clonedTaskList = [...state.taskList];
    for (let i = 0; i < clonedTaskList.length; i++) {
      if (clonedTaskList[i].id === id) {
        clonedTaskList[i].status = 'done';
        clonedTaskList[i].completedDate = new Date(); // (1)
        break;
      }
    }
    setState({ taskList: clonedTaskList });
  };

  const addTask = () => {
    const taskList = [...state.taskList];
    const id = state.taskList.length;
    taskList.push({
      id: id,
      text: todoText,
      status: 'todo',
      createdDate: new Date(),
    });
    setState({ taskList });
    setTodoText('');
  };

  const [todo, done] = getTasks(state.taskList);
  return (
    <Wrapper>
      <h1>TODO APP with TypeScript</h1>
      <Head>Todo tasks</Head>
      <Items tasks={todo} doneTask={doneTask} />
      <Head>Done tasks</Head>
      <Items tasks={done} doneTask={doneTask} />
      <AddTask>
        <input type="text" value={todoText} onChange={e => setTodoText(e.target.value)} />
        <div onClick={addTask}>add new task</div>
      </AddTask>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
`;
const AddTask = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  > input {
    height: 20px;
    width: 200px;
  }
  > div {
    margin-left: 10px;
    padding: 3px 10px;
    border: 1px solid #333;
    color: #efefef;
    background-color: #333;
    border-radius: 3px;
  }
`;

const Head = styled.h2`
  margin-bottom: 10px;
`;

export default App;
