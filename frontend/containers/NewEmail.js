import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Label from '../components/ui/Label';

export default class NewEmail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Flex mx={-2}>
          <Box w={[1, 1 / 2]} mx={2}>
            <h2>New Email</h2>
            <Box mb={2}>
              <Label>Email Name</Label>
              <Input />
            </Box>
            <Box mb={2}>
              <Label>Email Subject</Label>
              <Input />
            </Box>
            <Box mb={2}>
              <Label>Email Body</Label>
              <TextArea />
            </Box>
            <Button>Save</Button>
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
