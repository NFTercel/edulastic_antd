import {
  multipleChoice,
  orderList,
  sortList,
  hotspot,
  classification,
  clozeText,
  clozeImageDragDrop,
  clozeImageDropDown,
  clozeImageText,
  shortText,
  math,
  tokenhighlight,
  clozeDragDrop,
  essayRichText,
  shading,
  choiceMatrix,
  charts,
  graph
} from "@edulastic/evaluators";

// clozeDropDown and ClozeText shares same logic
const evaluators = {
  multipleChoice,
  orderList,
  clozeText,
  clozeDropDown: clozeText,
  clozeImageDragDrop,
  clozeImageDropDown,
  clozeImageText,
  math,
  clozeDragDrop,
  highlightImage: essayRichText,
  shortText,
  essayRichText,
  essayPlainText: essayRichText,
  classification,
  choiceMatrix,
  matchList: sortList,
  sortList,
  line: charts,
  hotspot,
  tokenhighlight,
  shading,
  graph
};

export default evaluators;
