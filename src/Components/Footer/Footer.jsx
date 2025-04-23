import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";

function Footer({ array, generateNewArray, selectedAlgo, setSelectedAlgo, handleSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedAlgo(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Footer">
      <button className="footerBtn generateButton" onClick={generateNewArray}>
        Generate New Array
      </button>

      <div className="dropdownContainer">
        <button
          className="footerBtn dropDown"
          onClick={() => setIsOpen(!isOpen)}
          ref={buttonRef}
        >
          {selectedAlgo}
        </button>

        {isOpen && (
          <div className="dropDownOption" ref={dropdownRef}>
            <button onClick={() => handleSelect("Bubble Sort")}>Bubble Sort</button>
            <button onClick={() => handleSelect("Merge Sort")}>Merge Sort</button>
            <button onClick={() => handleSelect("Quick Sort")}>Quick Sort</button>
            <button onClick={() => handleSelect("Insertion Sort")}>Insertion Sort</button>
            <button onClick={() => handleSelect("Selection Sort")}>Selection Sort</button>
          </div>
        )}
      </div>

      <button className=" sort" onClick={handleSort}>
        Sort
      </button>
    </div>
  );
}

export default Footer;
