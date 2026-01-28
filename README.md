# 🚀 React Super App

Um aplicativo host (shell) que utiliza **Module Federation** para integrar múltiplas micro-frontends em uma única experiência unificada.

## 📋 Características

- **React 19** com **TypeScript** e **Vite**
- **Module Federation** para carregamento de módulos remotos
- **Carregamento Dinâmico de Rotas** - rotas e navegação adicionadas automaticamente a partir dos módulos remotos
- **Atomic Design** para organização de componentes
- **Error Boundaries** para resiliência - o Super App nunca para, mesmo se um módulo remoto falhar
- **Lazy Loading** para carregamento sob demanda
- **React Router** para navegação entre módulos

## 🎯 Novidade: Carregamento Dinâmico de Rotas

Agora o Super App suporta **carregamento dinâmico de rotas e navegação** dos aplicativos remotos!

### Como Funciona

1. **Aplicativos remotos exportam suas rotas** através do Module Federation
2. **Super App importa as rotas automaticamente** ao iniciar
3. **Rotas e botões de navegação são criados dinamicamente** sem necessidade de configuração manual no App.tsx ou MainTemplate.tsx

### Benefícios

- ✅ **Menos código manual** - não precisa editar App.tsx e MainTemplate.tsx para cada novo módulo
- ✅ **Maior autonomia** - cada aplicativo remoto controla suas próprias rotas
- ✅ **Facilidade de manutenção** - mudanças em rotas ocorrem apenas no aplicativo remoto
- ✅ **Fallback automático** - se o módulo remoto não exportar rotas, usa configuração local
- ✅ **Type-safe** - totalmente tipado com TypeScript

## 🏗️ Arquitetura Atomic Design

O projeto segue o padrão **Atomic Design** para organização de componentes, facilitando a manutenção, reutilização e escalabilidade:

```
src/components/
├── atoms/          # Componentes básicos (Loading, Icon, ErrorMessage)
├── molecules/      # Combinações de atoms (NavLink, FeatureCard, AppLink, CodeBlock)
├── organisms/      # Componentes complexos (Navbar, Footer, FeaturesGrid, RemoteWrapper)
├── templates/      # Layouts de página (MainTemplate)
├── ErrorBoundary.tsx
└── index.ts        # Exports centralizados
```

### Níveis do Atomic Design

- **Atoms**: Componentes mais básicos e indivisíveis (botões, ícones, spinners)
- **Molecules**: Combinações simples de atoms que formam unidades funcionais
- **Organisms**: Componentes complexos que combinam múltiplas molecules e/ou atoms
- **Templates**: Layouts de página que definem a estrutura geral
- **Pages**: Instâncias específicas de templates com conteúdo real

## 🛡️ Resiliência

O Super App foi projetado para ser resiliente. Se qualquer módulo remoto falhar ao carregar, o aplicativo principal continua funcionando normalmente. Cada módulo remoto é envolvido em:

1. **Error Boundary** - Captura erros de JavaScript e exibe uma mensagem amigável
2. **Suspense** - Mostra um loading enquanto o módulo carrega
3. **RemoteWrapper** - Organismo que combina ambos para fácil uso

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

### Modo 1: Carregamento Dinâmico de Rotas (Recomendado)

Com o novo sistema de carregamento dinâmico, o módulo remoto pode exportar suas próprias rotas, que serão automaticamente adicionadas ao Super App.

#### No Aplicativo Remoto

**1. Crie um arquivo de rotas (`src/routes.ts` ou `src/routes.tsx`)**

```typescript
import { RouteConfig } from '@types/routes'; // Ou defina localmente
import TodoApp from './App';

const routes: RouteConfig[] = [
  {
    path: '/todo',
    label: 'Todo List',
    icon: '✅',
    component: TodoApp,
    showInNav: true, // Aparecerá no menu de navegação
  },
];

export default routes;
```

**2. Exponha as rotas no `vite.config.ts` do aplicativo remoto**

