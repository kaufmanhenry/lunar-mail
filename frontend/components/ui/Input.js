import styled from 'styled-components';
import { colors, fontSizes } from './Variables';

export default styled.input`
  display: block;
  padding: 12px 16px;
  background-color: ${colors.snow};
  color: ${colors.black};
  font-size: ${fontSizes[4]}px;
  border: solid 1px ${colors.lightGray};
  border-radius: 4px;
  &:focus {
    border-color: ${colors.blue};
    outline: none;
  }
`;
