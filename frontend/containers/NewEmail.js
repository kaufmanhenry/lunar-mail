import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import { saveEmailFlow } from '../redux/modules/email';

import { Card, Button, Input, TextArea, Label, SubText } from '../components/ui';

@connect(({ email }) => ({ email }), { saveEmailFlow })
export default class NewEmail extends Component {
  static propTypes = {
    saveEmailFlow: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.saveEmail = this.saveEmail.bind(this);
  }

  saveEmail(e) {
    e.preventDefault();

    this.props.saveEmailFlow({
      name: e.target.name.value,
      subject: e.target.subject.value,
      body: e.target.body.value
    });
  }

  render() {
    return (
      <div>
        <Box mb={3}>
          <Box mb={2}>
            <h1>New Email</h1>
          </Box>
          <p>Create a new email that can be sent.</p>
        </Box>
        <Box>
          <form onSubmit={this.saveEmail}>
            <Box mb={2}>
              <Label>Email Name</Label>
              <Input name="name" />
            </Box>
            <Box mb={2}>
              <Label>Email Subject</Label>
              <Input name="subject" />
            </Box>
            <Box mb={2}>
              <Label>Email Body</Label>
              <TextArea name="body" />
              <Box mt={1}>
                <SubText>An email body can have merge fields that are specified through the template literal format.</SubText>
              </Box>
            </Box>
            <Button floatRight primary>Save</Button>
          </form>
        </Box>
      </div>
    );
  }
}
