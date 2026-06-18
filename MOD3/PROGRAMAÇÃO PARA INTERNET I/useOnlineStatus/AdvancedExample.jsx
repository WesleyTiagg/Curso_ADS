import { useOnlineStatus } from './useOnlineStatus';

/**
 * Exemplo Avançado de Uso do useOnlineStatus
 * Demonstra casos de uso práticos em uma aplicação real
 */

// Componente 1: Banner de Alerta
function OfflineAlert() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      style={{
        backgroundColor: '#ff6b6b',
        color: 'white',
        padding: '12px',
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      ⚠️ Sua conexão foi perdida. Algumas funcionalidades podem estar limitadas.
    </div>
  );
}

// Componente 2: Indicador de Status
function StatusIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '4px',
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
        border: `1px solid ${isOnline ? '#28a745' : '#f5c6cb'}`,
      }}
    >
      <span style={{ fontSize: '20px' }}>
        {isOnline ? '🟢' : '🔴'}
      </span>
      <span style={{ color: isOnline ? '#155724' : '#721c24' }}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}

// Componente 3: Controlador de Ações Baseado em Conexão
function FormWithOfflineSupport() {
  const isOnline = useOnlineStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOnline) {
      alert('❌ Você está offline. Não é possível enviar o formulário agora.');
      return;
    }

    // Simula envio de dados
    alert('✅ Formulário enviado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Digite seu nome"
        style={{ padding: '8px', width: '200px' }}
      />
      <button
        type="submit"
        disabled={!isOnline}
        style={{
          marginLeft: '10px',
          padding: '8px 16px',
          backgroundColor: isOnline ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isOnline ? 'pointer' : 'not-allowed',
          opacity: isOnline ? 1 : 0.5,
        }}
      >
        {isOnline ? 'Enviar' : 'Indisponível (Offline)'}
      </button>
    </form>
  );
}

// Componente 4: Dashboard Completo
export function AdvancedExample() {
  const isOnline = useOnlineStatus();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <OfflineAlert />

      <h1>📊 Dashboard - Monitor de Conexão Avançado</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>1. Indicador de Status</h3>
        <StatusIndicator />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. Informações Detalhadas</h3>
        <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <p><strong>Status atual:</strong> {isOnline ? '✅ Online' : '❌ Offline'}</p>
          <p><strong>IP do navegador:</strong> {isOnline ? 'Disponível' : 'Não disponível'}</p>
          <p><strong>Última verificação:</strong> {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>3. Formulário com Suporte a Offline</h3>
        <FormWithOfflineSupport />
      </div>

      <div style={{ marginBottom: '20px', backgroundColor: '#e7f3ff', padding: '10px', borderRadius: '4px' }}>
        <h3>💡 Dica:</h3>
        <ul>
          <li>Pressione F12 para abrir DevTools</li>
          <li>Vá para a aba "Network"</li>
          <li>Clique no botão "Offline" para simular desconexão</li>
          <li>Observe os componentes reagirem em tempo real</li>
        </ul>
      </div>
    </div>
  );
}

export default AdvancedExample;
