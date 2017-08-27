import styled from 'styled-components';
import { colors, fontSizes } from './Variables';

export default styled.button`
  padding: 12px 16px;
  background-color: ${props => props.primary ? colors.blue : 'transparent'};
  color: ${props => props.primary ? colors.white : colors.black};
  font-size: ${fontSizes[4]}px;
  border: solid 1px ${props => props.primary ? colors.blue : colors.lightGray};
  border-radius: 4px;
  width: ${props => props.block ? '100%' : 'auto'};
  font-weight: 500;
  float: ${props => props.floatRight ? 'right' : 'none'}
`;
