import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact';
import Home from './Home';
import Menu from './Menu';
import Sidebar from './Sidebar';

export default function Navigation() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={4} className="d-none d-sm-block">
            <Sidebar />
          </Col>

          <Col xs={12} className="d-block d-sm-none">
            <Menu />
          </Col>

          <Col xs={8} className="d-none d-sm-block">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/contact" exact component={Contact} />
            </Switch>
          </Col>

          <Col xs={12} className="d-block d-sm-none">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
