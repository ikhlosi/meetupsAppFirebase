// Takes string as parameter. Returns string
const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default capitalizeFirstLetter;
