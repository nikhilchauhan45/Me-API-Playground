import React, {useEffect, useState} from 'react';
export default function Projects({api}) {
  const [projects, setProjects] = useState([]);
  useEffect(()=>{
    fetch(`${api}/projects`).then(r=>r.json()).then(setProjects).catch(console.error);
  },[]);
  return (
    <section>
      <h3>Projects</h3>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
