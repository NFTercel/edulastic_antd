import React from "react";
import { shallow } from "enzyme";

import Dropdown from "../Dropdown";

describe("<Dropdown />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(
      <Dropdown currentTool={{ groupIndex: 1 }} list={[{ groupIndex: 1 }]} getIconTemplate={() => {}} fontSize={16} />
    );
    expect(renderedComponent.length).toEqual(1);
  });
});
