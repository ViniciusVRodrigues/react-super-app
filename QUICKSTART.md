# 🚀 Guia Rápido: Deploy no GitHub Pages

## Para o Super App

### 1. Configure as URLs dos Remotos

Edite `.env.production`:

```bash
VITE_BASE_PATH=/react-super-app/
VITE_TODO_APP_URL=https://username.github.io/todo-app/assets/remoteEntry.js
VITE_DESPENSA_APP_URL=https://username.github.io/despensa-inteligente/assets/remoteEntry.js
```

### 2. Habilite GitHub Pages

1. Vá em **Settings** > **Pages**
2. Source: **GitHub Actions**
3. Salvar

### 3. Faça Deploy

```bash
git push origin main
```

Pronto! 🎉 O workflow fará o deploy automaticamente.

---

## Para Aplicativos Remotos

### 1. Configure o vite.config.ts

```typescript
export default defineConfig({
  base: '/nome-do-repo/',  // Nome do seu repositório
  plugins: [
    federation({
      name: 'nomeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
})
```

### 2. Adicione o Workflow

Copie `.github/workflows/deploy.yml` do Super App

### 3. Habilite GitHub Pages

Settings > Pages > Source: GitHub Actions

### 4. Faça Deploy

```bash
git push origin main
```

---

## 📋 Ordem de Deploy

1. ✅ Deploy dos **remotos** primeiro
2. ✅ Atualize `.env.production` do Super App
3. ✅ Deploy do **Super App**

---

## 🔗 URLs Finais

- Super App: `https://username.github.io/react-super-app/`
- Todo App: `https://username.github.io/todo-app/`
- Despensa: `https://username.github.io/despensa-inteligente/`

---

## 📚 Documentação Completa

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia completo de deployment
- [REMOTE_APP_TEMPLATE.md](./REMOTE_APP_TEMPLATE.md) - Template para apps remotos
