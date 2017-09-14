import styled from 'styled-components';
import { Link } from 'react-router';

import { colors } from './Variables';

export default styled(Link)`
  color: ${colors.blue};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
