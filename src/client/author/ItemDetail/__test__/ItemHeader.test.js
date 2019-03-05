import React from "react";
import { shallow } from "enzyme";

import ItemHeader from "../ItemHeader";

describe("<ItemHeader />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<ItemHeader />);
    expect(renderedComponent.length).toEqual(1);
  });
});
