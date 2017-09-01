import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from 'reflexbox';
import { Link } from 'react-router';

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

const NavbarLink = styled(Link)`
  color: ${colors.gray};
  text-decoration: none;
  font-weight: 500;
  margin: 0 1rem;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

const Navbar = ({ logoutFlow }) => (
  <StyledNav>
    <Container>
      <Flex align="space-between" justify="space-between">
        <div>
          <h3>lunar-mail</h3>
        </div>
        <div>
          <NavbarLink to="emails">Emails</NavbarLink>
          <NavbarLink to="newEmail">Create Email</NavbarLink>
          <NavbarLink to="settings">Settings</NavbarLink>
        </div>
        <div>
          <NavbarLink onClick={() => logoutFlow()}>Logout</NavbarLink>
        </div>
      </Flex>
    </Container>
  </StyledNav>
);

Navbar.propTypes = {
  logoutFlow: PropTypes.func.isRequired
};

export default Navbar;
