import { render, screen } from '@testing-library/react';
import { expect } from 'chai'; // make sure chai is imported
import { MemoryRouter } from 'react-router-dom';
import App from '../pages/App';

it('renders the header title', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const element = screen.queryByText(/item explorer/i);
  expect(element).to.exist;  // Chai assertion for existence
});
