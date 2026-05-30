'use client';

import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('websites');
  const [imageUrls, setImageUrls] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check simple local storage session for demo purposes
    if (localStorage.getItem('aura_admin_auth') === 'true') {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('aura_admin_auth', 'true');
      fetchProjects();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aura_admin_auth');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Split by comma and clean up spaces
      const uploadedImages = imageUrls.split(',').map(url => url.trim()).filter(url => url !== '');

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, images: uploadedImages, demoUrl })
      });
      
      if (res.ok) {
        setTitle('');
        setDescription('');
        setImageUrls('');
        setDemoUrl('');
        fetchProjects();
      } else {
        alert('Failed to add project');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Username</label>
              <input 
                type="text" 
                className="input-field" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                className="input-field" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>AURA Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Add New Demo
          </h3>
          <form onSubmit={handleAddProject}>
            <div className="input-group">
              <label className="input-label">Title</label>
              <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="input-field" rows={3} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="websites">Web Sites</option>
                <option value="chatbots">AI Chat Bots</option>
                <option value="social">Social Media</option>
                <option value="ads">Ads Running</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Image URLs (Separate multiple with commas)</label>
              <textarea className="input-field" rows={2} value={imageUrls} onChange={e => setImageUrls(e.target.value)} required placeholder="https://imgur.com/..., https://..."></textarea>
            </div>
            <div className="input-group">
              <label className="input-label">Demo URL (Link to HTML)</label>
              <input type="url" className="input-field" value={demoUrl} onChange={e => setDemoUrl(e.target.value)} placeholder="https://..." />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Manage Projects</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                    <td>
                      <div className="action-btns">
                        <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No projects found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
