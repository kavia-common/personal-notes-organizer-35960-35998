import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import { useNotes } from '../state/NotesContext';
import './pages.css';

/**
 * PUBLIC_INTERFACE
 * NoteEditorPage creates/edits a note identified by the URL param "id".
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
    <NoteEditor
      note={note}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
