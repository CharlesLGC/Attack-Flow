const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  let words = str.split('_');

  words = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return words.join(' ');
};

export default capitalizeFirstLetter;
