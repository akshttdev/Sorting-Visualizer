import CompletedEffect from "./Sounds/CompletedEffect.mp3";

// ## Fetch all sides of a bar by index - NOW DYNAMIC
export const getBarStyle = (index) => {
  // Dynamically get elements each time function is called
  const rightBars = document.querySelectorAll(".right-color-bar");
  const leftBars = document.querySelectorAll(".left-color-bar");
  const frontBars = document.querySelectorAll(".front-color-bar");
  const backBars = document.querySelectorAll(".back-color-bar");
  const bottomBars = document.querySelectorAll(".bottom");
  
  return [
    rightBars[index]?.style,
    leftBars[index]?.style,
    backBars[index]?.style,
    frontBars[index]?.style,
    bottomBars[index]?.style,
  ];
};

// ## Change background color for all sides
export const changeBackgroundColor = (index, color) => {
  getBarStyle(index).forEach(style => {
    if (style) style.backgroundColor = color;
  });
};

// ## Change box-shadow for all sides
export const changeBoxShadow = (index, shadow) => {
  getBarStyle(index).forEach(style => {
    if (style) style.boxShadow = shadow;
  });
};

// ## Swap heights of two bars
// ## Swap heights of two bars
export const swapBars = (index1, index2) => {
  const styles1 = getBarStyle(index1);
  const styles2 = getBarStyle(index2);

  for (let i = 0; i < 4; i++) {
    if (!styles1[i] || !styles2[i]) continue;

    // Get the heights before swapping
    const height1 = styles1[i].height;
    const height2 = styles2[i].height;
    
    // Swap the heights
    styles1[i].height = height2;
    styles2[i].height = height1;

    // Calculate the correct vertical positions based on the new heights
    // This ensures bars sit on the bottom line properly
    const h1Value = parseFloat(height2);
    const h2Value = parseFloat(height1);
    
    // Only set transforms if we have valid heights
    if (!isNaN(h1Value)) {
      // The bar should be pushed up from the bottom by its height amount
      styles1[i].transformOrigin = "bottom";
      styles1[i].bottom = "0";
    }
    
    if (!isNaN(h2Value)) {
      // The bar should be pushed up from the bottom by its height amount
      styles2[i].transformOrigin = "bottom";  
      styles2[i].bottom = "0";
    }
  }
};

// ## Reset all bars to default style
export const resetBarStyleDefault = (array, animationSpeed) => {
  setTimeout(() => {
    array.forEach((_, index) => {
      changeBackgroundColor(index, "rgba(225, 0, 120, 0.5)");
      changeBoxShadow(index, "5px 5px 50px 5px rgba(225, 0, 120, 0.2)");
    });
  }, animationSpeed);
};

// ## Get random int in [min, max]
export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// ## Button toggles
export const enableButtons = () => {
  // Use a more generic approach to enable buttons
  document.querySelectorAll("button").forEach(button => {
    button.disabled = false;
  });
  
  // Enable specific buttons by ID if they exist
  ["reset", "bubbleSortButton", "selectionSortButton", "insertionSortButton"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
  });
  
  const slider = document.getElementById("range-slider");
  if (slider) {
    slider.style.opacity = 1;
    slider.style.visibility = "visible";
  }
};

export const disableButtons = () => {
  // Use a more generic approach to disable buttons
  document.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });
  
  // Disable specific buttons by ID if they exist
  ["reset", "bubbleSortButton", "selectionSortButton", "insertionSortButton"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
  
  const slider = document.getElementById("range-slider");
  if (slider) {
    slider.style.opacity = 0;
    slider.style.visibility = "hidden";
  }
};

// ## Play audio
export const playAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.play().catch(() => {});
};

// ## Play completion sound
export const playCompletedSoundEffect = () => playAudio(CompletedEffect);