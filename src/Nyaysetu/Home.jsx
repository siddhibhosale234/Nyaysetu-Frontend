
import './Home.css';

export function HomeLaw({ p , onClick}) {
  if (!p) return null;
  
  return (
    <>
      <div className="cards" onClick={onClick} style={{cursor:"pointer"}}>
        <div className="icon">{p.Icon}</div>
        <h1>{p.Title}</h1>
        <p>{p.Short_Info}</p>
      </div>
      
      
    </>
  );
}
