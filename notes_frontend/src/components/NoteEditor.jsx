import React, { useEffect, useState } from 'react';
import TagPill from './TagPill';
import { useNotes } from '../state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * NoteEditor provides editing UI for a single note: title, content (textarea), and tags.
 */
export default function NoteEditor({ note, onSave, onDelete }) {
  const isNew = !note || note.id === 'new';
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState(note?.tags || []);
  const { allTags } = useNotes();

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setTags(note?.tags || []);
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const addTag = (t) => {
    const tag = (t || tagsInput).trim();
    if (!tag) return;
    if (!tags.includes(tag)) setTags([...tags, tag]);
    setTagsInput('');
  };

  const removeTag = (t) => {
    setTags(tags.filter(x => x !== t));
  };

  const handleSave = () => {
    onSave({
      id: isNew ? undefined : note.id,
      title: title.trim(),
      content,
      tags,
    });
  };

  return (
    <div className="editor card">
      <div className="editor-row">
        <input
          className="input title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
      </div>
      <div className="editor-row">
        <textarea
          className="input content"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          aria-label="Note content"
        />
      </div>
      <div className="editor-row">
        <div className="tags-input">
          <input
            className="input"
            placeholder="Add tag"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            aria-label="Add tag"
          />
          <button className="btn" onClick={() => addTag()} aria-label="Add tag">Add</button>
        </div>
        <div className="tags-list">
          {tags.map(t => <TagPill key={t} label={t} active onClick={() => removeTag(t)} removable />)}
        </div>
        {allTags.length > 0 && (
          <div className="tags-suggestions">
            <span className="muted">Suggestions:</span>
            {allTags.filter(t => !tags.includes(t)).slice(0, 6).map(t => (
              <TagPill key={t} label={t} onClick={() => addTag(t)} />
            ))}
          </div>
        )}
      </div>
      <div className="editor-actions">
        <button className="btn primary" onClick={handleSave} aria-label="Save note">Save</button>
        {!isNew && <button className="btn danger" onClick={() => onDelete(note.id)} aria-label="Delete note">Delete</button>}
      </div>
    </div>
  );
}
