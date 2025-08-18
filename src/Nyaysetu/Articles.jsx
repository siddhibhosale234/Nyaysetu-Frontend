import './Articles1.css';

export function Articles1({ p }) {
  return (
    <div className="article-card">
      <h3>{p.Title}</h3>
      <p className="article-date">{p.Date}</p>
      <p className="article-tag">{p.Tag}</p>
      <a className="read-more" href={p.ReadMore} target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
  );
}
