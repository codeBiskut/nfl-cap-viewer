const express = require('express')
const cors = require('cors')
const {exec} = require('child_process')

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

//add mongodb when ready 

app.get('/get-contracts', (req, res) => {
    exec('python scraper.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while running the Python script.' });
        return;
      }
      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
      }
      res.status(200).json({ message: 'Python script executed successfully.', output: stdout });
      res.json({ stdout });
    });
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


