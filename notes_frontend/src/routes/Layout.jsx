import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

/**
 * PUBLIC_INTERFACE
 * Layout wraps pages with Sidebar and Topbar and renders nested routes via Outlet.
 */
export default function Layout() {
  const location = useLocation();

  // Title heuristic based on route
  const title = location.pathname === '/'
    ? 'Notes'
    : location.pathname.startsWith('/notes/new')
      ? 'New Note'
      : location.pathname.startsWith('/notes')
        ? 'All Notes'
        : 'Settings';

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-pane">
        <Topbar title={title} />
        <Outlet />
      </main>
    </div>
  );
}
