import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, clearTaskToEdit } from "../store/taskSlice";

export default function AddTask(props){
    
    const dispatch = useDispatch();
    const taskEdit = useSelector((state) => state.tasks.taskEdit); // getting data to edit to fill the form 

    // Local state for the form fields
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priority: 'Low',
        completed: false
    });
    // saving form errors
    const [errors, setErrors] = useState({});
    // generate new id after adding a new task
    const [idTask, setIdTask] = useState(11);

    useEffect(() => {
        if (taskEdit) {
          setFormData(taskEdit);
        }
    }, [taskEdit]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Step 3: Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {}; // store errors as an object
    
        // Defining fields condition to display errors
        if (!formData.name.trim()) newErrors.name = 'Task name is required';
        if (formData.name.length > 0 && formData.name.length < 10) newErrors.name = 'Task name must have at least 10 caracters';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.description.length > 0 && formData.description.length < 20) newErrors.description = 'Task description must have at least 20 caracters';
        // Updating Errors state to display errors
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        // empty the erros object to store new errors 
        setErrors({});

        // handle if we are adding or editing a task
        if(taskEdit){
            // We're editing an existing task
            dispatch(editTask(formData));
            // clear the taskEdit state
            dispatch(clearTaskToEdit());
            resetForm();
        }else{
            // creating the object to add a new task
            const newTask = {
                id: idTask,
                name: formData.name,
                description: formData.description,
                priority: formData.priority,
                completed: formData.completed,
            };
            // sending the data to the reducer addTask
            dispatch(addTask(newTask));
            // Reset form
            resetForm();
            // update the id
            setIdTask(idTask + 1);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            priority: 'Low',
            completed: false
        });
    };

    return (
        <div className='box' id='form-box'>
        <h2 className="py-5 text-center text-2xl">{taskEdit ? "Update Task" : "Create New Task"}</h2>

        <form className='flex flex-col gap-2 lg:!w-[80%] mx-auto' onSubmit={handleSubmit}>
            

            <label htmlFor="name" className="font-semibold" required >Task Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={formData.name}
              onChange={handleChange} 
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

            <label htmlFor="description" className="font-semibold">Description</label>  
            <textarea 
                name="description" 
                id="description" 
                rows="6"
                value={formData.description}
                onChange={handleChange} 
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

            <select 
                name="priority" 
                id="priority" 
                className='md:w-96' 
                onChange={handleChange} 
                value={formData.priority}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            

            <button type="submit" className='btn mt-6 md:w-32'>{taskEdit ? "Update Task" : "Create Task"}</button>

        </form>

        </div>
    )
}