import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import { fetchEmailRequest } from '../redux/modules/email';

@connect(({ email }) => ({ email }), { fetchEmailRequest })
export default class Email extends Component {
  static propTypes = {
    fetchEmailRequest: PropTypes.func.isRequired,
    params: PropTypes.shape({
      emailId: PropTypes.string
    }).isRequired,
    email: PropTypes.shape({
      email: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    this.props.fetchEmailRequest(this.props.params.emailId);
  }

  render() {
    const { email: { email } } = this.props;
    return (
      <div>
        {email && email.name && <h2>Email Name: {email.name}</h2>}
      </div>
    );
  }
}
