export const generateDiscussionID = () => {
  // Generate a 5 digit id composed of numbers and letters, all uppercase
  return Math.random().toString(36).slice(2, 7).toUpperCase();
};
