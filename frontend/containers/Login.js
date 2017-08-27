import React, { Component } from 'react';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <h1>Login</h1>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
      </Card>
    );
  }
}
