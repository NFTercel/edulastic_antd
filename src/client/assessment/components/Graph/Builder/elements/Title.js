import { calcMeasure, lineLabelCoord } from "../utils";
import { defaultTextParameters } from "../settings";

const renderTitle = (board, title) => {
  const [x, y] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const calcY = title.yMax - (y / 100) * title.position;
  const point = board.$board.create("point", [lineLabelCoord(title.xMin, title.xMax), calcY], {
    visible: false,
    fixed: true
  });
  point.elType = "title";
  point.setLabel(title.title);
  point.label.setAttribute({
    ...defaultTextParameters(),
    cssClass: "title",
    highlightCssClass: "title",
    visible: true
  });
  point.label.setPosition(window.JXG.COORDS_BY_USER, [board.$board.plainBB[0], calcY]);
  return point;
};

const updateTitle = (board, title) => {
  const oldTitle = board.elements.filter(element => element.elType === "title");
  board.$board.removeObject(oldTitle);
  board.elements = board.elements.filter(element => element.elType !== "title");
  board.elements.push(renderTitle(board, title));
};

export default {
  renderTitle,
  updateTitle
};
