# 🤖 GEMINI.md - Contexto para IA

Este arquivo fornece contexto técnico imediato para assistentes de IA (Gemini, Claude, ChatGPT) que trabalham neste projeto.

## 🚀 Stack Tecnológica
- **Core:** React 19 (Functional Components, Hooks)
- **Linguagem:** TypeScript (Strict Mode)
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS 4 (Apenas classes utilitárias, sem CSS customizado)
- **Estado Global:** Redux Toolkit (Store centralizada em `src/redux/store.ts`)
- **Animações:** Framer Motion
- **Feedback:** Sonner (Toasts), React Rewards (Confete)

## 🏗️ Convenções de Código
- **Componentes:** Um por arquivo, exportação nomeada ou default (seguindo o padrão atual).
- **Estado de Tarefas:** SEMPRE via Redux Slice (`todoSlice.ts`). Proibido `useState` para a lista de tarefas.
- **Strings:** Todas as mensagens ao usuário devem ser em **Português (PT-BR)**.
- **Tipagem:** Proibido o uso de `any`. Utilize as interfaces em `src/types/`.
- **Estilo:** Naming camelCase para funções/variáveis, PascalCase para componentes.

## 📊 Estrutura do Estado (Redux)
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}
```

## 🛠️ Comandos Comuns
- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run lint`: Executa a verificação do ESLint.

## 📋 Backlog / Próximos Passos
1. Implementar `redux-persist` para manter os dados no reload.
2. Adicionar edição inline de tarefas.
3. Adicionar contador de progresso.
4. Implementar Dark Mode com toggle.
5. Adicionar Error Boundary.
