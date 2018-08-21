import React, { Component } from 'react';
import { Container, Header, Input } from 'semantic-ui-react'

export default class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  render() {
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input placeholder="Username" fluid></Input>
      </Container>
    )
  }
}
