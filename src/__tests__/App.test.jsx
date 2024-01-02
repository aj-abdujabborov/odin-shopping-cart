import { describe, test, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../pages/App';

test('that header is found', () => {
  render(<App />);
  expect(screen.getByRole('heading').textContent).toBe('This is a test');
});
