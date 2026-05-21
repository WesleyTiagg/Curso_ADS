import UserListPage from './pages/UserListPage.jsx';
import GaleriaFotos from './components/GaleriaFotos.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p>React + Axios</p>
          <h1>Consumo de APIs</h1>
        </div>
      </header>

      <main className="app-main">
        <UserListPage />
        <GaleriaFotos />
      </main>
    </div>
  );
}
