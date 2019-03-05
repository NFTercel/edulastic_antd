import React from "react";
import {
  shallow,
  mount
  // render
} from "enzyme";

import Graph from "../Graph";

import configureStore from "../../../../configureStore";

const { store } = configureStore();

describe("<Graph />", () => {
  const component = mount(<Graph store={store} item={{ graphType: "" }} />);

  it("should render properly", () => {
    const renderedComponent = shallow(<Graph />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("ignore repeated shapes - No", () => {
    const event = {
      preventDefault() {},
      target: { value: "no" }
    };
    const select = component.find("Select").first();
    select.simulate("onChange", event);
  });

  it("ignore repeated shapes - slop", () => {
    const event = {
      preventDefault() {},
      target: { value: "yes" }
    };
    const select = component.find("Select").first();
    select.simulate("onChange", event);
  });

  it("ignore repeated shapes - points", () => {
    const event = {
      preventDefault() {},
      target: { value: "strict" }
    };
    const select = component.find("Select").first();
    select.simulate("onChange", event);
  });
});
