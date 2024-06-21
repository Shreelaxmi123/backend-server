import express, { Request, Response } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// app.use(express.json());

// Endpoint to ping the server
app.get('/ping', (req, res) => {
  res.send('true');
});

// Endpoint to submit form data
app.use(bodyParser.json());

// POST endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    
    // Load existing data from db.json
    let submissions: Array<any> = [];
    const filePath = './db.json';
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf-8'); // Specify encoding to get a string
        submissions = JSON.parse(rawData);
    }

    // Add new submission to the data
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    submissions.push(newSubmission);

    // Save updated data back to db.json
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.send('Submission received');
});

// Endpoint to read form data
app.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const filePath = './db.json';
  if (isNaN(index)) {
    res.status(400).send('Invalid index');
    return;
  }

  // Read the existing data
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const submissions = JSON.parse(rawData);

  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).send('Submission not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

