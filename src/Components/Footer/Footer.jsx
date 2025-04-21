import React, { useState } from "react";
import "./Footer.css";

function Footer({ array, generateNewArray, selectedAlgo, setSelectedAlgo }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedAlgo(option);
    setIsOpen(false);
  };

  return (
    <div className="Footer">
      <button className="generateButton" onClick={generateNewArray}>
        Generate New Array
      </button>
      <button className="dropDown" onClick={() => setIsOpen(!isOpen)}>
        {selectedAlgo}
      </button>

      <button className="sort">Sort</button>

      {isOpen && (
        <div className="dropDownOption">
          <button onClick={() => handleSelect("Bubble Sort")}>Bubble Sort</button>
          <button onClick={() => handleSelect("Merge Sort")}>Merge Sort</button>
          <button onClick={() => handleSelect("Quick Sort")}>Quick Sort</button>
          <button onClick={() => handleSelect("Insertion Sort")}>Insertion Sort</button>
          <button onClick={() => handleSelect("Selection Sort")}>Selection Sort</button>
        </div>
      )}
    </div>
  );
}

export default Footer;

