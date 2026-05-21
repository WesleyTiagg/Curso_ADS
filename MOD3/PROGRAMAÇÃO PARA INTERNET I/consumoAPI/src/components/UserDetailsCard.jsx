export default function UserDetailsCard({ user }) {
  return (
    <div className="details-card">
      <h3>{user.name}</h3>
      <div className="details-row">
        <span>Email:</span>
        <strong>{user.email}</strong>
      </div>
      <div className="details-row">
        <span>Telefone:</span>
        <strong>{user.phone}</strong>
      </div>
      <div className="details-row">
        <span>Site:</span>
        <strong>{user.website}</strong>
      </div>
      <div className="details-row">
        <span>Empresa:</span>
        <strong>{user.company?.name}</strong>
      </div>
      <div className="details-row">
        <span>Endereço:</span>
        <strong>
          {user.address?.street}, {user.address?.suite}, {user.address?.city}
        </strong>
      </div>
    </div>
  );
}
