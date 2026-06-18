# useOnlineStatus Hook - Documentação

## Descrição

O hook `useOnlineStatus` monitora o status da conexão de internet do usuário em tempo real, informando quando a conexão caiu ou voltou.

## Regras Implementadas

### 1. **Encapsulamento do useContext(AuthContext)**
```javascript
const context = useContext(AuthContext);
```
O hook utiliza `useContext` para acessar o contexto de autenticação.

### 2. **Validação de Provider**
```javascript
if (context === undefined) {
  throw new Error(
    'useOnlineStatus deve ser usado dentro de um componente envolvido por <AuthProvider />...'
  );
}
```
O hook lança um erro claro e descritivo se usado fora do `<AuthProvider />`.

### 3. **Monitoramento em Tempo Real**
- Usa os eventos `online` e `offline` do `window`
- Retorna um boolean: `true` (online) ou `false` (offline)

### 4. **Limpeza de Memory Leaks**
- Remove os event listeners quando o componente desmontar

## Como Usar

### Passo 1: Envolver a Aplicação com AuthProvider
```jsx
import { AuthProvider } from './AuthProvider';
import App from './App';

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
```

### Passo 2: Usar o Hook em Componentes
```jsx
import { useOnlineStatus } from './useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      <p>Você está {isOnline ? 'Online ✅' : 'Offline ❌'}</p>
    </div>
  );
}
```

## Tratamento de Erros

### Uso Incorreto (Fora do Provider)
```jsx
import { useOnlineStatus } from './useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus(); // ❌ ERRO!
  // Lança: Error: useOnlineStatus deve ser usado dentro de um componente envolvido por <AuthProvider />
}

export default MyComponent; // Sem wrapping no AuthProvider
```

### Uso Correto (Dentro do Provider)
```jsx
import { useOnlineStatus } from './useOnlineStatus';
import { AuthProvider } from './AuthProvider';

function MyComponent() {
  const isOnline = useOnlineStatus(); // ✅ OK
  return <p>{isOnline ? 'Online' : 'Offline'}</p>;
}

export default function App() {
  return (
    <AuthProvider>
      <MyComponent />
    </AuthProvider>
  );
}
```

## Estado Inicial

O hook verifica o estado inicial da conexão usando:
```javascript
const [isOnline, setIsOnline] = useState(
  typeof navigator !== 'undefined' ? navigator.onLine : true
);
```

## Logs de Conexão

O hook exibe logs no console:
- 🟢 **Conexão de internet restaurada!** - Quando a internet volta
- 🔴 **Conexão de internet perdida!** - Quando a internet cai

## Arquivos do Projeto

1. **AuthContext.jsx** - Contexto de autenticação
2. **useOnlineStatus.js** - Hook principal
3. **AuthProvider.jsx** - Provedor de contexto
4. **ConnectionStatus.jsx** - Componente exemplo
5. **App.jsx** - Aplicação principal

## Testando

Para testar o hook:
1. Execute a aplicação
2. Abra as ferramentas do desenvolvedor (F12)
3. Vá para a aba "Network"
4. Clique no botão de disable/enable de internet
5. Observe o status mudando e os logs no console
