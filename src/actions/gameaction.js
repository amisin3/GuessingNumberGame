export const state = {
  number: NaN,
};

export const generateRandomNumber = (endNumber) => {
  var randomNumber = Math.floor(Math.random() * endNumber + 1);
  state.number = randomNumber;
};

export const getRandomNumber = () => {
  return state.number;
};
