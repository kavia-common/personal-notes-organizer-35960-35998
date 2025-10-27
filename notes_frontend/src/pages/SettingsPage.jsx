import React from 'react';
import { useNotes } from '../state/NotesContext';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * SettingsPage provides theme toggle and maintenance actions for local data.
 */
export default function SettingsPage() {
  const { theme, toggleTheme, resetAll } = useNotes();

  return (
    <>
      <div className="section card">
        <h2>Appearance</h2>
        <p>Current theme: <strong>{theme}</strong></p>
        <button className="btn primary" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </div>
      <div className="section card">
        <h2>Data</h2>
        <p>Clear all notes and settings stored in your browser.</p>
        <button className="btn danger" onClick={resetAll} aria-label="Clear All Data">Clear All</button>
      </div>
    </>
  );
}
