import React from "react";
import { shallow, mount, render } from "enzyme";

import GraphToolsParams from "../GraphToolsParams";

import configureStore from "../../../../../configureStore";

const { store } = configureStore();

describe("<GraphToolsParams />", () => {
  const component = mount(<GraphToolsParams store={store} onChange={() => {}} />);
  const renderComponent = render(<GraphToolsParams store={store} />);

  it("should render properly", () => {
    const renderedComponent = shallow(<GraphToolsParams />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("user should be able to add new tools using new tool option", () => {
    expect(renderComponent.find("ADD TOOL").length).toBe(0);
    const button = component.find("button").first();
    button.simulate("click");
  });

  it("select a tool from drop down", () => {
    const event = {
      preventDefault() {},
      target: { value: "the-value" }
    };
    const button = component.find("select").first();
    button.simulate("change", event);
  });

  it("user should be able to delete new existing tool", () => {
    const button = component.find("button").at(1);
    button.simulate("click");
  });

  it("user should be able to add new group of tool", () => {
    expect(renderComponent.find("ADD NEW GROUP").length).toBe(0);
    const button = component.find("button").at(1);
    button.simulate("click");
  });
});
