import React from 'react';

function Tile({ letter, onClick }) {
  return (
    <div className="tile" onClick={() => onClick(letter)}>
      {letter}
    </div>
  );
}

export default Tile;