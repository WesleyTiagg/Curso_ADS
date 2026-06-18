import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  // Valor do contexto pode ser expandido para incluir dados de autenticação
  const authValue = {
    isAuthenticated: true,
    // Você pode adicionar mais propriedades aqui conforme necessário
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
