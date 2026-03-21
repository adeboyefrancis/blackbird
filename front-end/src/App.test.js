import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the worksite sidebar label', () => {
  render(<App />);
  // This matches the "Worksite" label in your NAV data
  const labelElement = screen.getByText(/Worksite/i);
  expect(labelElement).toBeInTheDocument();
});