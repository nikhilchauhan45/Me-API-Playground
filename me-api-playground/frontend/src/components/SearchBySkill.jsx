import React, {useState} from 'react';
export default function SearchBySkill({api}) {
  const [q, setQ] = useState('');
  const [res, setRes] = useState([]);
  async function search() {
    const r = await fetch(`${api}/projects?skill=${encodeURIComponent(q)}`);
    const data = await r.json();
    setRes(data);
  }
  return (
    <section>
      <h3>Search Projects by Skill</h3>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g., Python" />
      <button onClick={search}>Search</button>
      <ul>
        {res.map(p=> <li key={p.id}><strong>{p.title}</strong> — {p.description}</li>)}
      </ul>
    </section>
  );
}
