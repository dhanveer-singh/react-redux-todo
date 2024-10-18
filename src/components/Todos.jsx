import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo, toggleComplete } from '../features/todo/todoSlice';
import AddTodo from './AddTodo';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);

  const handleEdit = (id) => setEditId(id);

  const handleSave = (id, newText) => {
    if (newText.trim()) {
      dispatch(editTodo({ id, newText }));
      setEditId(null);
    }
  };

  const completedTodos = todos
    .filter(todo => todo.completed)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl">
        <AddTodo
          editMode={editId !== null}
          initialValue={editId != null ? todos.find(todo => todo.id === editId)?.text : ''}
          onSave={newText => handleSave(editId, newText)}
          onCancel={() => setEditId(null)}
        />

        <ul className="mt-4">
          <li className="text-3xl text-gray-900 dark:text-white">Mine Todos</li>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => dispatch(toggleComplete(todo.id))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor={todo.id} className={`text-white text-md font-medium ${todo.completed ? 'line-through' : ''}`}>{todo.text}</label>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-2xl text-gray-800 mt-4 text-center bg-green-300 rounded">
              Enjoy! You have no todos yet.
            </li>
          )}
        </ul>
      </div>

      {/* Completed Todo List */}
      <div className="flex flex-col ml-8 w-1/3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Completed Todos</h2>
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
            <div key={todo.id} className="mt-4 bg-green-300 p-4 text-md font-medium rounded-lg">
              {todo.text}
            </div>
          ))
        ) : (
          <div className="mt-4 text-gray-500 text-md">No completed todos.</div>
        )}
      </div>
    </div>
  );
};

export default Todos;
