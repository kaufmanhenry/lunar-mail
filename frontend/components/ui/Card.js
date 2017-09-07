import styled from 'styled-components';
import { colors } from './Variables';

export default styled.div`
  padding: 20px;
  border: ${props => props.bordered ? `dotted 1px ${colors.lightGray}` : 'none'};
  box-shadow: ${props => !props.bordered ? '0 0 10px rgba(0, 0, 0, .1)' : 'none'};
  background-color: ${colors.white};
  border-radius: 8px;
`;
