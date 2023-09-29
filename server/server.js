const express = require('express')
const cors = require('cors')
const { spawn } = require('child_process')
const compression = require('compression')

const app = express();
const PORT = 5000

app.use(cors());
app.use(compression());
app.use(express.json());

//add mongodb when ready 

app.post('/api/get-contracts', (req, res) => {
    console.log('here')
    return new Promise((resolve, reject) => {
        const pythonScript = 'scraper.py'; // Replace with the path to your Python script
        
        const pythonProcess = spawn('python', [pythonScript]);

        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(pythonOutput);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


