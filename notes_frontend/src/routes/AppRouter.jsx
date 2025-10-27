import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotesListPage from '../pages/NotesListPage';
import NoteEditorPage from '../pages/NoteEditorPage';
import SettingsPage from '../pages/SettingsPage';
import { NotesProvider } from '../state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * AppRouter sets up all routes for the Notes application.
 * Routes:
 * - "/" -> HomePage
 * - "/notes" -> NotesListPage
 * - "/notes/:id" -> NoteEditorPage
 * - "/settings" -> SettingsPage
 */
export default function AppRouter() {
  return (
    <NotesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesListPage />} />
          <Route path="/notes/:id" element={<NoteEditorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </NotesProvider>
  );
}
