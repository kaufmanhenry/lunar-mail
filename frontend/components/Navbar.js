import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { colors } from './ui/Variables';

const NavbarLink = styled(Link)`
  display: block;
  color: ${colors.gray};
  text-decoration: none;
  font-weight: 500;
  margin: 1rem 0;
  cursor: pointer;
`;

const Navbar = ({ logoutFlow }) => (
  <div>
    <div>
      <h3>lunar-mail</h3>
    </div>
    <br />
    <div>
      <NavbarLink to="emails">Emails</NavbarLink>
      <NavbarLink to="newEmail">Create Email</NavbarLink>
      <NavbarLink to="settings">Settings</NavbarLink>
    </div>
    <br />
    <br />
    <br />
    <div>
      <NavbarLink onClick={() => logoutFlow()}>Logout</NavbarLink>
    </div>
  </div>
);

Navbar.propTypes = {
  logoutFlow: PropTypes.func.isRequired
};

export default Navbar;
