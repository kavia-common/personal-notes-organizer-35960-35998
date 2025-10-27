import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../assets';

/**
 * PUBLIC_INTERFACE
 * Topbar displays the current section title and common actions.
 */
export default function Topbar({ title = 'Notes' }) {
  const navigate = useNavigate();

  return (
    <header className="topbar" role="banner" aria-label="Application toolbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Search" onClick={() => navigate('/notes')}>
          <img src={Icons.search} alt="Search" />
        </button>
        <button className="icon-btn" aria-label="Info" onClick={() => navigate('/settings')}>
          <img src={Icons.info} alt="Info" />
        </button>
        <button className="fab" aria-label="Create note" onClick={() => navigate('/notes/new')}>
          <img src={Icons.add} alt="Add" />
        </button>
      </div>
    </header>
  );
}
