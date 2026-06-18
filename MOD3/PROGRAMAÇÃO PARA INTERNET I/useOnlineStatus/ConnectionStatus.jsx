import { useOnlineStatus } from './useOnlineStatus';

function ConnectionStatus() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      <h2>Status de Conexão</h2>
      <p>
        Status:{' '}
        <span
          style={{
            color: isOnline ? 'green' : 'red',
            fontWeight: 'bold',
            fontSize: '1.2em',
          }}
        >
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </span>
      </p>
      {!isOnline && (
        <p style={{ color: 'red', fontStyle: 'italic' }}>
          ⚠️ Você está offline. Algumas funcionalidades podem estar limitadas.
        </p>
      )}
    </div>
  );
}

export default ConnectionStatus;
