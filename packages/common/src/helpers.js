export const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || "Component";

const getPaginationInfo = ({ page, limit, count }) => ({
  from: (page - 1) * limit + 1,
  to: limit * page > count ? count : limit * page
});

const getNumeration = (index, type) => {
  const char = ALPHABET[index];

  if (!char) return index + 1;

  switch (type) {
    case "number":
      return index + 1;
    case "upper-alpha":
    case "uppercase":
      return char.toUpperCase();
    case "lower-alpha":
    case "lowercase":
      return char.toLowerCase();
    default:
      return index + 1;
  }
};

const isEmpty = str => {
  str = typeof str === "string" ? str.trim() : "";
  return str === "<p><br></p>" || str === "";
};

export default {
  getDisplayName,
  getPaginationInfo,
  getNumeration,
  isEmpty
};
