const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Import path module
const { analyze } = require('./analyze.js');

dotenv.config(); // Load environment variables from .env file

app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve static files from the 'dist' directory

const key = process.env.API_KEY; // Ensure this is defined in your .env file
const PORT = process.env.PORT || 8001;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Serve the index.html file
});

app.post('/', async (req, res) => {
  const url = req.body.input;
  try {
    const Analyze = await analyze(url, key); // Call the analyze function
    const { code, msg, sample } = Analyze;
    if (code == 100 || code == 212) {
      return res.send({ msg: msg, code: code });
    }
    return res.send({ sample: sample, code: code });
  } catch (error) {
    console.error('Error during analysis:', error);
    return res.status(500).send({ error: 'An error occurred during analysis.' }); // Handle errors gracefully
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start
});