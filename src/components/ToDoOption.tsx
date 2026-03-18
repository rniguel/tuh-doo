import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo, editTodo } from "../redux/todoSlice";
import { Todo } from "../types/todo";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useReward } from "react-rewards";

const AnimatedTick = ({ completed }: { completed: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0">
    <motion.rect
      width="22"
      height="22"
      x="1"
      y="1"
      rx="6"
      className="fill-none stroke-[2] stroke-gray-300"
      initial={false}
      animate={{ 
        stroke: completed ? "#22c55e" : "#d1d5db",
        fill: completed ? "#22c55e" : "rgba(34, 197, 94, 0)"
      }}
    />
    <motion.path
      d="M6 12l4 4 8-8"
      fill="transparent"
      strokeWidth="3"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{ pathLength: completed ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </svg>
);

export function ToDoOption({ id, text, completed }: Todo) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const { reward } = useReward(`reward-${id}`, "confetti");

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
    if (!completed) reward();
  };

  const handleEdit = () => {
    if (editText.trim() !== text) dispatch(editTodo({ id, text: editText }));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      layout
      initial={{ x: -20, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 20, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group flex items-center gap-4 p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:shadow-gray-200/40"
    >
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.8 }}
        className="focus:outline-none"
        aria-label={completed ? "Marcar como pendente" : "Marcar como concluída"}
      >
        <span id={`reward-${id}`} className="absolute" />
        <AnimatedTick completed={completed} />
      </motion.button>

      <div className="flex-grow min-w-0" onDoubleClick={() => setIsEditing(true)}>
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.input
              key="edit"
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-b-2 border-blue-500 outline-none text-gray-800 font-medium py-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : (
            <motion.span
              key="text"
              className={`block truncate text-base md:text-lg font-medium transition-all cursor-text ${
                completed ? "text-gray-300 line-through" : "text-gray-700"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          aria-label="Editar"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => dispatch(removeTodo(id))}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Excluir"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </motion.li>
  );
}
