import React, { Component } from 'react';
import { Jumbotron, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Challenge from './Challenge';

export default () => (
  <div>
    <div className="container">
      <Jumbotron>
        <h1>Welcome, KingGOD DISBOARD San!</h1>
        <h3>You are now 1st(12345pts)</h3>
        <LinkContainer to="/challenge">
          <Button href="#" color="primary">
            Never Giveup 하러 가기
          </Button>
        </LinkContainer>
      </Jumbotron>

      <h3>Notice</h3>
      <hr />

      <Card>
        <CardBody />
      </Card>

      <h3>Rank</h3>
      <hr />
      <h3>Recommended Challenge</h3>
      <hr />
    </div>
  </div>
);
