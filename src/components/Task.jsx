import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTaskToEdit, toggleCompleted, deleteTask } from "../store/taskSlice";

export default function Task({id ,name, description, priority, completed}){
  
  const dispatch = useDispatch();
  const openForm = useSelector((state) => state.tasks.openForm);

  const handleCompleted = () => {
    const newStatus = {id, completed};
    dispatch(toggleCompleted(newStatus));
  };

  const handleDelete = () => {
    dispatch(deleteTask(id))
  };

  const handleEdit = () => {
    const dataToEdit = { id, name, description, priority, completed };
    dispatch(setTaskToEdit(dataToEdit));
  };
  
  return (
      <li className={`list-item ${completed ? 'bg-fuchsia-50' : undefined}`}>
  
        <div className="flex flex-col gap-1">
          <h3 className='text-lg text-fuchsia-600'>{name} <span className='ml-4 px-2 text-white bg-slate-500 rounded-full !text-sm'>{priority}</span></h3>
          <p>{description}</p>
          
        </div>
  
        <div className='flex gap-3 items-center'>
          <a 
              href="#form-box" 
              className="btn-outline" 
              onClick={handleEdit}
          >
              Edit
          </a>
          <button 
              className="btn" 
              onClick={handleDelete}
          >
              Delete
          </button>
          <div className='flex flex-col items-center'>
            <label htmlFor="completed">Completed</label>
            <input 
              type="checkbox" 
              name="completed" 
              id="completed" 
              className='!h-4 !w-4' 
              checked={completed} 
              onChange={handleCompleted}
            />
          </div>
    
        </div>
  
      </li>
  )
}