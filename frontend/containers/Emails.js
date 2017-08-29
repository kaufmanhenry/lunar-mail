import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchEmailsFlow } from '../redux/modules/email';

@connect(({ email }) => ({ email }), { fetchEmailsFlow })
export default class Emails extends Component {
  static propTypes = {
    fetchEmailsFlow: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchEmailsFlow();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>Emails</h1>
        {email && email.loading && <p>emails loading...</p>}
        {email && email.emails && email.emails.map(e => <p key={e._id}>{e.name}</p>)}
      </div>
    );
  }
}
