# useOnlineStatus - Hook React Personalizado 🌐

## 📋 Resumo

Este projeto implementa um hook React chamado `useOnlineStatus` que monitora em tempo real se a conexão de internet do usuário caiu ou voltou.

## ✨ Características Principais

- ✅ **Monitoramento em Tempo Real**: Detecta mudanças de conexão instantaneamente
- ✅ **Encapsulamento de Context**: Usa `useContext(AuthContext)` internamente
- ✅ **Validação de Provider**: Lança erro claro se usado fora do `<AuthProvider />`
- ✅ **Sem Memory Leaks**: Remove event listeners corretamente no cleanup
- ✅ **Logs Informativos**: Console logs para debug

## 📂 Estrutura de Arquivos

```
useOnlineStatus/
├── AuthContext.jsx          # Contexto de autenticação
├── AuthProvider.jsx         # Provedor do contexto
├── useOnlineStatus.js       # Hook principal ⭐
├── ConnectionStatus.jsx     # Componente exemplo
├── IncorrectUsage.jsx       # Exemplo de erro
├── App.jsx                  # Aplicação principal
├── index.js                 # Exportações centralizadas
├── package.json             # Dependências do projeto
├── DOCUMENTAÇÃO.md          # Documentação detalhada
└── README.md                # Este arquivo
```

## 🔧 Como Usar

### 1. **Envolver a Aplicação**
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

### 2. **Usar o Hook**
```jsx
import { useOnlineStatus } from './useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      {isOnline ? (
        <p>🟢 Você está online</p>
      ) : (
        <p>🔴 Você está offline</p>
      )}
    </div>
  );
}
```

## 🚨 Tratamento de Erros

### Erro Esperado
```
Error: useOnlineStatus deve ser usado dentro de um componente envolvido 
por <AuthProvider />. Certifique-se de que o seu componente está dentro 
do provider de autenticação.
```

Este erro ocorre quando você tenta usar o hook **fora** do `<AuthProvider>`.

## 📊 Implementação Técnica

### Funcionalidades do Hook

1. **Validação do Contexto**
   - Verifica se `useContext(AuthContext)` retorna um valor válido
   - Lança erro descritivo se retornar `undefined`

2. **Gerenciamento de Estado**
   - Estado inicial: `navigator.onLine`
   - Atualiza ao detectar eventos `online` e `offline`

3. **Event Listeners**
   - `window.addEventListener('online', handleOnline)`
   - `window.addEventListener('offline', handleOffline)`

4. **Cleanup**
   - Remove listeners no useEffect cleanup
   - Previne memory leaks

## 🧪 Testando Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra seu navegador e teste:
   - Pressione F12 para abrir DevTools
   - Vá para a aba "Network"
   - Use a opção "Offline" para simular desconexão
   - Observe o status mudar em tempo real

## 🎓 Conceitos Aplicados

- **React Hooks**: `useContext`, `useState`, `useEffect`
- **React Context API**: Gerenciamento de estado global
- **Web Events**: Eventos `online` e `offline` do window
- **Error Handling**: Validação e lançamento de erros
- **Cleanup Pattern**: Prevenção de memory leaks

## 📝 Notas

- O hook retorna um boolean: `true` (online) ou `false` (offline)
- O contexto pode ser expandido para incluir dados de autenticação reais
- Os logs no console são úteis para debugging

## 📚 Referências

- [Web Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event)
- [React Context - React Docs](https://react.dev/reference/react/useContext)
- [Custom Hooks - React Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

**Desenvolvido para a disciplina de Programação para Internet I - ADS MOD3** 📚
