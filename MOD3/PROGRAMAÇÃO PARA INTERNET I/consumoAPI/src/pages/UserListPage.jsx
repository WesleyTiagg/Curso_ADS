import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';
import UserDetailsCard from '../components/UserDetailsCard.jsx';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError('Não foi possível carregar a lista de usuários.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="page-section">
      <div className="panel panel-users">
        <div className="panel-header">
          <h2>Lista de Usuários</h2>
          <p>Clique em um nome para ver os dados completos.</p>
        </div>

        {loading ? (
          <div className="status-text">Carregando usuários...</div>
        ) : error ? (
          <div className="status-text status-error">{error}</div>
        ) : (
          <div className="user-list">
            {users.map((user) => (
              <Card
                key={user.id}
                user={user}
                onClick={() => setSelectedUser(user)}
                selected={selectedUser?.id === user.id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="panel panel-details">
        <div className="panel-header">
          <h2>Informações do usuário</h2>
        </div>

        {selectedUser ? (
          <UserDetailsCard user={selectedUser} />
        ) : (
          <div className="empty-state">Selecione um usuário para ver os detalhes.</div>
        )}
      </div>
    </section>
  );
}
