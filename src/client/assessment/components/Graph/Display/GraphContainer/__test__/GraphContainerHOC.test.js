import React from "react";
import { shallow } from "enzyme";

import GraphContainerHOC from "../GraphContainerHOC";

describe("<GraphContainerHOC />", () => {
  const canvasConfig = {
    x_min: -9,
    x_max: 9,
    y_min: -9,
    y_max: 9
  };

  const uiStyle = {
    layout_width: 100,
    layout_margin: 10,
    layout_height: 100,
    layout_snapto: 5,
    currentFontSize: 13,
    xDistance: 10,
    yDistance: 10,
    xTickDistance: 10,
    xShowAxisLabel: "XLabel",
    xHideTicks: true,
    xDrawLabel: true,
    xMaxArrow: 5,
    xMinArrow: 1,
    xCommaInLabel: "XArrow",
    displayPositionOnHover: true,
    yTickDistance: 10,
    yShowAxisLabel: "YLabel",
    yHideTicks: true,
    yDrawLabel: true,
    yMaxArrow: 10,
    yMinArrow: 1,
    yCommaInLabel: "YLabel"
  };

  const backgroundShapes = [];

  const bgImgOptions = {
    src: "",
    opacity: 90,
    x: 0,
    y: 0,
    width: 100,
    height: 100
  };

  it("should render properly", () => {
    const renderedComponent = shallow(
      <GraphContainerHOC
        canvasConfig={canvasConfig}
        uiStyle={uiStyle}
        bgImgOptions={bgImgOptions}
        backgroundShapes={backgroundShapes}
      />
    );
    expect(renderedComponent.length).toEqual(1);
  });
});
