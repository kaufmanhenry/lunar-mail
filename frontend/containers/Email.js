import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';
import Moment from 'moment';

import { Label, Input, Button, TextArea, SubText, Clearfix, Table } from '../components/ui';

import { fetchEmailRequest, updateEmailRequest } from '../redux/modules/email';

@connect(({ email }) => ({ email }), { fetchEmailRequest, updateEmailRequest })
export default class Email extends Component {
  static propTypes = {
    fetchEmailRequest: PropTypes.func.isRequired,
    updateEmailRequest: PropTypes.func.isRequired,
    params: PropTypes.shape({
      emailId: PropTypes.string
    }).isRequired,
    email: PropTypes.shape({
      email: PropTypes.object
    }).isRequired
  }

  constructor() {
    super();
    this.saveEmail = this.saveEmail.bind(this);
  }

  componentWillMount() {
    this.props.fetchEmailRequest(this.props.params.emailId);
  }

  saveEmail(e) {
    e.preventDefault();
    this.props.updateEmailRequest(
      this.props.email.email._id,
      {
        name: e.target.name.value,
        subject: e.target.subject.value,
        body: e.target.body.value
      });
  }

  render() {
    console.log(this.props.email);
    const { email: { email, stats } } = this.props;
    return (
      <div>
        {email && <div>
          <Flex justify="space-between" align="center" mb={3}>
            <h1>{email.name}</h1>
            {email.createdAt &&
              <SubText>
                {Moment(email.createdAt).format('MMMM D, YYYY')}
              </SubText>
            }
          </Flex>
          <Box mb={3}>
            <Box mb={2}>
              <h3>Edit Email</h3>
            </Box>
            <form onSubmit={this.saveEmail}>
              <Box mb={2}>
                <Label>Email Name</Label>
                <Input name="name" defaultValue={email.name} />
              </Box>
              <Box mb={2}>
                <Label>Email Subject</Label>
                <Input name="subject" defaultValue={email.subject} />
              </Box>
              <Box mb={2}>
                <Label>Email Body</Label>
                <TextArea name="body" defaultValue={email.body} />
              </Box>
              <Button floatRight primary>Save</Button>
              <Clearfix />
            </form>
          </Box>
          <Box mb={3}>
            <Box mb={2}>
              <h3>API</h3>
            </Box>
            <div>
              <Label>Email Endpoint</Label>
              <Input
                value={`http://localhost:3000/api/emails/send/${email._id}`}
                disabled
              />
            </div>
          </Box>
          <Box>
            <Box mb={2}>
              <h3>Statistics</h3>
            </Box>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map(s => (
                    <tr key={s._id}>
                      <td>{s.to}</td>
                      <td>
                        {Moment(s.createdAt).format('MMMM D, YYYY')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Box>
        </div>}
      </div>
    );
  }
}
