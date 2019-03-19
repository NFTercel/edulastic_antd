import { clone } from "lodash";
import { defaultTextParameters } from "../settings";
import { calcMeasure, checkMarksRenderSpace, getClosestTick } from "../utils";

const snapMark = (
  mark,
  point,
  xCoords,
  snapToTicks,
  ticksDistance,
  setValue,
  lineSettings,
  containerSettings,
  board
) => {
  mark.on("up", () => {
    const setCoords = window.JXG.COORDS_BY_USER;
    let x;
    let y;

    const axis = board.elements.filter(element => element.elType === "axis")[0];
    const ticks = axis.ticks
      .map(t => t.fixedTicks !== null && t.fixedTicks)
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue))
      .sort();
    const [markXMeasure, markYMeasure] = calcMeasure(51.5, 45, board);
    const [xMeasure, yMeasure] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
    const lineY = lineSettings.yMax - (yMeasure / 100) * lineSettings.position;
    const containerY = containerSettings.yMax - (yMeasure / 100) * containerSettings.position;

    if (point.Y() >= containerY - markYMeasure * 1.35 && point.X() < xCoords[0]) {
      y = lineY;
      x = getClosestTick(point.X(), ticks);
    } else if (point.Y() >= containerY - markYMeasure * 1.35 && point.X() > xCoords[1]) {
      y = lineY;
      x = getClosestTick(point.X(), ticks);
    } else if (point.Y() >= containerY - markYMeasure * 1.35 && point.X() < xCoords[1] && point.X() > xCoords[0]) {
      y = lineY;
      if (snapToTicks) {
        x = getClosestTick(point.X(), ticks);
      } else {
        x = point.X();
      }
    } else {
      y = point.Y();
      x = point.X();
    }

    if (point.Y() >= containerY - markYMeasure * 1.35) {
      mark.setAttribute({
        cssClass: "mark mounted",
        highlightCssClass: "mark mounted"
      });
    } else {
      mark.setAttribute({ cssClass: "mark", highlightCssClass: "mark" });
    }
    point.setPosition(setCoords, [x, y]);
    setValue();
  });
};

const onHandler = (
  board,
  coords,
  data,
  measure,
  xCoords,
  snapToTicks,
  ticksDistance,
  setValue,
  lineSettings,
  containerSettings
) => {
  const point = board.$board.create("point", coords, {
    name: "",
    visible: false
  });
  const mark = board.$board.create(
    "text",
    [coords[0] - measure[0], coords[1] + measure[1], data.text],
    defaultTextParameters()
  );
  const group = board.$board.create("group", [point, mark], { id: data.id });
  snapMark(mark, point, xCoords, snapToTicks, ticksDistance, setValue, lineSettings, containerSettings, board);
  return group;
};

const renderMarkAnswer = (board, config, measure) => {
  const point = board.$board.create("point", [config.position, config.y], {
    name: "",
    visible: false,
    fixed: true,
    frozen: true
  });
  point.setLabel(config.point);
  point.label.setPosition(window.JXG.COORDS_BY_USER, [config.position - measure[0], config.y + measure[1]]);
  point.label.setText(config.point);
  point.label.setAttribute({
    ...defaultTextParameters(),
    cssClass: "mark " + config.className + " mounted",
    highlightCssClass: "mark " + config.className + " mounted",
    visible: true
  });
  return point;
};

const findObjectInGroup = (group, type) => {
  for (const element in group.objects) {
    if (group.objects[element].point && group.objects[element].point.elType === type) {
      return group.objects[element].point;
    }
  }
};

const rerenderMark = (mark, board, graphParameters, settings, setValue, lineSettings, containerSettings) => {
  const oldPoint = findObjectInGroup(mark, "point");
  const oldMark = findObjectInGroup(mark, "text");
  const data = { id: mark.id, text: clone(oldMark.plaintext) };
  let oldCoords = [clone(oldPoint.coords.usrCoords[1]), clone(oldPoint.coords.usrCoords[2])];

  const [markXMeasure, markYMeasure] = calcMeasure(51.5, 45, board);
  const [xMeasure, yMeasure] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const containerY = containerSettings.yMax - (yMeasure / 100) * containerSettings.position;
  const lineY = lineSettings.yMax - (yMeasure / 100) * lineSettings.position;

  const axis = board.elements.filter(element => element.elType === "axis")[0];
  const ticks = axis.ticks.filter(t => t.fixedTicks !== null)[0];

  if (oldCoords[1] >= containerY - markYMeasure * 1.35) {
    oldCoords[1] = lineY;

    oldCoords[0] = getClosestTick(oldCoords[0], ticks.fixedTicks);
  } else {
    oldCoords = checkMarksRenderSpace(board, settings, containerSettings);
  }

  const newMark = onHandler(
    board,
    oldCoords,
    data,
    calcMeasure(51.5, 45, board),
    [graphParameters.xMin, graphParameters.xMax],
    settings.snapToTicks,
    settings.ticksDistance,
    setValue,
    lineSettings,
    containerSettings
  );
  const newPoint = findObjectInGroup(newMark, "point");
  const newLabel = findObjectInGroup(newMark, "text");

  if (newPoint.Y() >= containerY - markYMeasure * 1.35) {
    newLabel.setAttribute({
      cssClass: "mark mounted",
      highlightCssClass: "mark mounted"
    });
  } else {
    newLabel.setAttribute({ cssClass: "mark", highlightCssClass: "mark" });
  }

  board.elements.push(newMark);
};

