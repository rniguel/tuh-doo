# 🤝 Guia de Contribuição

Obrigado por se interessar em contribuir para o **tuh-doo**!

## 🌿 Fluxo de Branches

Seguimos um fluxo simplificado baseado no Git Flow:

- `main`: Versão estável em produção.
- `develop`: Branch de integração para novas funcionalidades.
- `feature/*`: Para novas funcionalidades (ex: `feature/dark-mode`).
- `fix/*`: Para correção de bugs (ex: `fix/input-overlap`).

## 🛠️ Padrões de Código

- Use `npm run lint` antes de cada commit.
- Garanta que todos os botões e inputs tenham `aria-label` para acessibilidade.
- Não deixe `console.log` no código final.
- Escreva mensagens de commit claras e em inglês (ou português, desde que consistente).

## ✅ Checklist para Pull Request

- [ ] A feature/correção foi testada localmente?
- [ ] O código segue as convenções do projeto?
- [ ] Novos componentes possuem tipagem TypeScript adequada?
- [ ] Não há `any` no código.
- [ ] A build (`npm run build`) passa sem erros.

## 🚀 Processo de Submissão

1. Faça o fork do projeto.
2. Crie sua branch (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças (`git commit -m 'feat: add some feature'`).
4. Push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request para a branch `develop`.
