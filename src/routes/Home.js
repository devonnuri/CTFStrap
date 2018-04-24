import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
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
      <Row>
        {[...Array(5)].map((e, i) => (
          <Col lg="4">
            <Card>
              <CardBody>
                <CardTitle>겁나 중요한 공지사항</CardTitle>
                <CardText>정말 중요하다구요!</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <h3>Rank</h3>
      <hr />

      <Row>
        {[...Array(5)].map((e, i) => (
          <Col sm="6">
            <Card>
              <CardBody>
                <CardText>{i + 1} : 킹갓킹갓 : 1000pts</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Recommended Challenge</h3>
      <hr />
    </div>
  </div>
);
