import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NoteList renders a vertical list of notes with title, snippet, and tags.
 */
export default function NoteList({ notes }) {
  if (!notes || notes.length === 0) {
    return <div className="muted">No notes found.</div>;
  }
  return (
    <div className="note-list">
      {notes.map(n => (
        <Link key={n.id} to={`/notes/${n.id}`} className="note-list-item">
          <div className="note-list-title">{n.title || 'Untitled'}</div>
          <div className="note-list-snippet">{(n.content || '').slice(0, 120)}</div>
          <div className="note-list-tags">
            {(n.tags || []).map(tag => (
              <span key={tag} className="pill sm">{tag}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
