import { useState, useRef, useCallback, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { RootState } from "../redux/store";
import { toast } from "sonner";
import { useReward } from "react-rewards";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";

export function Form() {
  const [newToDo, setNewToDo] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const idTodo = useId();
  const { reward } = useReward("todoCreated", "confetti");
  const inputTodo = useRef<HTMLInputElement>(null);

  const handleAddToDo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = newToDo.trim();
      if (!text) {
        toast.error("Por favor, digite algo antes de adicionar!");
        return;
      }
      if (todos.some((todo) => todo.text.toLowerCase() === text.toLowerCase())) {
        toast.warning("Essa tarefa já existe na sua lista.");
        return;
      }
      dispatch(addTodo({ id: `${Date.now()}-${idTodo}`, text }));
      reward();
      setNewToDo("");
      inputTodo.current?.focus();
    },
    [newToDo, dispatch, idTodo, todos, reward]
  );

  return (
    <motion.form 
      onSubmit={handleAddToDo}
      className="flex flex-col md:flex-row gap-3 bg-white p-2.5 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <input
        ref={inputTodo}
        className="flex-grow bg-transparent px-5 py-4 outline-none text-gray-800 placeholder-gray-400 text-base md:text-lg font-medium"
        placeholder="O que você precisa fazer?"
        type="text"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
        aria-label="Nova tarefa"
      />
      <motion.button
        type="submit"
        disabled={!newToDo.trim()}
        animate={newToDo.trim() ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } } : { scale: 1 }}
        whileTap={{ scale: 0.95 }}
        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[50px]"
        aria-label="Adicionar tarefa"
      >
        <span id="todoCreated" className="absolute" />
        <FaPlus size={20} />
        <span className="md:hidden">Adicionar</span>
      </motion.button>
    </motion.form>
  );
}
