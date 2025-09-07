const express = require('express');
const router = express.Router();
const db = require('../db');

function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}
function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  });
}
function get(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
  });
}

router.get('/profile', async (req, res) => {
  try {
    const profile = await get('SELECT * FROM profile WHERE id = 1');
    if (!profile) return res.status(404).json({error:'No profile found'});
    const skills = await all('SELECT skill, proficiency FROM skills WHERE profile_id = 1');
    const projects = await all('SELECT id, title, description, links FROM projects WHERE profile_id = 1');
    const work = await all('SELECT * FROM work WHERE profile_id = 1');
    const links = await get('SELECT * FROM links WHERE profile_id = 1');
    res.json({ ...profile, skills, projects, work, links });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/skills/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit||10);
    const rows = await all('SELECT skill, proficiency FROM skills WHERE profile_id = 1 ORDER BY proficiency DESC LIMIT ?', [limit]);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/projects', async (req, res) => {
  try {
    const skill = req.query.skill;
    if (!skill) {
      const rows = await all('SELECT id,title,description,links FROM projects WHERE profile_id = 1');
      return res.json(rows);
    }
    const rows = await all('SELECT id,title,description,links FROM projects WHERE profile_id = 1 AND (title LIKE ? OR description LIKE ? OR links LIKE ?)', [`%${skill}%`, `%${skill}%`, `%${skill}%`]);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const skills = await all('SELECT skill FROM skills WHERE profile_id = 1 AND skill LIKE ?', [`%${q}%`]);
    const projects = await all('SELECT id,title,description FROM projects WHERE profile_id = 1 AND (title LIKE ? OR description LIKE ?)', [`%${q}%`, `%${q}%`]);
    const profile = await get('SELECT name, email, education FROM profile WHERE id = 1');
    res.json({ query: q, profileFound: profile, skills, projects });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

module.exports = router;
