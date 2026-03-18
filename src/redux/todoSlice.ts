import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState, FilterType } from "../types/todo";
import { toast } from "sonner";

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; id: string }>) => {
      state.todos.push({
        ...action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      toast.success("Tarefa adicionada!");
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      toast.info("Tarefa removida.");
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        if (text.trim() === "") {
          state.todos = state.todos.filter((t) => t.id !== id);
          toast.warning("Texto vazio, tarefa removida.");
        } else {
          todo.text = text;
          toast.success("Tarefa atualizada!");
        }
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
