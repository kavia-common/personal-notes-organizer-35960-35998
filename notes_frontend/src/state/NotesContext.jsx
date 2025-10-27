import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { nanoid } from './uid';

// Types
/**
 * @typedef Note
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string[]} tags
 * @property {number} createdAt
 * @property {number} updatedAt
 */

const NotesCtx = createContext(null);

/**
 * PUBLIC_INTERFACE
 * NotesProvider provides the notes state, theme, and actions persisted to localStorage.
 */
export function NotesProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('notes_theme', 'light');
  const [notes, setNotes] = useLocalStorage('notes_items', []);
  const [initialized, setInitialized] = useState(false);

  // Accessibility behavior from assets/home-screen-125-171.js
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('show-focus-outlines');
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Apply theme at document level
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Seed demo notes first time
    if (!initialized && (!notes || notes.length === 0)) {
      const now = Date.now();
      const demo = [
        { id: nanoid(), title: 'Design of Everyday Things', content: 'Book notes...', tags: ['books'], createdAt: now - 50000, updatedAt: now - 40000 },
        { id: nanoid(), title: 'Ufotable Anime', content: 'Studio Ufotable works...', tags: ['anime'], createdAt: now - 30000, updatedAt: now - 20000 },
        { id: nanoid(), title: 'Open Source Apps', content: 'A list of FOSS apps...', tags: ['software', 'oss'], createdAt: now - 10000, updatedAt: now - 5000 },
      ];
      setNotes(demo);
    }
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allTags = useMemo(() => {
    const s = new Set();
    (notes || []).forEach(n => (n.tags || []).forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, [notes]);

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
      notes,
      /**
       * PUBLIC_INTERFACE
       * getNoteById returns a note by id or undefined.
       */
      getNoteById: (id) => (notes || []).find(n => n.id === id),
      /**
       * PUBLIC_INTERFACE
       * upsertNote creates or updates a note, returning the saved note.
       */
      upsertNote: (payload) => {
        const now = Date.now();
        if (!payload.id) {
          const newNote = { ...payload, id: nanoid(), createdAt: now, updatedAt: now, tags: payload.tags || [] };
          setNotes(arr => [newNote, ...(arr || [])]);
          return newNote;
        }
        let saved;
        setNotes(arr => {
          const list = (arr || []).map(n => {
            if (n.id === payload.id) {
              saved = { ...n, ...payload, updatedAt: now, tags: payload.tags || [] };
              return saved;
            }
            return n;
          });
          if (!list.find(n => n.id === payload.id)) {
            saved = { ...payload, createdAt: now, updatedAt: now, tags: payload.tags || [] };
            return [saved, ...list];
          }
          return list;
        });
        return saved;
      },
      /**
       * PUBLIC_INTERFACE
       * deleteNote removes a note by id.
       */
      deleteNote: (id) => {
        setNotes(arr => (arr || []).filter(n => n.id !== id));
      },
      allTags,
      /**
       * PUBLIC_INTERFACE
       * resetAll clears notes and theme back to defaults.
       */
      resetAll: () => {
        setNotes([]);
        setTheme('light');
        localStorage.removeItem('notes_items');
        localStorage.removeItem('notes_theme');
      },
    };
  }, [theme, notes, setTheme, setNotes, allTags]);

  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes is the context hook to access notes state and actions.
 */
export function useNotes() {
  const ctx = React.useContext(NotesCtx);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
