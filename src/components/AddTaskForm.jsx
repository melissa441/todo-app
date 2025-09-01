// components/AddTaskForm.jsx
import React from "react";

export default function AddTaskForm({ newTaskTitle, setNewTaskTitle, addTask }) {
  return (
    <div className="flex gap-2 mb-6 justify-center">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        className="border border-pink-400 p-3 rounded-lg shadow-md flex-1 max-w-md 
                   focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        onClick={addTask}
        className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-md 
                   hover:bg-pink-600 transition"
      >
        Add
      </button>
    </div>
  );
}
