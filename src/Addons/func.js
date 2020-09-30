export const rundomNum = (max, min = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const newArrayWithCount = (array, count) => {
  if (!count) {
    return array;
  }
  let newArray = [];
  for (let i = 0; i < count; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

export const fixedPrice = (price) => {
  return Number.parseFloat(price).toFixed(2);
};
