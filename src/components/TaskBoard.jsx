// components/TaskBoard.jsx
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";
import { useAuth } from "../context/AuthContext";

const statuses = ["To-Do", "In Progress", "Done"];

export default function TaskBoard() {
  const { user } = useAuth();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", status: "To-Do" },
    { id: "2", title: "Task 2", status: "In Progress" },
    { id: "3", title: "Task 3", status: "Done" },
  ]);


  // Firestore listener
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      setTasks([]);
      return;
    }

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", user.id)
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const userTasks = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTasks(userTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? { ...task, status: over.id } // update status to the column it was dropped in
          : task
      )
    );

    try {
      const taskRef = doc(db, "tasks", activeId);
      await updateDoc(taskRef, {
        status: overContainer,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim() || !user?.id) return;

    try {
      const newTask = {
        title: newTaskTitle.trim(),
        status: "To-Do",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "tasks"), newTask);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const editTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle && newTitle.trim() !== task.title) {
      try {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
          title: newTitle.trim(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error("Error editing task:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <AddTaskForm
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        addTask={addTask}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 justify-center">
          {statuses.map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            return (
              <SortableContext
                key={status}
                items={statusTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <TaskColumn
                  status={status}
                  tasks={statusTasks}
                  editTask={editTask}
                  removeTask={removeTask}
                />
              </SortableContext>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
