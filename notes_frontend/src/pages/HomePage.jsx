import React from 'react';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../state/NotesContext';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * HomePage shows quick-access cards and recent notes within the shared Layout.
 */
export default function HomePage() {
  const { notes } = useNotes();
  const recent = [...notes].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);

  return (
    <>
      <section className="grid-cards">
        <NoteCard title="Book Review : The Design of Everyday Things by Don Norman" color="var(--style-1-background)" />
        <NoteCard title="Animes produced by Ufotable" color="var(--style-3-background)" />
        <NoteCard title="Mangas planned to read" color="var(--style-4-background)" />
        <NoteCard title="Awesome tweets collection" color="var(--style-7-background)" />
        <NoteCard title="List of free & open source apps" color="var(--style-8-background)" />
      </section>
      <section className="section">
        <h2 className="section-title">Recent</h2>
        <div className="grid-cards">
          {recent.length === 0 ? (
            <div className="muted">No recent notes yet. Create one from the + button.</div>
          ) : recent.map(n => (
            <NoteCard key={n.id} title={n.title || 'Untitled'} color="var(--surface)" noteId={n.id} compact />
          ))}
        </div>
      </section>
    </>
  );
}
