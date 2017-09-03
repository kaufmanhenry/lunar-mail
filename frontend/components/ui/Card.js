import styled from 'styled-components';
import { colors } from './Variables';

export default styled.div`
  padding: 30px;
  border: ${props => props.bordered ? `solid 1px ${colors.lightGray}` : 'none'};
  box-shadow: ${props => !props.bordered ? '0 0 10px rgba(0, 0, 0, .1)' : 'none'};
  background-color: ${colors.white};
  border-radius: 8px;
  h2 {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: dotted 1px ${colors.lightGray};
  }
`;
