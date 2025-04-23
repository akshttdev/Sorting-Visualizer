import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ArrayBar from "./Components/ArrayBars/ArrayBar";
import resetSound from "./Sounds/ResetEffect.mp3";
import { randomIntFromInterval, playAudio } from "./Helper.js";
import BubbleSort from "./SortingAlgorithms/BubbleSort.jsx";
import InsertionSort from "./SortingAlgorithms/InsertionSort.jsx";
import SelectionSort from "./SortingAlgorithms/SelectionSort.jsx";
import MergeSort from "./SortingAlgorithms/MergeSort.jsx";
import QuickSort from "./SortingAlgorithms/QuickSort.jsx";

function App() {
  // State variables
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("Select Algorithm");
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [isSorting, setIsSorting] = useState(false);

  // Function to play sound
  const playSound = () => playAudio(resetSound);

  // Function to generate a new array
  // and play sound if 'play' is true
  const generateNewArray = (play = true) => {
    if (isSorting) return; 
    
    // Generate a new array of random integers between 5 and 70 and length 20
    const newArray = Array.from({ length: 20 }, () =>
      randomIntFromInterval(5, 70)
    );
    setArray(newArray);
    if (play) playSound();
  };

  // Function to handle sorting 
  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    
    if (selectedAlgo === "Bubble Sort") {
      BubbleSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); 
        setIsSorting(false);
      });
    }

    else if (selectedAlgo === "Insertion Sort") {
      InsertionSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); 
        setIsSorting(false);
      });
    } else if (selectedAlgo === "Selection Sort") {
      SelectionSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); 
        setIsSorting(false);
      });
    } else if (selectedAlgo === "Merge Sort") {
      MergeSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); 
        setIsSorting(false);
      });
    } else if (selectedAlgo === "Quick Sort") {
      QuickSort(array, animationSpeed, (sortedArray) => {
        console.log("Sort finished!");
        setArray([...sortedArray]); 
        setIsSorting(false);
      });
    }
    else {
      alert("Please select a sorting algorithm");
      setIsSorting(false);
      return;
    }
  };

  // Generate a new array when the component mounts
  
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