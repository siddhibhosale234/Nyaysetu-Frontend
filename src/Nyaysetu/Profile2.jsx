import './Profile2.css';

export function Profile2({ p }) {
  return (
    <div className="profile-card">
      <img src={p.icon} alt={p.title || "Specialization Icon"} />
      <h3>{p.title}</h3>
    </div>
  );
}
