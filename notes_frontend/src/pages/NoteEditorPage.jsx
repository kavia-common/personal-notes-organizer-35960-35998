import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NoteEditor from '../components/NoteEditor';
import { useNotes } from '../state/NotesContext';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * NoteEditorPage allows creating or editing a note by id param.
 * If id === "new", creates a new note on save.
 */
export default function NoteEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, upsertNote, deleteNote } = useNotes();

  const note = id === 'new' ? { id: 'new', title: '', content: '', tags: [] } : getNoteById(id);

  const handleSave = (payload) => {
    const saved = upsertNote(payload);
    navigate(`/notes/${saved.id}`);
  };

  const handleDelete = (nid) => {
    deleteNote(nid);
    navigate('/notes');
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-pane">
        <Topbar title={id === 'new' ? 'New Note' : (note?.title || 'Edit Note')} />
        <NoteEditor
          note={note}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
