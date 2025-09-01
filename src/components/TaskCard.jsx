// components/TaskCard.jsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`bg-white p-4 mb-3 rounded-lg shadow cursor-pointer transition-transform 
        ${isDragging ? "scale-105 shadow-lg" : ""}`}
    >
      <span className="font-medium">{task.title}</span>
    </div>
  );
}
