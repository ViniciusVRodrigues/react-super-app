# 🚀 React Super App

Um aplicativo host (shell) que utiliza **Module Federation** para integrar múltiplas micro-frontends em uma única experiência unificada.

## 📋 Características

- **React 19** com **TypeScript** e **Vite**
- **Module Federation** para carregamento de módulos remotos
- **Error Boundaries** para resiliência - o Super App nunca para, mesmo se um módulo remoto falhar
- **Lazy Loading** para carregamento sob demanda
- **React Router** para navegação entre módulos

## 🛡️ Resiliência

O Super App foi projetado para ser resiliente. Se qualquer módulo remoto falhar ao carregar, o aplicativo principal continua funcionando normalmente. Cada módulo remoto é envolvido em:

1. **Error Boundary** - Captura erros de JavaScript e exibe uma mensagem amigável
2. **Suspense** - Mostra um loading enquanto o módulo carrega
3. **RemoteWrapper** - Componente que combina ambos para fácil uso

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📦 Adicionando Módulos Remotos

### 1. Configurar o módulo remoto no `vite.config.ts`

```typescript
federation({
  name: 'superApp',
  remotes: {
    remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
    anotherApp: 'http://localhost:3002/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
}),
```

### 2. Criar uma rota no `App.tsx`

```tsx
import RemoteWrapper from './components/RemoteWrapper';

// Na configuração de rotas
<Route 
  path="/meu-modulo" 
  element={
    <RemoteWrapper 
      loadComponent={() => import('remoteApp/MeuComponente')}
    />
  } 
/>
```

### 3. Adicionar link na navegação

Edite o arquivo `src/components/Layout.tsx` para adicionar o link na barra de navegação.

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── ErrorBoundary.tsx    # Captura erros de módulos remotos
│   ├── RemoteWrapper.tsx    # Wrapper seguro para módulos remotos
│   ├── Layout.tsx           # Layout principal com navegação
│   └── Layout.css
├── pages/
│   ├── Home.tsx             # Página inicial explicativa
│   ├── Home.css
│   ├── ExampleRemotePage.tsx # Exemplo de página com módulo remoto
│   └── ExampleRemotePage.css
├── App.tsx                   # Configuração de rotas
├── App.css
├── main.tsx
└── index.css
```

## 📚 Configurando um Módulo Remoto (Remote App)

Para que uma aplicação seja consumida pelo Super App, ela precisa expor seus componentes via Module Federation.

### Exemplo de configuração do módulo remoto (`vite.config.ts`):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './MeuComponente': './src/components/MeuComponente.tsx',
        './OutroComponente': './src/pages/OutraPagina.tsx',
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

## 🎯 Boas Práticas

1. **Sempre use o RemoteWrapper** para carregar módulos remotos
2. **Defina fallbacks personalizados** para melhor experiência do usuário
3. **Compartilhe dependências** (`shared`) para evitar duplicação
4. **Versione suas APIs** para compatibilidade entre versões

## 📝 Licença

MIT
