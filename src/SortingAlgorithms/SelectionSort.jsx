// SelectionSort.jsx
import { 
  changeBackgroundColor, 
  changeBoxShadow, 
  swapBars, 
  resetBarStyleDefault, 
  disableButtons, 
  enableButtons, 
  playCompletedSoundEffect 
} from "../Helper.js";

// Generate animation steps for selection sort
const getSelectionSortAnimations = (array) => {
  const animations = [];
  const arrayCopy = [...array];
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    // Mark current position
    animations.push([i, i, false, false, null, "position"]);
    
    let minIndex = i;
    
    // Find the minimum element
    for (let j = i + 1; j < n; j++) {
      // Compare with current minimum
      animations.push([j, minIndex, false, false, null, "compare"]);
      
      // Update minimum if needed
      if (arrayCopy[j] < arrayCopy[minIndex]) {
        if (minIndex !== i) {
          // Reset previous minimum
          animations.push([minIndex, minIndex, false, false, null, "reset"]);
        }
        minIndex = j;
        // Highlight new minimum
        animations.push([minIndex, minIndex, false, false, null, "minimum"]);
      }
    }
    
    // If minIndex is not i, swap
    if (minIndex !== i) {
      // Highlight the swap
      animations.push([i, minIndex, true, false, null, "swap"]);
      
      // Perform swap in array
      [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
    }
    
    // Mark element as sorted
    animations.push([i, i, false, true, i, "final"]);
  }
  
  // Mark the last element as sorted
  animations.push([n-1, n-1, false, true, n-1, "final"]);
  
  return animations;
};

const SelectionSort = async (array, animationSpeed, callback) => {
  // Make a working copy of the array
  const workingArray = [...array];
  
  // Disable interface controls during sorting
  disableButtons();
  console.log("Starting Selection Sort animation");
  
  try {
    // Get animation sequence
    const animations = getSelectionSortAnimations(workingArray);
    console.log(`Generated ${animations.length} animation steps`);
    
    // Play each animation step
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, doSwap, isFinalElement, finalIndex, step] = animations[i];
      
      if (step === "position") {
        // Highlight the current position
        changeBackgroundColor(index1, "rgba(255,105,180,0.9)"); // Hot pink
      } else if (step === "compare") {
        // Highlight elements being compared
        changeBackgroundColor(index1, "rgba(255,165,0,0.9)"); // Orange
        // Keep the current min highlighted differently
        if (index2 !== index1) {
          changeBackgroundColor(index2, "rgba(100,149,237,0.9)"); // Cornflower blue
        }
      } else if (step === "minimum") {
        // Highlight new minimum
        changeBackgroundColor(index1, "rgba(100,149,237,0.9)"); // Cornflower blue
      } else if (step === "reset") {
        // Reset previous minimum marker
        changeBackgroundColor(index1, "rgba(225,0,120,0.6)"); // Default color
      } else if (step === "swap") {
        // Highlight swap
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)"); // Light green
        changeBackgroundColor(index2, "rgba(144,238,144,0.9)"); // Light green
        
        // Perform the swap visually
        swapBars(index1, index2);
        
        // Also update our working array
        [workingArray[index1], workingArray[index2]] = 
          [workingArray[index2], workingArray[index1]];
      }
      
      // Delay to visualize the current step
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      // Reset colors after step unless it's the final marking
      if (step !== "final" && !isFinalElement) {
        if (step === "compare") {
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        } else if (step === "swap") {
          // Reset both swap elements
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
          changeBackgroundColor(index2, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index2, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        }
      }
      
      // Mark final position element with special color
      if (isFinalElement && finalIndex !== null) {
        changeBackgroundColor(finalIndex, "rgba(0, 164, 86, 0.6)");
        changeBoxShadow(finalIndex, "5px 5px 50px 5px rgba(0,164,86,0.2)");
      }
    }
    
    console.log("Animation complete!");
    
    // Play sound effect to indicate completion
    playCompletedSoundEffect();
    
    // Reset bar styles after a delay
    resetBarStyleDefault(workingArray, 500);
    
    // If a callback was provided, call it with the sorted array
    if (typeof callback === 'function') {
      callback(workingArray);
    }
  } catch (error) {
    console.error("Error during selection sort animation:", error);
  } finally {
    // Make sure buttons are re-enabled
    setTimeout(() => {
      enableButtons();
    }, 500);
  }
};

export default SelectionSort;