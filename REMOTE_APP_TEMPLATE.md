# 🔧 Configuração de Aplicativo Remoto para GitHub Pages

Este é um template de configuração para aplicativos remotos que serão consumidos pelo Super App via Module Federation.

## 📋 Pré-requisitos

- Vite + React
- @originjs/vite-plugin-federation instalado

## ⚙️ Configuração do vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  // IMPORTANTE: Configure o base path para GitHub Pages
  // Deve corresponder ao nome do seu repositório
  base: '/nome-do-seu-repositorio/',
  
  plugins: [
    react(),
    federation({
      // Nome único da sua aplicação
      name: 'nomeDoApp',
      
      // Nome do arquivo de entrada do Module Federation
      filename: 'remoteEntry.js',
      
      // Componentes/módulos que você quer expor
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts', // Opcional: para carregamento dinâmico de rotas
        // Adicione outros componentes que quiser expor:
        // './Button': './src/components/Button.tsx',
      },
      
      // Dependências compartilhadas (IMPORTANTE: devem corresponder ao Super App)
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

## 📄 Exportando Rotas (Opcional)

Se você quer que o Super App carregue suas rotas automaticamente, crie um arquivo `src/routes.ts`:

```typescript
import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  component: ComponentType<Record<string, unknown>>;
  showInNav?: boolean;
}

import App from './App';

const routes: RouteConfig[] = [
  {
    path: '/meu-app',
    label: 'Meu App',
    icon: '🚀',
    component: App,
    showInNav: true,
  },
];

export default routes;
```

## 🚀 GitHub Actions Workflow

Crie `.github/workflows/deploy.yml`:

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
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## ✅ Checklist de Configuração

- [ ] Instalar dependência: `npm install @originjs/vite-plugin-federation`
- [ ] Configurar `base` path no vite.config.ts (nome do repo)
- [ ] Configurar `name` único no federation config
- [ ] Expor componentes/rotas no `exposes`
- [ ] Verificar que `shared` corresponde ao Super App
- [ ] Criar workflow do GitHub Actions
- [ ] Habilitar GitHub Pages no repositório (Settings > Pages > Source: GitHub Actions)
- [ ] Fazer push e verificar deploy

## 📝 Exemplo Completo

Para um app chamado "todo-app" no repositório `https://github.com/username/todo-app`:

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

A URL final será: `https://username.github.io/todo-app/assets/remoteEntry.js`

## 🔗 Registrar no Super App

Depois de fazer deploy, adicione a URL no Super App:

**No arquivo `.env.production` do Super App:**
```bash
VITE_TODO_APP_URL=https://username.github.io/todo-app/assets/remoteEntry.js
```

**E em `src/config/remoteApps.ts`:**
```typescript
{
  name: 'todoApp',
  routeLoader: () => import('todoApp/routes'),
  enabled: true,
}
```

## 🎯 Testando

1. Deploy do remote app
2. Acesse: `https://username.github.io/todo-app/`
3. Verifique que carregou corretamente
4. Configure no Super App
5. Acesse o Super App e teste a integração

## 📚 Recursos

- [Vite Module Federation](https://github.com/originjs/vite-plugin-federation)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
