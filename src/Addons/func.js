export const rundomNum = (max, min = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const newArrayWithCount = (array, count) => {
  if (!count || array.length <= count) {
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

export const randomString = (maxNum = 20) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (text.length < maxNum) {
    text += possible[Math.floor(Math.random() * possible.length)];
  }

  return text;
};

export const fixArrayFiles = (obj) => {
  const newArray = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }
  return newArray;
};

export const fixTimer = (num) => {
  num = Math.sign(num) === -1 ? num * -1 : num;
  return String(num < 10 && num >= 0 ? "0" + num : num);
};

export const innerTimer = (date) => {
  let time = Date.now() - new Date(date);
  return {
    day: fixTimer(Math.floor(time / (1000 * 60 * 60 * 24))),
    hour: fixTimer(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    min: fixTimer(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
    sec: fixTimer(Math.floor((time % (1000 * 60)) / 1000)),
  };
};

export const dateParse = (date) => {
  return new Date(date).toUTCString();
};
