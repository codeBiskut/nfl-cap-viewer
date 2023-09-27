const express = require('express')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

//add mongodb when ready 

app.post('/get-contracts', (req, res) => {
    // Replace 'your-script.py' with the actual path to your Python script
    const pythonProcess = spawn('python', ['scraper.py']);

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        res.json({ output });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: 'An error occurred while running the script.' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


