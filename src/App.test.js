import { render, screen } from '@testing-library/react';
import App from './App';

test('renders log link', () => {
  render(<App />);
  const linkElement = screen.getByText(/log/i);
  expect(linkElement).toBeInTheDocument();
});
