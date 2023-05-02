import { render, screen } from '@testing-library/react';
import App from './App';

test('render link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Log/i);
  expect(linkElement).toBeInTheDocument();
});
