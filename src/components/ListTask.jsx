import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

/**
 * TaskList component to render the filtered list of tasks.
 *
 * @component
 * @returns {JSX.Element} Rendered list of tasks.
 */
export default function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);

  const filteredTasks = tasks.filter(task => {
    const matchesName = task.name
      .toLowerCase()
      .includes(filters.nameFilter.toLowerCase());
    const matchesPriority =
      !filters.priorityFilter || task.priority === filters.priorityFilter;
    const matchesCompleted =
      filters.completedFilter === ''
        ? true
        : task.completed.toString() === filters.completedFilter.toString();

    return matchesName && matchesPriority && matchesCompleted;
  });

  return (
    <div className='box'>
      <h2 className="py-5 text-center text-2xl mb-6">Todo</h2>
      <ul className='list-group lg:!w-[80%] mx-auto'>
        {filteredTasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </ul>
    </div>
  );
}
