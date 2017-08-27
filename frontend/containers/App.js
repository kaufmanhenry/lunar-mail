import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box } from 'reflexbox';

import { logoutFlow } from '../redux/modules/user';

import Navbar from '../components/Navbar';

import { Container } from '../components/ui';

@connect(({ user }) => ({ user }), { logoutFlow })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    logoutFlow: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.user && <Navbar logoutFlow={this.props.logoutFlow} />}
        <Box py={3}>
          <Container>{this.props.children}</Container>
        </Box>
      </div>
    );
  }
}
