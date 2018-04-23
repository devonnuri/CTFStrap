import React from 'react';

import { Row, Col } from 'reactstrap';

export default () => (
  <footer className="page-footer font-small blue pt-4 mt-4">
    <div className="container text-center text-md-left">
      <Row>
        <Col md="6">
          <h5>Footer Content</h5>
          <p>Here is Your FOOTER!</p>
        </Col>

        <Col md="6">
          <h5>Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
    <div className="footer-copyright py-3 text-center">
      Copyright © DEVONNURI ALL RIGHT RESERVED
    </div>
  </footer>
);
