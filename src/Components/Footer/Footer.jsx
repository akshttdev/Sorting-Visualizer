import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";

function Footer({ array, generateNewArray, selectedAlgo, setSelectedAlgo, handleSort , isSorting}) {
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
        <button
    className={`footerBtn generateButton ${isSorting ? "disabledBtn" : ""}`}
    onClick={generateNewArray}
    disabled={isSorting}
  >
    Generate New Array
  </button>

    <div className="dropdownContainer">
    <button
      className={`footerBtn dropDown ${isSorting ? "disabledBtn" : ""}`}
      onClick={() => !isSorting && setIsOpen(!isOpen)}
      ref={buttonRef}
      disabled={isSorting}
    >
      {selectedAlgo}
    </button>

    {isOpen && !isSorting && (
      <div className="dropDownOption" ref={dropdownRef}>
        <button onClick={() => handleSelect("Bubble Sort")}>Bubble Sort</button>
        <button onClick={() => handleSelect("Merge Sort")}>Merge Sort</button>
        <button onClick={() => handleSelect("Quick Sort")}>Quick Sort</button>
        <button onClick={() => handleSelect("Insertion Sort")}>Insertion Sort</button>
        <button onClick={() => handleSelect("Selection Sort")}>Selection Sort</button>
      </div>
    )}
  </div>

  <button
    className={`sort ${isSorting ? "disabledBtn" : ""}`}
    onClick={handleSort}
    disabled={isSorting}
  >
    Sort
  </button>
    </div>
  );
}

export default Footer;
