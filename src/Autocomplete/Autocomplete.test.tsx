import React from 'react';
import { render } from '@testing-library/react';

import Autocomplete, { AutocompleteProps } from './Autocomplete';

const MOVIES = [
  'To Kill a Mockingbird',
  'Nope',
  'The Departed',
  'The Godfather',
  'The Godfather Part 2',
];

describe('Autocomplete', () => {
  let props: AutocompleteProps;

  beforeEach(() => {
    props = {
      options: MOVIES,
    };
  });

  const renderComponent = () => render(<Autocomplete {...props} />);

  it('should just show an input when it has not been focused', () => {
    const { queryByTestId } = renderComponent();

    const input = queryByTestId('Autocomplete-Input');
    const popup = queryByTestId('Autocomplete-Popup');

    expect(input).toBeInTheDocument();
    expect(popup).not.toBeInTheDocument();
  });
});
