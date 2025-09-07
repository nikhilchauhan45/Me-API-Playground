import React, {useEffect, useState} from 'react';
export default function ProfileView({api}) {
  const [profile, setProfile] = useState(null);
  useEffect(()=>{
    fetch(`${api}/profile`).then(r=>r.json()).then(setProfile).catch(console.error);
  },[]);
  if (!profile) return <div>Loading profile...</div>;
  return (
    <section>
      <h2>{profile.name}</h2>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Education:</strong> {profile.education}</div>
    </section>
  );
}
