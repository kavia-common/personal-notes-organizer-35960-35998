import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotesListPage from '../pages/NotesListPage';
import NoteEditorPage from '../pages/NoteEditorPage';
import SettingsPage from '../pages/SettingsPage';
import Layout from './Layout';
import { NotesProvider } from '../state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * AppRouter declares route hierarchy for the Notes app.
 * Uses a shared Layout with Sidebar + Topbar + Outlet, and nested pages.
 */
export default function AppRouter() {
  return (
    <NotesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="notes" element={<NotesListPage />} />
          <Route path="notes/:id" element={<NoteEditorPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </NotesProvider>
  );
}
