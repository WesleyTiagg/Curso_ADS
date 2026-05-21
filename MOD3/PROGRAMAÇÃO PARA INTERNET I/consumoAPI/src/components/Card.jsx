export default function Card({ user, onClick, selected }) {
  return (
    <button
      type="button"
      className={`card-item ${selected ? 'card-selected' : ''}`}
      onClick={onClick}
    >
      <span className="card-title">{user.name}</span>
      <span className="card-subtitle">@{user.username}</span>
    </button>
  );
}
