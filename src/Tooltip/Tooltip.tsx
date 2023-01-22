import React, { PropsWithChildren, useRef, useState } from 'react';
import * as S from './Tooltip.styles';

export interface TooltipProps {
  text: string; // Text to show inside Tooltip
  position?: 'top' | 'right' | 'bottom' | 'left';
  delayMs?: number; // How long to delay before showing, default 0
  open?: boolean; // Controls whether or not to always show tip
  showArrow?: boolean;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  text,
  position = 'top',
  delayMs = 0,
  showArrow = true,
  open,
  children,
}) => {
  const timeout = useRef(null);

  const [active, setActive] = useState(open);

  const controlled = open !== undefined;

  const showTip = () => {
    timeout.current = setTimeout(() => {
      setActive(true);
    }, delayMs);
  };

  const hideTip = () => {
    clearInterval(timeout.current);
    setActive(false);
  };

  return (
    <S.Wrapper
      data-testid="Tooltip"
      onMouseEnter={controlled ? undefined : showTip}
      onMouseLeave={controlled ? undefined : hideTip}
    >
      {children}
      {active && (
        <S.Popup
          data-testid="Tooltip-Popup"
          showArrow={showArrow}
          position={position}
        >
          <span data-testid="Tooltip-Text">{text}</span>
        </S.Popup>
      )}
    </S.Wrapper>
  );
};

export default Tooltip;
