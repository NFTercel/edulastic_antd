import React from "react";
import { shallow } from "enzyme";

import QuadrantsSmallSize from "../QuadrantsSmallSize";

describe("<QuadrantsSmallSize />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<QuadrantsSmallSize />);
    expect(renderedComponent.length).toEqual(1);
  });
});
