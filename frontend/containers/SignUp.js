import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import { signupFlow } from '../redux/modules/user';

@connect(({ user }) => ({ user }), { signupFlow })
export default class SignUp extends Component {
  static propTypes = {
    signupFlow: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.signupSubmit = this.signupSubmit.bind(this);
  }

  signupSubmit(e) {
    e.preventDefault();
    this.props.signupFlow({
      name: e.target.name.value,
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
              <h1>Sign Up</h1>
            </Box>
            <form onSubmit={this.signupSubmit}>
              <Box mb={2}>
                <Input placeholder="Name" name="name" />
              </Box>
              <Box mb={2}>
                <Input placeholder="Email" name="email" />
              </Box>
              <Box mb={2}>
                <Input placeholder="Password" type="password" name="password" />
              </Box>
              <Button primary block>Sign Up</Button>
            </form>
          </Card>
        </Box>
      </Flex>
    );
  }
}
