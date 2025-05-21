import AddTask from './AddTask';
import { setFilter, resetFilters, formOpen, clearTaskToEdit } from '../store/taskSlice'
import { useSelector, useDispatch } from 'react-redux';

/**
 * Filter component to control task filtering and form display.
 *
 * @component 
 * @returns {JSX.Element} Filter and form interface.
 */

export default function Filter() {

  const openForm = useSelector((state) => state.tasks.openForm);
  const taskEdit = useSelector((state) => state.tasks.taskEdit);
  const filters = useSelector((state) => state.tasks.filters);
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ name, value }));
  };

  const handleForm = () => {
    dispatch(formOpen());
    dispatch(clearTaskToEdit());
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

    return (
    <>
      <div className='box flex flex-col md:flex-row gap-6 justify-between'>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="nameFilter"
            className='lg:w-96 md:w-46'
            placeholder="Filter by name..."
            value={filters.nameFilter}
            onChange={handleChange}
          />
            
          <select 
            name="priorityFilter" 
            id="priorityFilter" 
            className='md:w-46 lg:w-64' 
            value={filters.priorityFilter} 
            onChange={handleChange}
          >
            <option value="" >Choose priority </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            name="completedFilter" 
            id="completed" 
            className='md:w-46 lg:w-64'
            value={filters.completedFilter} 
            onChange={handleChange}
          >
            <option value="">Choose completed status</option>
            <option value={false}>On Going</option>
            <option value={true}>Completed</option>
          </select>

        </div>
        <div>
          {/* Button to reset filters */}
          <button className="btn-outline m-2" onClick={handleReset}>Reset Filters</button>
          {/* Button to open the New Task form */}
          <button className="btn" onClick={handleForm}>{openForm ? "Hide Form" : "New Task"}</button>
         
        </div>
      </div>
      
      {openForm && <AddTask taskEdit={taskEdit} />}
    
    </>
  )
}
