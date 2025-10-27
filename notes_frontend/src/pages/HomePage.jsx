import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../state/NotesContext';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * HomePage displays quick-access cards and recent notes inspired by the provided Figma home screen assets.
 * Returns a responsive layout with Sidebar + Topbar and a grid of NoteCards.
 */
export default function HomePage() {
  const { notes } = useNotes();
  const recent = [...notes].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-pane">
        <Topbar title="Notes" />
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
      </main>
    </div>
  );
}
