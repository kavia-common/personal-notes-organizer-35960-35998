import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app text', () => {
  render(<App />);
  const el = screen.getByText(/Personal Notes App/i);
  expect(el).toBeInTheDocument();
});
