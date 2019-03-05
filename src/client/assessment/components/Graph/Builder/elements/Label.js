import Input from "./Input";

const elWeight = {
  point: 1,
  polygon: 2,
  circle: 3,
  line: 4,
  curve: 5
};

const allowElements = ["polygon", "point", "circle", "line", "curve"];

/**
 * @param {array} elements
 */
function getElementUnderMouse(elements) {
  const filteredElements = elements
    .filter(el => ~allowElements.indexOf(el.elType))
    .sort((a, b) => elWeight[a.elType] - elWeight[b.elType]);
  return filteredElements[0];
}

function onHandler() {
  return board => {
    const currentElement = getElementUnderMouse(board.$board.downObjects);
    if (!currentElement || currentElement.getAttribute("fixed") === true) {
      return;
    }
    const hasLabel = currentElement.label && currentElement.label.plaintext;
    if (!hasLabel) {
      Input(currentElement).init();
    }
  };
}

export default {
  onHandler
};
