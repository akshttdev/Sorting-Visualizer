// QuickSort.jsx
import { 
  changeBackgroundColor, 
  changeBoxShadow, 
  swapBars, 
  resetBarStyleDefault, 
  disableButtons, 
  enableButtons, 
  playCompletedSoundEffect 
} from "../Helper.js";

// Generate animation steps for quick sort
const getQuickSortAnimations = (array) => {
  const animations = [];
  const arrayCopy = [...array];
  
  // Quick sort helper function
  function quickSort(arr, low, high) {
    if (low < high) {
      // Get partition index
      const partitionIndex = partition(arr, low, high);
      
      // Mark the pivot as in its correct position
      animations.push([partitionIndex, partitionIndex, false, true, partitionIndex, "pivot"]);
      
      // Sort elements before and after partition
      quickSort(arr, low, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, high);
    } else if (low === high) {
      // Single element is automatically sorted
      animations.push([low, low, false, true, low, "single"]);
    }
  }
  
  // Partition function
  function partition(arr, low, high) {
    // Select pivot (using high as pivot)
    const pivot = arr[high];
    animations.push([high, high, false, false, null, "pivot-selected"]);
    
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      animations.push([j, high, false, false, null, "compare"]);
      
      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++;
        
        if (i !== j) {
          // Swap arr[i] and arr[j]
          animations.push([i, j, true, false, null, "swap"]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        } else {
          // Element is already in correct position
          animations.push([i, i, false, false, null, "already-placed"]);
        }
      }
    }
    
    // Swap arr[i+1] and arr[high] (put pivot in correct position)
    if (i + 1 !== high) {
      animations.push([i + 1, high, true, false, null, "swap-pivot"]);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    }
    
    return i + 1;
  }
  
  // Start the quick sort
  quickSort(arrayCopy, 0, arrayCopy.length - 1);
  
  // Mark all elements as finally sorted
  for (let i = 0; i < arrayCopy.length; i++) {
    animations.push([i, i, false, true, i, "final"]);
  }
  
  return animations;
};

const QuickSort = async (array, animationSpeed, callback) => {
  // Make a working copy of the array
  const workingArray = [...array];
  
  // Disable interface controls during sorting
  disableButtons();
  console.log("Starting Quick Sort animation");
  
  try {
    // Get animation sequence
    const animations = getQuickSortAnimations(workingArray);
    console.log(`Generated ${animations.length} animation steps`);
    
    // Play each animation step
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, doSwap, isFinalElement, finalIndex, step] = animations[i];
      
      if (step === "pivot-selected") {
        // Highlight the pivot
        changeBackgroundColor(index1, "rgba(255,0,0,0.7)"); // Red
      } else if (step === "compare") {
        // Highlight elements being compared with pivot
        changeBackgroundColor(index1, "rgba(255,165,0,0.9)"); // Orange
        // Keep pivot highlighted
        changeBackgroundColor(index2, "rgba(255,0,0,0.7)"); // Red
      } else if (step === "swap") {
        // Highlight swap
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)"); // Light green
        changeBackgroundColor(index2, "rgba(144,238,144,0.9)"); // Light green
        
        // Perform the swap visually
        swapBars(index1, index2);
        
        // Also update our working array
        [workingArray[index1], workingArray[index2]] = 
          [workingArray[index2], workingArray[index1]];
      } else if (step === "already-placed") {
        // Element already in correct position relative to pivot
        changeBackgroundColor(index1, "rgba(173,216,230,0.9)"); // Light blue
      } else if (step === "swap-pivot") {
        // Highlight swap with pivot
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)"); // Light green
        changeBackgroundColor(index2, "rgba(255,0,0,0.7)"); // Keep red for pivot
        
        // Perform the swap visually
        swapBars(index1, index2);
        
        // Also update our working array
        [workingArray[index1], workingArray[index2]] = 
          [workingArray[index2], workingArray[index1]];
      } else if (step === "pivot" || step === "single") {
        // Pivot is now in its final position
        changeBackgroundColor(index1, "rgba(75,0,130,0.7)"); // Indigo
      }
      
      // Delay to visualize the current step
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      // Reset colors after step unless it's final marking
      if (!isFinalElement) {
        if (step === "compare") {
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        } else if (step === "swap" || step === "already-placed") {
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
          
          if (step === "swap") {
            changeBackgroundColor(index2, "rgba(225, 0, 120, 0.6)");
            changeBoxShadow(index2, "5px 5px 50px 5px rgba(225,0,120,0.2)");
          }
        } else if (step === "swap-pivot") {
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
          changeBackgroundColor(index2, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index2, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        }
      }
      
      // Mark final position element with special color
      if (isFinalElement && finalIndex !== null && step === "final") {
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
    console.error("Error during quick sort animation:", error);
  } finally {
    // Make sure buttons are re-enabled
    setTimeout(() => {
      enableButtons();
    }, 500);
  }
};

export default QuickSort;