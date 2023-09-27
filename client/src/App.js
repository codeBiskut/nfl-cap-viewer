import React, { useState } from 'react';

function App() {
  const [output, setOutput] = useState('');

  const runPythonScript = async () => {
    try {
      const response = await fetch('/get-contracts'); // Assumes the React app is hosted on the same server
      console.log(response.data)
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error:', error);
      // Handle error in your React component
    }
  };

  return (
    <div>
      <button onClick={runPythonScript}>Run Python Script</button>
      <div>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
