import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ArrayBar from './Components/ArrayBars/ArrayBar.jsx';

function App() {
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("Sorting Algorithm");

  const generateNewArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * (70 - 5 + 1)) + 5);
    setArray(newArray);
  };

  useEffect(() => {
    generateNewArray();
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

