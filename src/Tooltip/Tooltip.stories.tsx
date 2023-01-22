import React from 'react';
import Tooltip, { TooltipProps } from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

const Template = (args: TooltipProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip {...args}>
        <div
          style={{ width: '300px', height: '300px', backgroundColor: 'blue' }}
        />
      </Tooltip>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  text: 'Hello world!',
  position: 'top',
  showArrow: true,
} as TooltipProps;
