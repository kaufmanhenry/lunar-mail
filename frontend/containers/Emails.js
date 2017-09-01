import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import { fetchEmailsFlow } from '../redux/modules/email';

import EmailCard from '../components/EmailCard';

@connect(({ email }) => ({ email }), { fetchEmailsFlow })
export default class Emails extends Component {
  static propTypes = {
    fetchEmailsFlow: PropTypes.func.isRequired,
    email: PropTypes.shape({
      emails: PropTypes.array
    }).isRequired
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
        {email && email.emails &&
          <Flex mx={-2}>
            {email.emails.map(e =>
              <Box w={[1, 1 / 2]} mx={2} key={e._id}><EmailCard name={e.name} id={e._id} /></Box>)}
          </Flex>
        }
      </div>
    );
  }
}
