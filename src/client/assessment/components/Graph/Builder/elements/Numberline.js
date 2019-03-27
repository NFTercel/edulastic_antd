import { union, isString, uniq } from "lodash";
import { calcMeasure } from "../utils";
import { RENDERING_BASE } from "../config/constants";
import { getFraction, toFractionHTML, roundFracIfPossible } from "../fraction";

import "../../common/Fraction.css";

function createMinorTicks(minorCount, majorTicksSorted) {
  const minorTicks = [];
  const segmentsCount = majorTicksSorted.length - 1;
  for (let i = 0; i < segmentsCount; i++) {
    let a = majorTicksSorted[i];
    const b = majorTicksSorted[i + 1];
    const seg = Math.abs(a - b);
    const dist = seg / (minorCount + 1);
    for (let j = 0; j < minorCount; j++) {
      a += dist;
      minorTicks.push(a);
    }
  }
  return minorTicks;
}

const onHandler = (board, xMin, xMax, settings, lineSettings) => {
  const [x, y] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const calcY = lineSettings.yMax - (y / 100) * lineSettings.position;
  const axisPadding = ((-xMin + xMax) / 100) * 3.5;

  const newAxis = board.$board.create(
    "axis",
    [
      [settings.showMin ? xMin - axisPadding : xMin + axisPadding, calcY],
      [settings.showMax ? xMax + axisPadding : xMax - axisPadding, calcY]
    ],
    {
      straightFirst: false,
      straightLast: false,
      firstArrow: settings.leftArrow === true ? { size: 10 } : false,
      lastArrow: settings.rightArrow === true ? { size: 10 } : false,
      strokeColor: "#d6d6d6",
      highlightStrokeColor: "#d6d6d6",
      drawZero: false
    }
  );

  let { ticksDistance } = settings;
  const { fractionsFormat, showLabels, labelShowMax, labelShowMin, minorTicks, labelsFrequency } = settings;
  let fracTicksDistance = null;
  if (isString(ticksDistance) && ticksDistance.indexOf("/") !== -1) {
    fracTicksDistance = getFraction(ticksDistance);
    ticksDistance = fracTicksDistance ? fracTicksDistance.decim : NaN;
  } else {
    ticksDistance = parseFloat(ticksDistance);
  }

  newAxis.removeAllTicks();
  /**
   * Major ticks
   * */
  let ticks = [];
  if (ticksDistance === 0) {
    ticks.push(xMin);
    ticks.push(xMax);
  } else if (settings.renderingBase === RENDERING_BASE.ZERO_BASED) {
    ticks.push(xMin);
    let startPoint = 0;
    if (xMin > 0) {
      startPoint = xMin;
      let i = startPoint;
      while (i < xMax) {
        ticks.push(i);
        i += ticksDistance;
      }
    } else if (xMax < 0) {
      do {
        startPoint -= ticksDistance;
      } while (startPoint > xMax);

      let i = startPoint;
      while (i > xMin) {
        ticks.push(i);
        i -= ticksDistance;
      }
    } else {
      // startPoint === 0
      let i = startPoint;
      while (i < xMax) {
        ticks.push(i);
        i += ticksDistance;
      }
      i = startPoint;
      i -= ticksDistance;
      while (i > xMin) {
        ticks.push(i);
        i -= ticksDistance;
      }
    }
    ticks.push(xMax);
  } else if (settings.renderingBase === RENDERING_BASE.LINE_MINIMUM_VALUE) {
    let i = xMin;
    while (i < xMax) {
      ticks.push(i);
      i += ticksDistance;
    }
    ticks.push(xMax);
  }

  /**
   * Minor ticks
   * */
  if (minorTicks) {
    const minors = createMinorTicks(minorTicks, ticks.sort((a, b) => a - b));
    board.$board.create("ticks", [newAxis, minors], {
      strokeColor: "#d6d6d6",
      highlightStrokeColor: "#d6d6d6",
      majorHeight: 10
    });
  }
  /**
   * Specific points
   * */
  if (isString(settings.specificPoints)) {
    const tickArr = settings.specificPoints
      .split(",")
      .map(s => parseFloat(s))
      .filter(num => isNaN(num) === false);
    ticks = union(ticks, tickArr);
  }

  /**
   * Ticks labels
   * */
  let labels = ticks.map(t => {
    if (showLabels) {
      let res = null;
      if (Number.isInteger(t)) {
        res = t;
      } else if (t >= 0) {
        res = Math.floor(t * 100) / 100;
      } else {
        res = Math.ceil(t * 100) / 100;
      }
      return res;
    } else {
      const tickArr = settings.specificPoints
        .split(",")
        .map(s => parseFloat(s))
        .filter(num => isNaN(num) === false);

      if (t === xMin || t === xMax || tickArr.some(specTick => specTick === t)) {
        let res = null;
        if (Number.isInteger(t)) {
          res = t;
        } else if (t >= 0) {
          res = Math.floor(t * 100) / 100;
        } else {
          res = Math.ceil(t * 100) / 100;
        }
        return res;
      } else {
        return "";
      }
    }
  });

  if (fracTicksDistance) {
    // round nums to remove dublicates
    ticks = ticks.map(t => roundFracIfPossible(t, fracTicksDistance.denominator));
    ticks = uniq(ticks);

    labels = labels.map(t => toFractionHTML(t, fracTicksDistance.denominator, fractionsFormat));
  }

  if (labelsFrequency) {
    labels.forEach((label, index) => {
      if (index % labelsFrequency === 0) {
      } else if (index !== 0 && index !== labels.length - 1) {
        labels[index] = "";
      }
    });
  }

  board.$board.create("ticks", [newAxis, ticks], {
    straightFirst: false,
    straightLast: false,
    firstArrow: settings.leftArrow === true ? { size: 10 } : false,
    lastArrow: settings.rightArrow === true ? { size: 10 } : false,
    strokeColor: "#d6d6d6",
    highlightStrokeColor: "#d6d6d6",
    visible: true,
    anchor: "middle",
    insertTicks: false,
    drawZero: false,
    tickEndings: [1, 1],
    majorHeight: settings.showTicks ? 25 : 0,
    minorHeight: settings.showTicks ? 15 : 0,
    drawLabels: true,
    ticksDistance,
    label: {
      offset: [0, -15],
      anchorX: "middle",
      anchorY: "top",
      fontSize: settings.fontSize,
      display: "html",
      cssClass: "numberline-fraction",
      highlightCssClass: "numberline-fraction"
    },
    labels
  });

  if (!showLabels) {
    newAxis.ticks[1].labels.forEach((label, index) => {
      if (parseInt(label.htmlStr, 10) === 0 && index !== 0) {
        board.$board.removeObject(newAxis.ticks[1].labels[index]);
      }
    });
  }

  if (!labelShowMin) {
    newAxis.ticks[1].labels.forEach((label, index) => {
      let compareValue = label.htmlStr;

      if (compareValue[0] === "−") {
        compareValue = "-" + compareValue.substr(1, compareValue.length - 1);
      }

      if (parseInt(compareValue, 10) === xMin) {
        board.$board.removeObject(newAxis.ticks[1].labels[index]);
      }
    });
  }

  if (!labelShowMax) {
    newAxis.ticks[1].labels.forEach((label, index) => {
      let compareValue = label.htmlStr;

      if (compareValue[0] === "−") {
        compareValue = "-" + compareValue.substr(1, compareValue.length - 1);
      }

      if (parseInt(compareValue, 10) === xMax) {
        board.$board.removeObject(newAxis.ticks[1].labels[index]);
      }
    });
  }

  return newAxis;
};

const updateCoords = (board, xMin, xMax, settings, lineSettings) => {
  const oldAxis = board.elements.filter(element => element.elType === "axis" || element.elType === "arrow");
  board.$board.removeObject(oldAxis);
  board.elements = board.elements
    .filter(element => element.elType !== "axis")
    .filter(element => element.elType !== "arrow");
  const newAxis = onHandler(board, xMin, xMax, settings, lineSettings);
  board.elements.push(newAxis);
  board.$board.fullUpdate();
};

export default {
  onHandler,
  updateCoords
};
