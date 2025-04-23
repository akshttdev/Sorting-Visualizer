import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ArrayBar from "./Components/ArrayBars/ArrayBar";
import resetSound from "./Sounds/ResetEffect.mp3";
import { randomIntFromInterval, playAudio } from "./Helper.js";
import BubbleSort from "./SortingAlgorithms/BubbleSort/BubbleSort";

function App() {
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  const playSound = () => playAudio(resetSound);

  const generateNewArray = (play = true) => {
    if (isSorting) return; // Don't generate a new array during sorting
    
    const newArray = Array.from({ length: 20 }, () =>
      randomIntFromInterval(5, 70)
    );
    setArray(newArray);
    if (play) playSound();
  };

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    
    if (selectedAlgo === "Bubble Sort") {
      BubbleSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); // Update with sorted array
        setIsSorting(false);
      });
    }
  };

  useEffect(() => {
    generateNewArray(false);
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
        handleSort={handleSort}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isSorting={isSorting}
      />
    </>
  );
}

export default App;