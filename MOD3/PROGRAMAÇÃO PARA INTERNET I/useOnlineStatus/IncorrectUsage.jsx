import { useOnlineStatus } from './useOnlineStatus';

// ❌ EXEMPLO DE USO INCORRETO
// Este componente vai lançar um erro porque não está dentro de um AuthProvider

function IncorrectComponent() {
  try {
    const isOnline = useOnlineStatus(); // Isso vai dar erro!
    return <p>Status: {isOnline ? 'Online' : 'Offline'}</p>;
  } catch (error) {
    return (
      <div style={{ color: 'red', padding: '10px', border: '2px solid red' }}>
        <h3>❌ Erro ao usar useOnlineStatus:</h3>
        <p>{error.message}</p>
      </div>
    );
  }
}

export default IncorrectComponent;

/*
 * MOTIVO DO ERRO:
 * O hook tenta acessar AuthContext usando useContext(), mas como este
 * componente não está dentro de um <AuthProvider>, o contexto retorna
 * undefined, o que ativa a validação de erro do hook.
 *
 * SOLUÇÃO:
 * Envolver este componente (ou um de seus antecessores) com <AuthProvider>:
 *
 * <AuthProvider>
 *   <IncorrectComponent />
 * </AuthProvider>
 */
