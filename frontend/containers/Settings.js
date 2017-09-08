import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'reflexbox';
import { connect } from 'react-redux';
import { Label, Input, Button, Clearfix } from '../components/ui';

import { updateUser } from '../redux/modules/user';

@connect(({ user }) => ({ user }), { updateUser })
export default class Settings extends Component {
  static propTypes = {
    user: PropTypes.shape({
      user: PropTypes.object
    }).isRequired,
    updateUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.updateAccount = this.updateAccount.bind(this);
  }

  updateAccount(e) {
    e.preventDefault();
    this.props.updateUser(this.props.user.user._id, {
      name: e.target.name.value,
      email: e.target.email.value
    });
  }

  render() {
    const { user: { user } } = this.props;
    return (
      <div>
        <Box mb={3}>
          <Box mb={2}>
            <h1>Settings</h1>
          </Box>
          <p>Configure personal settings and access code information here.</p>
        </Box>
        <Box mb={3}>
          <Box mb={2}>
            <h3>Personal Settings</h3>
          </Box>
          <form onSubmit={this.updateAccount}>
            <Box mb={2}>
              <Label>Name</Label>
              <Input name="name" defaultValue={user.name} />
            </Box>
            <Box mb={2}>
              <Label>Email</Label>
              <Input type="email" name="email" defaultValue={user.email} />
            </Box>
            <Button floatRight primary>Update Account</Button>
            <Clearfix />
          </form>
        </Box>
        <Box mb={3}>
          <Box mb={2}>
            <h3>Access Codes</h3>
          </Box>
          <Box mb={2}>
            <p>Access codes are used as an authentication method when sending emails. You can enable and disable them here.</p>
          </Box>
        </Box>
      </div>
    );
  }
}