```typescript
federation({
  name: 'todoApp',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
    './routes': './src/routes.ts', // Exponha as rotas
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

#### No Super App

**1. Configure o módulo remoto no `vite.config.ts`**

```typescript
federation({
  name: 'superApp',
  remotes: {
    todoApp: 'http://localhost:3001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

**2. Declare os tipos em `src/remotes.d.ts`**

```typescript
declare module 'todoApp/routes' {
  import { RouteConfig } from './types/routes';
  const routes: RouteConfig[];
  export default routes;
}
```

**3. Adicione o aplicativo remoto em `src/config/remoteApps.ts`**

```typescript
export const remoteApps: RemoteAppEntry[] = [
  {
    name: 'todoApp',
    routeLoader: () => import('todoApp/routes'),
    enabled: true,
  },
];
```

**Pronto!** As rotas e botões de navegação serão automaticamente adicionados ao Super App. 🎉

---

### Modo 2: Configuração Manual (Legado)

Se o aplicativo remoto ainda não exporta rotas, você pode configurar manualmente:

**1. Configurar o módulo remoto no `vite.config.ts`**

```typescript
federation({
  name: 'superApp',
  remotes: {
    remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

**2. Declarar os tipos em `src/remotes.d.ts`**

```typescript
declare module 'remoteApp/Component' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
```

**3. Criar uma configuração de rotas em `src/config/`**

```tsx
// src/config/remoteAppRoutes.tsx
import type { RouteConfig } from '../types/routes';
import { RemoteWrapper, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

const RemoteAppComponent = createRemoteComponent(
  () => import('remoteApp/Component')
);

const RemoteAppPage = () => (
  <div>
    <RemoteWrapper 
      remoteComponent={RemoteAppComponent}
      errorFallback={
        <ErrorMessage 
          title="Módulo não disponível"
          message="Não foi possível carregar o módulo."
        />
      }
    />
  </div>
);

export const remoteAppRoutes: RouteConfig[] = [
  {
    path: '/remote-app',
    label: 'Remote App',
    icon: '🚀',
    component: RemoteAppPage,
    showInNav: true,
  },
];

export default remoteAppRoutes;
```

**4. Adicionar em `src/config/remoteApps.ts` com fallback**

```typescript
export const remoteApps: RemoteAppEntry[] = [
  {
    name: 'remoteApp',
    routeLoader: () => import('remoteApp/routes').catch(() => {
      // Fallback se o app não exportar rotas
      return import('./remoteAppRoutes').then(m => ({ default: m.default }));
    }),
    enabled: true,
  },
];
```

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── atoms/              # Componentes básicos
│   │   ├── Loading.tsx
│   │   ├── Icon.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── index.ts
│   ├── molecules/          # Combinações de atoms
│   │   ├── NavLink.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── AppLink.tsx
│   │   ├── CodeBlock.tsx
│   │   └── index.ts
│   ├── organisms/          # Componentes complexos
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── RemoteWrapper.tsx
│   │   └── index.ts
│   ├── templates/          # Layouts de página
│   │   ├── MainTemplate.tsx
│   │   └── index.ts
│   ├── ErrorBoundary.tsx   # Captura erros de módulos remotos
│   └── index.ts            # Exports centralizados
├── config/                 # Configurações do Super App
│   ├── remoteApps.ts       # Lista de aplicativos remotos
│   ├── todoAppRoutes.tsx   # Rotas de fallback para todoApp
│   └── despensaAppRoutes.tsx # Rotas de fallback para despensa
├── pages/
│   ├── Home.tsx            # Página inicial com documentação
│   └── ExampleRemotePage.tsx # Exemplo de página com módulo remoto
├── types/
│   └── routes.ts           # Tipos TypeScript para rotas
├── utils/
│   ├── createRemoteComponent.ts # Factory para componentes lazy
│   └── loadRemoteRoutes.ts # Utilitário para carregar rotas remotas
├── App.tsx                 # Configuração dinâmica de rotas
├── App.css
├── main.tsx
└── index.css
```

## 📚 Configurando um Módulo Remoto (Remote App)

Para que uma aplicação seja consumida pelo Super App, ela precisa expor seus componentes e, opcionalmente, suas rotas via Module Federation.

### Exemplo completo de configuração do módulo remoto:

**1. Crie um arquivo de rotas (`src/routes.ts`):**

```typescript
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
    path: '/todo',
    label: 'Todo List',
    icon: '✅',
    component: App,
    showInNav: true,
  },
];

export default routes;
```

**2. Configure o `vite.config.ts` do módulo remoto:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'todoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './routes': './src/routes.ts',  // Exponha as rotas!
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

Agora quando o Super App importar este módulo remoto, as rotas serão automaticamente adicionadas!

## 🎯 Boas Práticas

1. **Use o Atomic Design** para organizar componentes de forma escalável
2. **Sempre use o RemoteWrapper** para carregar módulos remotos
3. **Defina fallbacks personalizados** para melhor experiência do usuário
4. **Compartilhe dependências** (`shared`) para evitar duplicação
5. **Versione suas APIs** para compatibilidade entre versões
6. **Importe componentes do index centralizado** (`import { Navbar } from '../components'`)
7. **Exporte rotas dos módulos remotos** para integração automática no Super App
8. **Use o sistema de carregamento dinâmico** - evite configuração manual quando possível

## 📝 Licença

MIT
