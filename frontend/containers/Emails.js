import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box } from 'reflexbox';

import { Table } from '../components/ui';

import { fetchEmailsFlow } from '../redux/modules/email';

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
          <Box py={2}>
            <Table>
              <thead>
                <tr>
                  <th>Email Name</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {email.emails.map(e => (
                  <tr>
                    <td>{e.name}</td>
                    <td>
                      <Link to={`emails/${e._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        }
      </div>
    );
  }
}
