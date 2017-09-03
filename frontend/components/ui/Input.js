import styled from 'styled-components';
import { colors, fontSizes } from './Variables';

export default styled.input`
  display: block;
  padding: 12px;
  background-color: ${colors.snow};
  color: ${colors.black};
  font-size: ${fontSizes[4]}px;
  border: none;
  border-radius: 4px;
  width: calc(100% - 26px);
  &:focus {
    background-color: ${colors.lightGray};
    outline: none;
  }
`;
