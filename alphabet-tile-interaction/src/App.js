import React, { useState } from 'react';
import './App.css';
import Tile from './Tile';

function App() {
  const [outputString, setOutputString] = useState('');

  const handleClick = (letter) => {
    let newOutputString = outputString + letter;

    // Check for consecutive letters and replace them accordingly
    newOutputString = replaceConsecutiveLetters(newOutputString);

    setOutputString(newOutputString);
  };

  const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) => '_'.repeat(Math.floor(match.length / 3)));
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="App">
      <div id="outputString">{outputString}</div>
      <div className="tile-container">
        {alphabet.map((letter, index) => (
          <Tile key={index} letter={letter} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
