import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ArrayBar from './Components/ArrayBars/ArrayBar.jsx';
import resetSound from './Sounds/ResetEffect.mp3';

function App() {
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("Sorting Algorithm");

  const playSound = () => {
    const audio = new Audio(resetSound);
    audio.play().catch(err => {
      // Silently ignore autoplay errors
      console.warn("Audio playback was blocked:", err);
    });
  };

  const generateNewArray = (play = true) => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * (70 - 5 + 1)) + 5
    );
    setArray(newArray);
    if (play) playSound();
  };

  useEffect(() => {
    generateNewArray(false); // Don't play sound on first load
  }, []);

  return (
    <>
      <Header />
      <ArrayBar array={array} />
      <Footer
        array={array}
        generateNewArray={generateNewArray}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
      />
    </>
  );
}

export default App;
