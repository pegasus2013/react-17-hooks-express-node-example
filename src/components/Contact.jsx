/**
 * @description React 17 Frontend Application for Undabot ltd. Frontend Recruitment test
 * @author Alen Begovic - alen.begovic@gmail.com
 * @date December 2020
 *
 */

import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import ClientValidator from '../helpers/validators';
import ContactService from '../services/ContactService';
import styles from './styles.scss';

const ERROR = 'ERROR';
const EMPTY_STRING = '';
const emailNotValidError = 'Email address is not valid';
const messageNotValidError = 'The message must be longer than 30 characters';

function Contact() {
  const [checkboxChecked, setCheckbox] = useState(false);
  const [email, setEmail] = useState(EMPTY_STRING);
  const [message, setMessage] = useState(EMPTY_STRING);
  const [responseData, setResponse] = useState(EMPTY_STRING);
  const [responseCode, setResponseCode] = useState(EMPTY_STRING);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    emailInvalid: EMPTY_STRING,
    messageInvalid: EMPTY_STRING,
  });

  function OnCheckBoxClick(e) {
    setCheckbox(e.target.checked);
  }

  function validateEmail(value) {
    const valid = ClientValidator.validateEmail(value);
    if (!valid) {
      setValidationErrors({
        emailInvalid: emailNotValidError,
        messageInvalid: validationErrors.messageInvalid,
      });
    } else {
      setValidationErrors({
        emailInvalid: EMPTY_STRING,
        messageInvalid: validationErrors.messageInvalid,
      });
    }
  }

  function validateMessage(value) {
    const valid = ClientValidator.validateMessage(value);
    if (!valid) {
      setValidationErrors({
        messageInvalid: messageNotValidError,
        emailInvalid: validationErrors.emailInvalid,
      });
    } else {
      setValidationErrors({
        messageInvalid: EMPTY_STRING,
        emailInvalid: validationErrors.emailInvalid,
      });
    }
  }

  function onEmailChange(value) {
    if (checkboxChecked) validateEmail(value); // enable/disable Client side validation
    setEmail(value);
  }

  function onMessageChange(value) {
    if (checkboxChecked) validateMessage(value); // enable/disable Client side validation
    setMessage(value);
  }

  function isSubmitEnabled() {
    const emailOk = validationErrors.emailInvalid === EMPTY_STRING && email !== EMPTY_STRING;
    const messageOk = validationErrors.messageInvalid === EMPTY_STRING && message !== EMPTY_STRING;
    return emailOk && messageOk;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = JSON.stringify({
      email,
      message,
    });

    ContactService.create(data)
      .then((response) => {
        setResponse(JSON.stringify(response.data));
        setResponseCode(response.status);
        setSuccess(true);
      })
      .catch((error) => {
        setResponse(JSON.stringify(error.response.data));
        setResponseCode(error.response.status);
        setSuccess(ERROR);
      });
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Contact Us</h1>
        </Col>
      </Row>

      <Row>
        <Col>

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <input
                title="Click"
                type="checkbox"
                onClick={(e) => OnCheckBoxClick(e)}
                checked={checkboxChecked}
              />
              {' '}
              <Form.Label>On/Off Client side validation</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control isInvalid={validationErrors.emailInvalid !== EMPTY_STRING} type="text" placeholder="name@example.com" onChange={(e) => onEmailChange(e.target.value)} />
              {checkboxChecked && validationErrors.emailInvalid !== EMPTY_STRING
               && (
               <ul>
                 <li className={styles.invalidField}>
                   {validationErrors.emailInvalid}
                 </li>
               </ul>
               )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control isInvalid={validationErrors.messageInvalid !== EMPTY_STRING} as="textarea" rows={5} onChange={(e) => onMessageChange(e.target.value)} />
              {checkboxChecked && validationErrors.messageInvalid !== EMPTY_STRING
              && (
              <ul>
                <li className={styles.invalidField}>
                  {validationErrors.messageInvalid}
                </li>
              </ul>
              )}
            </Form.Group>

            <Form.Row>
              <Col>
                <Button disabled={!isSubmitEnabled()} variant="primary" type="submit">
                  Send message
                </Button>
              </Col>
              <Col>
                {success === true && <Alert variant="success">Your message has been sent!</Alert>}
                {success === ERROR && <Alert variant="danger">Message not sent correctly</Alert>}
              </Col>
            </Form.Row>

          </Form>

          {responseData !== '' && (
          <Form.Row>
            <Col>
              {responseCode}
            </Col>
            <Col>
              {responseData}
            </Col>
          </Form.Row>
          )}

        </Col>
      </Row>
    </>
  );
}
export default Contact;
