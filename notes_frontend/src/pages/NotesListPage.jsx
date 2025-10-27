import React, { useMemo, useState } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../state/NotesContext';
import TagPill from '../components/TagPill';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * NotesListPage shows search and tag filters with the list of notes, inside Layout.
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
    <>
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
    </>
  );
}
