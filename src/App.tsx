import React, { useState } from 'react';
import { Todo } from './types';
import styled from 'styled-components';

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
    });
    setState({ taskList });
    setTodoText('');
  };
  const [todo, done] = getTasks(state.taskList);
  return (
    <Wrapper>
      <h1>TODO APP with TypeScript</h1>
      <Head>Todo tasks</Head>
      <ItemWrapper>
        {todo.map(t => (
          <li onClick={() => doneTask(t.id)} key={t.id}>
            <div></div>
            <span>{t.text}</span>
          </li>
        ))}
      </ItemWrapper>
      <Head>Done tasks</Head>
      <ItemWrapper>
        {done.map(t => (
          <li key={t.id}>
            <div></div>
            <span>{t.text}</span>
          </li>
        ))}
      </ItemWrapper>

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

const ItemWrapper = styled.ul`
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    justify-items: center;
    list-style: none;
    background-color: #efefef;
    font-size: 24px;
    padding: 5px 15px;
    margin-bottom: 2px;
    border-radius: 4px;
    > div {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      background-color: white;
    }
    > span {
      padding-left: 10px;
    }
  }
`;

export default App;
