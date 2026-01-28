# 🚀 Guia de Deploy no GitHub Pages

Este guia explica como fazer o deploy do Super App e dos aplicativos remotos no GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório do Super App configurado
- Repositórios dos aplicativos remotos (todoApp, despensa_inteligente, etc.)

## 🏗️ Arquitetura no GitHub Pages

```
https://username.github.io/
├── react-super-app/          # Host (Super App)
├── todo-app/                 # Remote App 1
└── despensa-inteligente/     # Remote App 2
```

## ⚙️ Configuração do Super App

### 1. Configurar Variáveis de Ambiente

Edite o arquivo `.env.production` com as URLs corretas dos seus aplicativos remotos:

```bash
# Base path - deve corresponder ao nome do repositório
VITE_BASE_PATH=/react-super-app/

# URLs dos aplicativos remotos no GitHub Pages
VITE_TODO_APP_URL=https://viniciusvrodrigues.github.io/todo-app/assets/remoteEntry.js
VITE_DESPENSA_APP_URL=https://viniciusvrodrigues.github.io/despensa-inteligente/assets/remoteEntry.js
```

### 2. Habilitar GitHub Pages no Repositório

1. Vá para **Settings** > **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações

### 3. Deploy Automático

O workflow `.github/workflows/deploy.yml` está configurado para fazer deploy automaticamente quando você fizer push para a branch `main`:

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

### 4. Deploy Manual (Opcional)

Você também pode fazer deploy manualmente:

1. Vá para a aba **Actions** no GitHub
2. Selecione o workflow "Deploy to GitHub Pages"
3. Clique em **Run workflow**

## 🔧 Configuração dos Aplicativos Remotos

Cada aplicativo remoto também precisa ser configurado para GitHub Pages.

### Estrutura do vite.config.ts para Remote Apps

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  // IMPORTANTE: Configure o base path
  base: '/nome-do-repositorio/',
  
  plugins: [
    react(),
    federation({
      name: 'todoApp',  // Nome único do app
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
```

### Workflow para Remote Apps

Crie `.github/workflows/deploy.yml` em cada repositório remoto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 📝 Ordem de Deploy

Para que tudo funcione corretamente:

1. **Primeiro**: Faça deploy dos aplicativos remotos
   - Deploy do `todo-app`
   - Deploy do `despensa-inteligente`
   
2. **Depois**: Atualize `.env.production` do Super App com as URLs corretas

3. **Por último**: Faça deploy do Super App

## 🔍 Verificação

Após o deploy, verifique:

1. ✅ Super App acessível em `https://username.github.io/react-super-app/`
2. ✅ Console do navegador sem erros de CORS
3. ✅ Aplicativos remotos carregando corretamente
4. ✅ Navegação funcionando entre as rotas

## 🐛 Troubleshooting

### Erro 404 ao acessar rotas

**Problema**: Páginas funcionam no index, mas dão 404 ao recarregar outras rotas.

**Solução**: Adicione um arquivo `404.html` na pasta `public/` que seja uma cópia do `index.html`. GitHub Pages vai servir este arquivo para rotas não encontradas.

```bash
cp public/index.html public/404.html
```

Ou adicione ao workflow:

```yaml
- name: Copy index to 404
  run: cp dist/index.html dist/404.html
```

### Módulos remotos não carregam

**Problema**: Erro "Failed to fetch dynamically imported module"

**Soluções**:
1. Verifique se as URLs dos remotos estão corretas no `.env.production`
2. Verifique se os remotos foram deployados antes do host
3. Verifique o console do navegador para erros de CORS
4. Confirme que o `base` path está configurado corretamente em cada app

### Assets não carregam (404)

**Problema**: CSS, imagens ou JS não carregam.

**Solução**: Verifique o `base` path no `vite.config.ts`:
- Deve ser `'/nome-do-repo/'` (com barras no início e fim)
- Deve corresponder exatamente ao nome do repositório

### CORS Errors

**Problema**: Erro de CORS ao tentar carregar módulos remotos.

**Solução**: GitHub Pages já configura CORS corretamente. Se ainda houver erro:
1. Verifique se todos os apps estão no mesmo domínio GitHub Pages
2. Confirme que as URLs estão usando HTTPS

## 🎯 Exemplo Completo

### Repositório: react-super-app
**.env.production**
```bash
VITE_BASE_PATH=/react-super-app/
VITE_TODO_APP_URL=https://viniciusvrodrigues.github.io/todo-app/assets/remoteEntry.js
VITE_DESPENSA_APP_URL=https://viniciusvrodrigues.github.io/despensa-inteligente/assets/remoteEntry.js
```

### Repositório: todo-app
**vite.config.ts**
```typescript
export default defineConfig({
  base: '/todo-app/',
  plugins: [
    react(),
    federation({
      name: 'todoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  // ... resto da config
})
```

### Repositório: despensa-inteligente
**vite.config.ts**
```typescript
export default defineConfig({
  base: '/despensa-inteligente/',
  plugins: [
    react(),
    federation({
      name: 'despensa_inteligente',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  // ... resto da config
})
```

## 🔄 Atualizações

Para atualizar o app após mudanças:

```bash
# Fazer alterações no código
git add .
git commit -m "Descrição das mudanças"
git push origin main

# O GitHub Actions fará o deploy automaticamente
```

## 📚 Links Úteis

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Module Federation Guide](https://module-federation.github.io/)

## ✅ Checklist de Deploy

- [ ] Configurar `.env.production` com URLs corretas
- [ ] Habilitar GitHub Pages no repositório (Source: GitHub Actions)
- [ ] Fazer deploy dos aplicativos remotos primeiro
- [ ] Fazer deploy do Super App
- [ ] Testar no navegador
- [ ] Verificar console para erros
- [ ] Testar navegação entre rotas
- [ ] Testar reload de páginas
