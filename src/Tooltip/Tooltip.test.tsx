import React from 'react';
import { render } from '@testing-library/react';

import Tooltip, { TooltipProps } from './Tooltip';

describe('Tooltip', () => {
  let props: TooltipProps;

  beforeEach(() => {
    props = {
      text: 'test-text',
    };
  });

  const renderComponent = () => render(<Tooltip {...props} />);

  it('should render popup when open is true', () => {
    props.open = true;
    const { getByTestId } = renderComponent();

    const component = getByTestId('Tooltip-Text');

    expect(component).toBeInTheDocument();
  });
});
