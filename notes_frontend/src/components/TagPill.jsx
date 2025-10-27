import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TagPill displays a clickable label chip, optionally removable and active-styled.
 */
export default function TagPill({ label, onClick, active = false, removable = false }) {
  return (
    <button
      className={`pill ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label={`Tag ${label}${removable ? ' (click to remove)' : ''}`}
      type="button"
    >
      <span>{label}</span>
      {removable && <span className="pill-x" aria-hidden>&times;</span>}
    </button>
  );
}
