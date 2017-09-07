import styled from 'styled-components';
import { colors } from './Variables';

export default styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  tr {
    text-align: left;
  }
  thead {
    color: ${colors.gray};
    th {
      font-weight: 500;
      border-bottom: solid 1px ${colors.snow};
      padding-bottom: 1rem;
    }
  }
  tr {
    width: 100%;
  }
  td {
    padding: 1rem 0;
    border-bottom: solid 1px ${colors.snow};    
  }
  a {
    color: ${colors.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
