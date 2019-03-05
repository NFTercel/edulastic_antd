import React from "react";
import { shallow } from "enzyme";

import AxisSmallSize from "../AxisSmallSize";

describe("<AxisSmallSize />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<AxisSmallSize />);
    expect(renderedComponent.length).toEqual(1);
  });
});
