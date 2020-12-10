/**
 * UNDABOT NODE JS SERVER - TASK 4
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validator = require('./validation');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:9000',
};

app.use(cors(corsOptions));

// Applying the middleware
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const mockResponse = {
  server: 'ALIVE',
};

app.get('/API', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.status(200).send('Main app');
  res.json({ message: 'Response message' });
});

app.get('/API/contact', (req, res) => {
  res.json({ message: 'No database at the moment, you probably need to Post Contact not Get' });
});

app.post('/API/contact', (req, res) => {
  try {
    const { email, message } = req.body;
    const emailValid = validator.validateEmail(email);
    const messageValid = validator.validateMessage(message);
    const validationErrors = [];

    if (!emailValid) validationErrors.push('Email is not in valid format');
    if (!messageValid) validationErrors.push('Message has to be longer than 30 chars');

    if (validationErrors.length > 0) {
      return res.status(422).json({ validation: validationErrors });
    }

    res.status(200).json({ success: ' “Your message has been sent!' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.listen(port, () => {
  console.log('App started on port', port);
});
