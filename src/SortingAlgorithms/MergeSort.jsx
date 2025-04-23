// MergeSort.jsx
import { 
  changeBackgroundColor, 
  changeBoxShadow, 
  resetBarStyleDefault, 
  disableButtons, 
  enableButtons, 
  playCompletedSoundEffect 
} from "../Helper.js";

// Custom function to update bar heights directly (since merge sort doesn't swap)
const updateBarHeight = (barIndex, newHeight, maxValue) => {
  const bars = document.querySelectorAll('.bar');
  if (bars[barIndex]) {
    const percentage = (newHeight / maxValue) * 70;
    const height = `${percentage}vh`;
    
    // Update all sides of the bar
    const colorBars = bars[barIndex].querySelectorAll('.color-bar');
    colorBars.forEach(bar => {
      bar.style.height = height;
    });
  }
};

// Generate animation steps for merge sort
const getMergeSortAnimations = (array) => {
  const animations = [];
  const arrayCopy = [...array];
  const tempArray = [...array];
  const maxValue = Math.max(...array);
  
  function mergeSortHelper(arr, temp, left, right) {
    if (left >= right) return;
    
    const middle = Math.floor((left + right) / 2);
    
    // Sort first and second halves
    mergeSortHelper(arr, temp, left, middle);
    mergeSortHelper(arr, temp, middle + 1, right);
    
    // Merge the sorted halves
    merge(arr, temp, left, middle, right);
  }
  
  function merge(arr, temp, left, middle, right) {
    // Highlight the subarray being merged
    for (let i = left; i <= right; i++) {
      animations.push([i, null, false, false, null, "subarray", arr[i], maxValue]);
    }
    
    // Copy data to temp arrays
    for (let i = left; i <= right; i++) {
      temp[i] = arr[i];
    }
    
    let i = left; // Initial index of first subarray
    let j = middle + 1; // Initial index of second subarray
    let k = left; // Initial index of merged subarray
    
    // Merge the temp arrays back
    while (i <= middle && j <= right) {
      // Compare elements from both subarrays
      animations.push([i, j, false, false, null, "compare", null, null]);
      
      // Select the smaller element
      if (temp[i] <= temp[j]) {
        // Element from first subarray is smaller
        animations.push([k, null, false, false, null, "overwrite", temp[i], maxValue]);
        arr[k] = temp[i];
        i++;
      } else {
        // Element from second subarray is smaller
        animations.push([k, null, false, false, null, "overwrite", temp[j], maxValue]);
        arr[k] = temp[j];
        j++;
      }
      k++;
    }
    
    // Copy the remaining elements of first subarray
    while (i <= middle) {
      animations.push([k, null, false, false, null, "overwrite", temp[i], maxValue]);
      arr[k] = temp[i];
      i++;
      k++;
    }
    
    // Copy the remaining elements of second subarray
    while (j <= right) {
      animations.push([k, null, false, false, null, "overwrite", temp[j], maxValue]);
      arr[k] = temp[j];
      j++;
      k++;
    }
    
    // Mark the entire merged subarray as sorted temporarily
    for (let i = left; i <= right; i++) {
      animations.push([i, null, false, false, null, "sorted-segment", null, null]);
    }
  }
  
  // Start the merge sort
  mergeSortHelper(arrayCopy, tempArray, 0, arrayCopy.length - 1);
  
  // Mark all elements as finally sorted
  for (let i = 0; i < arrayCopy.length; i++) {
    animations.push([i, i, false, true, i, "final", null, null]);
  }
  
  return animations;
};

const MergeSort = async (array, animationSpeed, callback) => {
  // Make a working copy of the array
  const workingArray = [...array];
  const maxValue = Math.max(...workingArray);
  
  // Disable interface controls during sorting
  disableButtons();
  console.log("Starting Merge Sort animation");
  
  try {
    // Get animation sequence
    const animations = getMergeSortAnimations(workingArray);
    console.log(`Generated ${animations.length} animation steps`);
    
    // Play each animation step
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, doSwap, isFinalElement, finalIndex, step, newHeight, maxVal] = animations[i];
      
      if (step === "subarray") {
        // Highlight the current subarray being processed
        changeBackgroundColor(index1, "rgba(255,105,180,0.9)"); // Hot pink
      } else if (step === "compare") {
        // Highlight elements being compared
        changeBackgroundColor(index1, "rgba(255,165,0,0.9)"); // Orange
        changeBackgroundColor(index2, "rgba(255,165,0,0.9)"); // Orange
      } else if (step === "overwrite") {
        // Highlight and update the bar being overwritten
        changeBackgroundColor(index1, "rgba(144,238,144,0.9)"); // Light green
        
        // Update the height of the bar (this is key for merge sort visualization)
        updateBarHeight(index1, newHeight, maxVal);
        
        // Update our working array
        workingArray[index1] = newHeight;
      } else if (step === "sorted-segment") {
        // Temporarily mark merged segment
        changeBackgroundColor(index1, "rgba(100,149,237,0.7)"); // Cornflower blue
      }
      
      // Delay to visualize the current step
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      // Reset colors after step unless it's final marking
      if (!isFinalElement && step !== "final") {
        if (step === "subarray" || step === "overwrite" || step === "sorted-segment") {
          changeBackgroundColor(index1, "rgba(225, 0, 120, 0.6)");
          changeBoxShadow(index1, "5px 5px 50px 5px rgba(225,0,120,0.2)");
        } else if (step === "compare") {
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
    console.error("Error during merge sort animation:", error);
  } finally {
    // Make sure buttons are re-enabled
    setTimeout(() => {
      enableButtons();
    }, 500);
  }
};

export default MergeSort;