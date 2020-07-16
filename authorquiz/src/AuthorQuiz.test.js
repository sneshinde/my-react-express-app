import React from 'react';
import { render } from '@testing-library/react';
import AuthorQuiz from './AuthorQuiz';

test('renders learn react link', () => {
  const { getByText } = render(<AuthorQuiz />);
  const linkElement = getByText(/Author Quiz/i);
  expect(linkElement).toBeInTheDocument();
});
