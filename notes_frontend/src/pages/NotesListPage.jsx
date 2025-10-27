import React, { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../state/NotesContext';
import TagPill from '../components/TagPill';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * NotesListPage displays all notes with search and tag filtering.
 * Props: none
 * Returns layout with Sidebar, Topbar, SearchBar, Tag filters and NoteList.
 */
export default function NotesListPage() {
  const { notes, allTags } = useNotes();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const filtered = useMemo(() => {
    return notes.filter(n => {
      const matchesQuery = (n.title || '').toLowerCase().includes(query.toLowerCase()) ||
        (n.content || '').toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || (n.tags || []).includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [notes, query, activeTag]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-pane">
        <Topbar title="All Notes" />
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} placeholder="Search notes..." />
          <div className="tags-row">
            <TagPill label="All" active={!activeTag} onClick={() => setActiveTag('')} />
            {allTags.map(tag => (
              <TagPill key={tag} label={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)} />
            ))}
          </div>
        </div>
        <NoteList notes={filtered} />
      </main>
    </div>
  );
}
