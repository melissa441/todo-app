// src/services/taskService.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

// ✅ Add a task
export async function addTask(userId, task) {
  await addDoc(collection(db, "tasks"), {
    ...task,
    userId,
    createdAt: Date.now(),
  });
}

// ✅ Get all tasks for a user
export async function getUserTasks(userId) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ✅ Update task (move between todo/in-progress/done, etc.)
export async function updateTask(taskId, updates) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updates);
}

// ✅ Delete task
export async function deleteTask(taskId) {
  await deleteDoc(doc(db, "tasks", taskId));
}
