import { useEffect, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { setFilter } from "./redux/todoSlice";
import { Form } from "./components/Form";
import { ToDoOption } from "./components/ToDoOption";
import { FilterType } from "./types/todo";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { FaCheckCircle, FaListUl, FaHourglassHalf } from "react-icons/fa";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Ops! Algo deu errado.</h2>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded-lg">Recarregar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProgressCounter({ count }: { count: number }) {
  return (
    <motion.span
      key={count}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
    >
      {count}
    </motion.span>
  );
}

function App() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("dark");
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active": return todos.filter((todo) => !todo.completed);
      case "completed": return todos.filter((todo) => todo.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;
  
  const springProgress = useSpring(0, { stiffness: 100, damping: 20 });
  useEffect(() => { springProgress.set(progressPercent); }, [progressPercent, springProgress]);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gray-50 transition-colors duration-500 px-4 py-8 md:py-16">
        <div className="max-w-[600px] mx-auto">
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              tuh<span className="text-blue-600">doo</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Organize seu dia com estilo</p>
          </motion.header>

          {/* Progress Section */}
          <AnimatePresence>
            {todos.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8"
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Seu Progresso</span>
                    <div className="text-2xl md:text-3xl font-black text-gray-900 flex gap-1.5 items-baseline">
                      <ProgressCounter count={completedCount} />
                      <span className="text-gray-400 text-lg md:text-xl font-medium">/ {todos.length} concluídas</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-600">{Math.round(progressPercent)}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    style={{ width: springProgress }}
                    className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Form />

          {/* Filters */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl relative">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => dispatch(setFilter(f))}
                className={`relative flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors z-10 ${
                  filter === f ? "text-white" : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label={`Filtrar por ${f === 'all' ? 'todas' : f === 'active' ? 'ativas' : 'concluídas'}`}
              >
                {f === "all" && "Todas"}
                {f === "active" && "Ativas"}
                {f === "completed" && "Concluídas"}
                {filter === f && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4 relative min-h-[200px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <ToDoOption key={todo.id} {...todo} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="text-gray-200 mb-6"
                  >
                    {filter === "all" && <FaListUl size={80} />}
                    {filter === "active" && <FaHourglassHalf size={80} />}
                    {filter === "completed" && <FaCheckCircle size={80} />}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-400">
                    {filter === "all" && "Sua lista está vazia."}
                    {filter === "active" && "Tudo pronto por aqui!"}
                    {filter === "completed" && "Nenhuma tarefa concluída ainda."}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {filter === "all" && "Que tal começar o dia produtivo?"}
                    {filter === "active" && "Aproveite seu tempo livre!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <footer className="mt-20 py-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 tuh-doo • <a href="https://miguelito.dev" className="text-blue-500 font-bold hover:underline">miguelito.dev</a>
            </p>
          </footer>
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
