import { AuthProvider } from './AuthProvider';
import ConnectionStatus from './ConnectionStatus';

function App() {
  return (
    <AuthProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Monitor de Status de Internet</h1>
        <ConnectionStatus />
        <p style={{ marginTop: '20px', color: '#666' }}>
          👉 Desconecte sua internet para ver o status mudar em tempo real!
        </p>
      </div>
    </AuthProvider>
  );
}

export default App;
