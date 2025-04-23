export const getBubbleSortAnimations = (array) => {
  const animations = [];
  const n = array.length;

  // Bubble sort logic
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      animations.push([j, j + 1, false, false, null]); // Compare
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, true, false, null]); // Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }

    // Mark final element as sorted
    animations.push([n - 1 - i, n - 1 - i, false, true, n - 1 - i]); // Final sorted element
  }

  return animations;

};

export default getBubbleSortAnimations