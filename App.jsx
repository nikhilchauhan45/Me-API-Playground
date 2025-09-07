import React from 'react';
import ProfileView from './components/ProfileView';
import Projects from './components/Projects';
import SearchBySkill from './components/SearchBySkill';

export default function App() {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Me-API Playground</h1>
      <ProfileView api={API} />
      <SearchBySkill api={API} />
      <Projects api={API} />
    </div>
  );
}
