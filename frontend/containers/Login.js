import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import { loginRequest } from '../redux/modules/user';

@connect(({ user }) => ({ user }), { loginRequest })
export default class Login extends Component {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(e) {
    e.preventDefault();
    this.props.loginRequest({
      email: e.target.email.value,
      password: e.target.password.value
    });
  }

  render() {
    return (
      <Flex align="center" justify="center" py={3}>
        <Box w={320}>
          <Card>
            <Box mb={2}>
              <h1>Login</h1>
            </Box>
            <form onSubmit={this.loginSubmit}>
              <Box mb={2}>
                <Input placeholder="Email" name="email" />
              </Box>
              <Box mb={2}>
                <Input placeholder="Password" type="password" name="password" />
              </Box>
              <Button primary block>Login</Button>
            </form>
          </Card>
        </Box>
      </Flex>
    );
  }
}
