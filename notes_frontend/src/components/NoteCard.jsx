import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NoteCard renders a colored card with a title and optional click navigation to a note.
 */
export default function NoteCard({ title, color, noteId, compact = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (noteId) navigate(`/notes/${noteId}`);
  };

  return (
    <div
      className={`note-card ${compact ? 'compact' : ''}`}
      style={{ background: color }}
      onClick={handleClick}
      role={noteId ? 'button' : 'group'}
      tabIndex={noteId ? 0 : -1}
      onKeyDown={(e) => noteId && (e.key === 'Enter' || e.key === ' ') && handleClick()}
      aria-label={noteId ? `Open note ${title}` : title}
    >
      <div className="note-card-title">{title}</div>
    </div>
  );
}
