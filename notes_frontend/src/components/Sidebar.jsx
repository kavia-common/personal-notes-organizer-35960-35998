import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotes } from '../state/NotesContext';
import { Icons } from '../assets';

/**
 * PUBLIC_INTERFACE
 * Sidebar provides global navigation and a tag filter preview.
 */
export default function Sidebar() {
  const { allTags } = useNotes();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={Icons.logo} alt="App logo" className="brand-logo" />
        <span className="brand-name">Personal Notes</span>
      </div>
      <nav className="nav">
        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
        <Link className={`nav-link ${location.pathname.startsWith('/notes') ? 'active' : ''}`} to="/notes">Notes</Link>
        <Link className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`} to="/settings">Settings</Link>
      </nav>
      <div className="sidebar-section">
        <h4 className="sidebar-title">Tags</h4>
        <div className="tags-preview">
          {allTags.length === 0 ? <span className="muted">No tags yet</span> : allTags.map(t => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <span className="muted">Local-first • No account needed</span>
      </div>
    </aside>
  );
}
