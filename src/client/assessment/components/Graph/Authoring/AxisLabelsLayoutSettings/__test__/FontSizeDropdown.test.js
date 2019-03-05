import React from "react";
import { shallow, mount } from "enzyme";

import FontSizeDropdown from "../FontSizeDropdown";

import configureStore from "../../../../../../configureStore";

const { store } = configureStore();

describe("<FontSizeDropdown />", () => {
  const component = mount(<FontSizeDropdown store={store} />);

  it("should render properly", () => {
    const renderedComponent = shallow(<FontSizeDropdown />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("font change", () => {
    const event = {
      preventDefault() {},
      target: { value: "no" }
    };

    const select = component.find("Select").first();
    select.simulate("onChange", event);
  });
});
