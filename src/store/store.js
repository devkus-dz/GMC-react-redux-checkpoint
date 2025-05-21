import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';
import { saveState } from './localStorageUtils';

const store = configureStore({
    reducer:{
        tasks: taskReducer,
    }
});

// Save only `tasks` state (not filters/form flags)
store.subscribe(() => {
    const state = store.getState();
    saveState(state.tasks.tasks); // Save only the tasks list
  });
  
export default store;