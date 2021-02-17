import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTableComponent from './ReactTableComponent';

test('renders learn react link', () => {
  render(<ReactTableComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
