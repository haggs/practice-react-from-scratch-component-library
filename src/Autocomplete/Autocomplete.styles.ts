import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  height: 100px;
`;

export const Popup = styled.ul`
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  max-width: 400px;
  overflow: auto;
  list-style-type: none;
  padding: 0;
`;

export const Option = styled.li<{ active: boolean }>`
  padding: 10px;
  margin: 0;
  ${(p) => p.active && 'background-color: lightgray;'}
`;
