import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function Home() {
  return (
    <>
      <Row>
        <Col>
          <h1>Home</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/seed/picsum/200/300" />
            <Card.Body>
              <Card.Title>Picture Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
