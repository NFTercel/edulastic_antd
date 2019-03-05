export { default as CONSTANT } from "./constants";
export { default as Colors } from "./colors";

const quadrantsDefaultConfig = {
  // X min, X max, Y min, Y max
  boundingbox: [-2.4, 4.4, 5.4, -10.4],
  axis: true,
  showCopyright: false,
  showNavigation: false,
  grid: {
    strokeWidth: 1,
    // X distance
    gridX: 1,
    // Y distance
    gridY: 1
  },
  defaultaxes: {
    x: {
      name: "",
      withLabel: false,
      strokeColor: "#00b0ff",
      highlightStrokeColor: "#00b0ff",
      strokeWidth: 2,
      label: {
        position: "rt",
        anchorX: "right",
        anchorY: "bottom"
      },
      ticks: {
        drawLabels: true,
        visible: true,
        drawZero: true,
        insertTicks: false,
        includeBoundaries: true,
        minorHeight: 1,
        majorHeight: 15,
        ticksDistance: 1
      },
      firstArrow: {
        size: 5
      },
      lastArrow: {
        size: 5
      }
    },
    y: {
      name: "",
      withLabel: false,
      strokeColor: "#00b0ff",
      highlightStrokeColor: "#00b0ff",
      strokeWidth: 2,
      label: {
        position: "rt",
        anchorX: "left",
        anchorY: "top"
      },
      ticks: {
        drawLabels: true,
        visible: true,
        insertTicks: false,
        minorHeight: 0,
        ticksDistance: 1,
        majorHeight: 15
      },
      firstArrow: {
        size: 5
      },
      lastArrow: {
        size: 5
      }
    }
  }
};

function getDefaultConfig() {
  return {
    ...quadrantsDefaultConfig
  };
}

export default getDefaultConfig;
