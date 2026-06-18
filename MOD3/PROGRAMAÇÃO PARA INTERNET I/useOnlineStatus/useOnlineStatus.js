import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export function useOnlineStatus() {
  // Valida se o hook está sendo usado dentro de um provider
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useOnlineStatus deve ser usado dentro de um componente envolvido por <AuthProvider />. ' +
      'Certifique-se de que o seu componente está dentro do provider de autenticação.'
    );
  }

  // Estado para monitorar o status de conexão
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    // Função para lidar com o evento online
    const handleOnline = () => {
      setIsOnline(true);
      console.log('Conexão de internet restaurada! 🟢');
    };

    // Função para lidar com o evento offline
    const handleOffline = () => {
      setIsOnline(false);
      console.log('Conexão de internet perdida! 🔴');
    };

    // Adiciona listeners aos eventos de conexão
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup: remove os listeners quando o componente desmontar
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
