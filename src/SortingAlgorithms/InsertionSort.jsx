// InsertionSort.jsx
import { 
  changeBackgroundColor, 
  changeBoxShadow, 
  swapBars, 
  resetBarStyleDefault, 
  disableButtons, 
  enableButtons, 
  playCompletedSoundEffect 
} from "../Helper.js";

// Generate animation steps for insertion sort
const getInsertionSortAnimations = (array) => {
  const animations = [];
  const arrayCopy = [...array];
  const n = arrayCopy.length;

  for (let i = 1; i < n; i++) {
    // Highlight the current element to be inserted
    animations.push([i, i, false, false, null, "current"]);
    
    let j = i;
    while (j > 0 && arrayCopy[j - 1] > arrayCopy[j]) {
      // Compare elements
      animations.push([j, j - 1, false, false, null, "compare"]);
      
      // Swap elements
      animations.push([j, j - 1, true, false, null, "swap"]);
      
      // Perform swap in our array copy
      [arrayCopy[j], arrayCopy[j - 1]] = [arrayCopy[j - 1], arrayCopy[j]];
      
      j--;
    }
    
    // If no more swaps needed, mark the element as placed
    if (j > 0 || j === i) {
      animations.push([j, j, false, false, null, "placed"]);
    }
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    animations.push([i, i, false, true, i, "final"]);
  }
  
  return animations;
};

const InsertionSort = async (array, animationSpeed, callback) => {
  // Make a working copy of the array
  const workingArray = [...array];
  
  // Disable interface controls during sorting
  disableButtons();
  console.log("Starting Insertion Sort animation");
  
  try {
    // Get animation sequence
    const animations = getInsertionSortAnimations(workingArray);
    console.log(`Generated ${animations.length} animation steps`);
    
    // Play each animation step
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, doSwap, isFinalElement, finalIndex, step] = animations[i];
      
      if (step === "current") {
        // Highlight the current element to be inserted
        changeBackgroundColor(index1, "rgba(255,105,180,0.9)"); // Hot pink
      } else if (step === "compare") {
        // Highlight elements being compared
        changeBackgroundColor(index1, "rgba(255,165,0,0.9)"); // Orange
        changeBackgroundColor(index2, "rgba(255,165,0,0.9)"); // Orange
      } else if (step === "swap") {
        // Highlight swap
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)"); // Light green
        changeBackgroundColor(index2, "rgba(144,238,144,0.9)"); // Light green
        
        // Perform the swap visually
        swapBars(index1, index2);
        
        // Also update our working array
        [workingArray[index1], workingArray[index2]] = 
          [workingArray[index2], workingArray[index1]];
      } else if (step === "placed") {
        // Highlight the placed element
        changeBackgroundColor(index1, "rgba(173,216,230,0.9)"); // Light blue
      }
      
      // Delay to visualize the current step
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      // Reset colors after step unless it's the final marking
      if (step !== "final" && !isFinalElement) {
        changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
        changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        
        if (step === "compare" || step === "swap") {
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
    console.error("Error during insertion sort animation:", error);
  } finally {
    // Make sure buttons are re-enabled
    setTimeout(() => {
      enableButtons();
    }, 500);
  }
};

export default InsertionSort;