# 🚀 React Super App

Um aplicativo host (shell) que utiliza **Module Federation** para integrar múltiplas micro-frontends em uma única experiência unificada.

## 📋 Características

- **React 19** com **TypeScript** e **Vite**
- **Module Federation** para carregamento de módulos remotos
- **Atomic Design** para organização de componentes
- **Error Boundaries** para resiliência - o Super App nunca para, mesmo se um módulo remoto falhar
- **Lazy Loading** para carregamento sob demanda
- **React Router** para navegação entre módulos

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

### 2. Declarar os tipos em `src/remotes.d.ts`

```typescript
declare module 'remoteApp/Component' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}
```

### 3. Criar uma página em `src/pages/`

```tsx
import { RemoteWrapper, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

const RemoteApp = createRemoteComponent(() => import('remoteApp/Component'));

const MeuModuloPage = () => (
  <div>
    <h1>Meu Módulo</h1>
    <RemoteWrapper 
      remoteComponent={RemoteApp}
      errorFallback={
        <ErrorMessage 
          title="Módulo não disponível"
          message="Não foi possível carregar o módulo."
        />
      }
    />
  </div>
);

export default MeuModuloPage;
```

### 4. Adicionar a rota no `App.tsx`

```tsx
import MeuModuloPage from './pages/MeuModuloPage';

// Na configuração de rotas
<Route path="/meu-modulo" element={<MeuModuloPage />} />
```

### 5. Atualizar a navegação

Edite o arquivo `src/components/templates/MainTemplate.tsx` para adicionar o novo item na navegação:

```typescript
const defaultNavItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/meu-modulo', label: 'Meu Módulo' },
  // ... outros itens
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
├── pages/
│   ├── Home.tsx            # Página inicial com documentação
│   ├── ExampleRemotePage.tsx # Exemplo de página com módulo remoto
│   └── TodoList.tsx        # Exemplo de integração real
├── utils/
│   └── createRemoteComponent.ts
├── App.tsx                 # Configuração de rotas
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

1. **Use o Atomic Design** para organizar componentes de forma escalável
2. **Sempre use o RemoteWrapper** para carregar módulos remotos
3. **Defina fallbacks personalizados** para melhor experiência do usuário
4. **Compartilhe dependências** (`shared`) para evitar duplicação
5. **Versione suas APIs** para compatibilidade entre versões
6. **Importe componentes do index centralizado** (`import { Navbar } from '../components'`)

## 📝 Licença

MIT
