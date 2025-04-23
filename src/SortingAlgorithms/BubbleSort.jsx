import { 
  changeBackgroundColor, 
  changeBoxShadow, 
  swapBars, 
  resetBarStyleDefault, 
  disableButtons, 
  enableButtons, 
  playCompletedSoundEffect 
} from "../Helper.js";

// Create the animation steps for bubble sort
const getBubbleSortAnimations = (array) => {
  const animations = [];
  const arrayCopy = [...array];
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare elements
      animations.push([j, j + 1, false, false, null]);
      
      // If elements need to be swapped
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        animations.push([j, j + 1, true, false, null]);
        [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
      }
    }
    
    // Mark element in its final position
    animations.push([n - i - 1, n - i - 1, false, true, n - i - 1]);
  }
  
  // Mark the first element as sorted as well
  animations.push([0, 0, false, true, 0]);
  
  return animations;
};

const BubbleSort = async (array, animationSpeed, callback) => {
  // Make a working copy of the array
  const workingArray = [...array];
  
  // Disable interface controls during sorting
  disableButtons();
  console.log("Starting Bubble Sort animation");
  
  try {
    // Get animation sequence
    const animations = getBubbleSortAnimations(workingArray);
    console.log(`Generated ${animations.length} animation steps`);
    
    // Play each animation step
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, doSwap, isFinalElement, finalIndex] = animations[i];
      
      // Highlight elements being compared
      changeBackgroundColor(index1, "rgba(255,165,0,0.9)");
      changeBackgroundColor(index2, "rgba(255,165,0,0.9)");
      
      // If swap is needed
      if (doSwap) {
        console.log(`Swapping elements at indices ${index1} and ${index2}`);
        
        // Highlight swap
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)");
        changeBackgroundColor(index2, "rgba(144,238,144,0.9)");
        
        // Perform the swap visually
        swapBars(index1, index2);
        
        // Also update our working array
        [workingArray[index1], workingArray[index2]] = 
          [workingArray[index2], workingArray[index1]];
      }
      
      // Delay to visualize the current step
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      // Reset colors after comparison/swap
      if (!isFinalElement) {
        changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
        changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        changeBackgroundColor(index2, "rgba(225, 0, 120, 0.6)");
        changeBoxShadow(index2, "5px 5px 50px 5px rgba(225,0,120,0.2)");
      }
      
      // Mark final position element with special color
      if (isFinalElement && finalIndex !== null) {
        console.log(`Marking element ${finalIndex} as sorted`);
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
    console.error("Error during bubble sort animation:", error);
  } finally {
    // Make sure buttons are re-enabled
    setTimeout(() => {
      enableButtons();
    }, 500);
  }
};

export default BubbleSort;