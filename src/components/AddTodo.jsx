import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/features/todo/todoSlice';

const AddTodo = ({ editMode = false, initialValue = '', onSave, onCancel }) => {
  const [inputTodo, setInputTodo] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputTodo(initialValue || '');
    if (editMode) setError(false);
  }, [initialValue, editMode]);

  const handleInputChange = (e) => {
    setInputTodo(e.target.value);
    if (error) setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputTodo.trim() === '') {
      setError('You cannot add empty todo.');
      return;
    }
    if (inputTodo.length > 50) {
      setError('Todo must be less than 50 character.');
      return;
    }
    if (editMode) {
      onSave(inputTodo);
    } else {
      dispatch(addTodo(inputTodo));
    }
    setInputTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          className={`block w-full p-4 pr-32 text-sm text-gray-900 border ${error ? 'border-red-300  focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} rounded-lg bg-gray-50 focus:outline-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="text-white absolute end-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 pr-4 flex gap-1 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          {editMode ? 'Save Todo' : 'Add Todo'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {editMode && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 text-gray-700 underline hover:text-gray-900"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTodo;
