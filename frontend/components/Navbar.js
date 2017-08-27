import React from 'react';
import styled from 'styled-components';

import Container from './ui/Container';
import { colors } from './ui/Variables';

const StyledNav = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
`;

const Navbar = ({ user, logoutRequest }) => (
  <StyledNav>
    <Container>
      lunar-mail
    </Container>
  </StyledNav>
);

export default Navbar;
