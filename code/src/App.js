import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Header from 'components/Header';
import AddTask from 'components/AddTask';
import TaskList from 'components/TaskList';
import Progress from 'components/Progress';
import tasks from 'reducers/tasks';

export const App = () => {
  const reducer = combineReducers({
    tasks: tasks.reducer
  });
  const store = configureStore({ reducer })
  return (
    <Provider store={store}>
      <Header />
      <AddTask />
      <TaskList />
      <Progress />
    </Provider>
  );
}