const updateTextSize = (mark, fontSize) => {
  const text = findObjectInGroup(mark, "text");
  text.setAttribute({ fontSize });
};

const removeMark = (board, mark) => {
  const text = findObjectInGroup(mark, "text");
  const point = findObjectInGroup(mark, "point");
  board.$board.removeObject(text);
  board.$board.removeObject(point);
};

const renderMarksContainer = (board, xMin, xMax, containerSettings) => {
  const [xMeasure, yMeasure] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const containerY = containerSettings.yMax - (yMeasure / 100) * containerSettings.position;

  const polygonCoords = [[xMin, containerY], [xMin, -1.75], [xMax, -1.75], [xMax, containerY]];
  const polygon = board.$board.create("polygon", polygonCoords, {
    fixed: true,
    withLines: false,
    fillOpacity: 1,
    fillColor: "#efefef"
  });
  polygon.vertices.forEach(ancestor => ancestor.setAttribute({ visible: false }));
  return polygon;
};

const updateMarksContainer = (board, xMin, xMax, containerSettings) => {
  const oldBoard = board.elements.filter(element => element.elType === "polygon");
  board.$board.removeObject(oldBoard);
  board.elements = board.elements.filter(element => element.elType !== "polygon");
  board.elements.push(renderMarksContainer(board, xMin, xMax, containerSettings));
};

const updateText = (oldText, newText) => oldText.setText(newText);

const checkForTextUpdate = (marks, elements) => {
  marks.forEach(mark => {
    elements.forEach(element => {
      if (element.id === mark.id) {
        const oldText = findObjectInGroup(element, "text");

        if (oldText.htmlStr !== mark.text) {
          updateText(oldText, mark.text);
        }
      }
    });
  });
};

const swapCoordinates = (swappedMarks, board, containerSettings) => {
  const newPositions = swappedMarks.map(swappedMark => {
    const oldObject = board.elements.find(element => element.id === swappedMark.itemToSwap);
    const oldPoint = findObjectInGroup(oldObject, "point");

    const newObject = board.elements.find(element => element.id === swappedMark.currentElement);
    const newPoint = findObjectInGroup(newObject, "point");
    const newMark = findObjectInGroup(newObject, "text");

    return {
      newCoords: clone(oldPoint.coords.usrCoords),
      oldCoords: clone(newPoint.coords.usrCoords),
      mark: newMark,
      point: newPoint
    };
  });

  const [markXMeasure, markYMeasure] = calcMeasure(51.5, 45, board);
  const [xMeasure, yMeasure] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const containerY = containerSettings.yMax - (yMeasure / 100) * containerSettings.position;

  newPositions.forEach(group => {
    group.point.setPositionDirectly(window.JXG.COORDS_BY_USER, group.newCoords, group.oldCoords);

    if (group.point.Y() >= containerY - markYMeasure * 1.35) {
      group.mark.setAttribute({
        cssClass: "mark mounted",
        highlightCssClass: "mark mounted"
      });
    } else {
      group.mark.setAttribute({ cssClass: "mark", highlightCssClass: "mark" });
    }
  });
};

const checkForSwap = (marks, oldMarks, board, containerSettings) => {
  const swappedMarks = [];

  oldMarks.forEach((oldMark, index) => {
    if (oldMark.id !== marks[index].id) {
      marks.forEach((mark, i) => {
        if (oldMark.id === mark.id) {
          swappedMarks.push({
            currentElement: oldMark.id,
            itemToSwap: oldMarks[i].id
          });
        }
      });
    }
  });

  if (swappedMarks.length > 0) {
    swapCoordinates(swappedMarks, board, containerSettings);
  }
};

const checkForUpdate = (marks, elements, board, oldMarks, containerSettings) => {
  checkForTextUpdate(marks, elements);
  checkForSwap(marks, oldMarks, board, containerSettings);
  board.$board.fullUpdate();
};

const getConfig = group => {
  const point = findObjectInGroup(group, "point");
  const text = findObjectInGroup(group, "text");

  return {
    position: point.X(),
    y: point.Y(),
    point: text.htmlStr,
    id: group.id
  };
};

export default {
  onHandler,
  renderMarksContainer,
  updateMarksContainer,
  updateText,
  updateTextSize,
  swapCoordinates,
  findObjectInGroup,
  checkForTextUpdate,
  checkForSwap,
  checkForUpdate,
  removeMark,
  rerenderMark,
  getConfig,
  renderMarkAnswer
};
