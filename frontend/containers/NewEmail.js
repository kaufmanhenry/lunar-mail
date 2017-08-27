import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';

import { saveEmailFlow } from '../redux/modules/email';

import { Card, Button, Input, TextArea, Label } from '../components/ui';

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
      <Card>
        <Flex mx={-2}>
          <Box w={[1, 1 / 2]} mx={2}>
            <h2>New Email</h2>
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
              </Box>
              <Button floatRight>Save</Button>
            </form>
          </Box>
          <Box w={[1, 1 / 2]} mx={2}>
            <Card bordered>
              <Box mb={2}>
                <h3>Preview</h3>
              </Box>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh nisi, semper ut eros nec, elementum volutpat elit. Duis pharetra non urna non porttitor. Donec scelerisque mauris quam, eget gravida sem interdum non. Aliquam molestie justo sed augue laoreet sagittis. Sed eu diam in justo vestibulum euismod id cursus urna. Morbi pulvinar sem eu tortor suscipit egestas. In pulvinar sed felis eget sagittis. Ut eget molestie mauris, id fringilla lacus. Aenean nec urna ut orci bibendum eleifend nec id libero. Curabitur dui leo, sodales auctor sollicitudin et, venenatis vel eros. Phasellus efficitur mollis aliquam.</p>
            </Card>
          </Box>
        </Flex>
      </Card>
    );
  }
}
