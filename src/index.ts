import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to ping the server
app.get('/ping', (req, res) => {
  res.send('true');
});

// Endpoint to submit form data
app.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  // Add logic to save the submission to db.json
  res.send('Submission received');
});

// Endpoint to read form data
app.get('/read', (req, res) => {
  const { index } = req.query;
  // Add logic to read from db.json based on index
  res.send('Form data');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

