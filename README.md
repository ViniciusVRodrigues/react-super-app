# 🚀 React Super App

Um aplicativo host (shell) que utiliza **Module Federation** para integrar múltiplas micro-frontends em uma única experiência unificada.

## 📋 Características

- **React 19** com **TypeScript** e **Vite**
- **Module Federation** para carregamento de módulos remotos
- **Error Boundaries** para resiliência
- **Lazy Loading** para carregamento sob demanda

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📦 Módulos Remotos Integrados

- **TodoApp** - Lista de tarefas (`/todo`)
- **Despensa Inteligente** - Gestão de despensa (`/despensa`, `/despensa/products`, `/despensa/pantry`, `/despensa/shopping-list`)

## 🔧 Como Adicionar um Módulo Remoto

1. Configure o remote em `vite.config.ts`:
```typescript
remotes: {
  meuApp: 'http://localhost:3003/assets/remoteEntry.js',
}
```

2. Declare os tipos em `src/remotes.d.ts`:
```typescript
declare module 'meuApp/Component' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
```

3. Crie uma página em `src/pages/`:
```typescript
import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

const MeuComponent = createRemoteComponent(
  () => import('meuApp/Component')
);

const MeuAppPage = () => (
  <div className="remote-page">
    <h1>Meu App</h1>
    <RemoteWrapper remoteComponent={MeuComponent} />
  </div>
);

export default MeuAppPage;
```

4. Adicione a rota em `App.tsx`:
```typescript
<Route path="/meu-app" element={<MeuAppPage />} />
```

5. Adicione ao menu em `MainTemplate.tsx`:
```typescript
{ to: '/meu-app', label: '🚀 Meu App' },
```

## 📝 Licença

MIT
