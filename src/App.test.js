import { render, screen } from '@testing-library/react';
import App from './App';

test('renders overview link', () => {
  render(<App />);
  const linkElement = screen.getByText(/overview/i);
  expect(linkElement).toBeInTheDocument();
});
