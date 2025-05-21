// Load state from localStorage
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("tasks");
      return serializedState ? JSON.parse(serializedState) : null;
    } catch (err) {
      console.error("Failed to load state:", err);
      return null;
    }
  };
  
// Save state to localStorage
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("tasks", serializedState);
    } catch (err) {
      console.error("Failed to save state:", err);
    }
};
  