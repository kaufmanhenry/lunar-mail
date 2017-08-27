import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box } from 'reflexbox';

import { logoutRequest } from '../redux/modules/user';

import Navbar from '../components/Navbar';

import Container from '../components/ui/Container';

@connect(({ user }) => ({ user }), { logoutRequest })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    logoutRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Navbar logoutRequest={this.props.logoutRequest} user={this.props.user} />
        <Box py={3}>
          <Container>{this.props.children}</Container>
        </Box>
      </div>
    );
  }
}
