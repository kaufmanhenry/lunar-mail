import styled from 'styled-components';
import { colors, fontSizes } from './Variables';

export default styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? colors.blue : 'transparent'};
  color: ${props => props.primary ? colors.white : colors.black};
  font-size: ${fontSizes[5]};
  border: solid 1px ${props => props.primary ? colors.blue : colors.lightGray};
  border-radius: 4px;
`;
