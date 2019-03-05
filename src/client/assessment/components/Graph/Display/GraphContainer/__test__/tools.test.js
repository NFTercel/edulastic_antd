import React from "react";
import { shallow, render } from "enzyme";

import Tools from "../Tools";

describe("<Tools />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<Tools />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("click on clear button", () => {
    const renderedComponent = render(<Tools />);
    expect(renderedComponent.text()).toMatch(/Clear/);
  });
});
