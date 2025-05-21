/**
 * Redux slice for managing tasks.
 * Includes actions for adding, editing, toggling completion, filtering, and form control.
 */

import { createSlice } from '@reduxjs/toolkit';
import rawData from '../data';

/**
 * Load tasks from localStorage or fallback to rawData and sync localStorage.
 * @returns {Array} Array of tasks.
 */
function loadInitialTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Invalid localStorage data:", e);
      }
    }
  
    // First load: use rawData and persist it
    localStorage.setItem('tasks', JSON.stringify(rawData));
    return rawData;
  }

/**
 * @typedef {Object} Task
 * @property {string} id - Unique ID of the task
 * @property {string} name - Task name
 * @property {string} description - Task description
 * @property {string} priority - Priority level (Low, Medium, High)
 * @property {boolean} completed - Completion status
 */

/**
 * @typedef {Object} Filters
 * @property {string} nameFilter - Filter by name
 * @property {string} priorityFilter - Filter by priority
 * @property {string|boolean} completedFilter - Filter by completion
 */

const initialState = {
  /** @type {Task[]} */
  tasks: loadInitialTasks(),
  
  /** @type {Filters} */
  filters: {
    nameFilter: '',
    priorityFilter: '',
    completedFilter: '',
  },

  /** @type {boolean} */
  openForm: false,

  /** @type {Task|null} */
  taskEdit: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * Add a new task.
     * @param {Object} state
     * @param {Object} action
     */
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    /**
     * Edit an existing task.
     * @param {Object} state
     * @param {Object} action
     */
    editTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    deleteTask: (state, action) => {
        // Remove task from the tasks array
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      
        // Update localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    /**
     * Toggle the completed status of a task.
     * @param {Object} state
     * @param {Object} action
     */
    toggleCompleted: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    /**
     * Set a filter field.
     * @param {Object} state
     * @param {Object} action
     */
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },

    /**
     * Reset all filters.
     * @param {Object} state
     */
    resetFilters: (state) => {
      state.filters = {
        nameFilter: '',
        priorityFilter: '',
        completedFilter: '',
      };
    },

    /**
     * Toggle the task form display.
     * @param {Object} state
     */
    formOpen: (state) => {
      state.openForm = !state.openForm;
    },

    /**
     * Set the task to be edited.
     * @param {Object} state
     * @param {Object} action
     */
    setTaskToEdit: (state, action) => {
      state.taskEdit = action.payload;
      state.openForm = true;
    },

    /**
     * Clear the task edit state.
     * @param {Object} state
     */
    clearTaskToEdit: (state) => {
      state.taskEdit = null;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleCompleted,
  setFilter,
  resetFilters,
  formOpen,
  setTaskToEdit,
  clearTaskToEdit,
} = taskSlice.actions;

export default taskSlice.reducer;
