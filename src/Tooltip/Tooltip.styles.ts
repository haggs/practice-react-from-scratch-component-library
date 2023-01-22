import styled, { css } from 'styled-components';

const TEXT_COLOR = 'white';
const BACKGROUND_COLOR = 'black';
const MARGIN = '44px';
const ARROW_SIZE = '6px';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

interface PopupProps {
  showArrow: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
}

export const Popup = styled.div<PopupProps>`
  position: absolute;
  border-radius: 4px;
  padding: 6px;
  color: ${TEXT_COLOR};
  background: ${BACKGROUND_COLOR};
  z-index: 100;
  white-space: nowrap;

  ${({ showArrow }) =>
    showArrow &&
    css`
      &::before {
        content: ' ';
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: ${ARROW_SIZE};
        margin-left: calc(${ARROW_SIZE} * -1);
      }
    `}

  ${({ position, showArrow }) => css`
    ${position === 'top' &&
    css`
      top: calc(${MARGIN} * -1);
      left: 50%;
      transform: translateX(-50%);

      ${showArrow &&
      css`
        &::before {
          top: 100%;
          left: 50%;
          border-top-color: ${BACKGROUND_COLOR};
        }
      `}
    `}

    ${position === 'right' &&
    css`
      left: calc(100% + ${MARGIN});
      top: 50%;
      transform: translateY(-50%);

      ${showArrow &&
      css`
        &::before {
          left: calc(${ARROW_SIZE} * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: ${BACKGROUND_COLOR};
        }
      `}
    `}

    ${position === 'bottom' &&
    css`
      left: 50%;
      transform: translateX(-50%);
      bottom: calc(${MARGIN} * -1);

      ${showArrow &&
      css`
        &::before {
          bottom: 100%;
          left: 50%;
          border-bottom-color: ${BACKGROUND_COLOR};
        }
      `}
    `}

    ${position === 'left' &&
    css`
      left: auto;
      right: calc(100% + ${MARGIN});
      top: 50%;
      transform: translateX(0) translateY(-50%);

      ${showArrow &&
      css`
        &::before {
          left: auto;
          right: calc(${ARROW_SIZE} * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: ${BACKGROUND_COLOR};
        }
      `}
    `}
  `}
`;
