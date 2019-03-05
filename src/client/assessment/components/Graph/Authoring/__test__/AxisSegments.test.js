import React from "react";
import { shallow, mount } from "enzyme";

import AxisSegments from "../AxisSegments";

import configureStore from "../../../../../configureStore";

const { store } = configureStore();

describe("<AxisSegments />", () => {
  const component = mount(<AxisSegments store={store} graphData={{ stimulus: "test" }} />);

  it("should render properly", () => {
    const renderedComponent = shallow(<AxisSegments />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("write text in text box", () => {
    const input = component.find("input[type='text']").first();
    input.getDOMNode().nodeValue = "this is a test";
    input.simulate("blur");
  });

  it("upload image", () => {
    const input = component.find("input[type='text']").first();
    input.simulate("change", {
      target: {
        files: ["dummyValue.something"]
      }
    });
  });

  it("give external link", () => {
    const input = component.find("input[type='text']").first();
    input.getDOMNode().nodeValue = '<a href="alvelenght?77" target="_blank">alvelenght?</a>';
    input.simulate("click");
  });

  it("apply formating", () => {
    const input = component.find("input[type='text']").first();
    input.getDOMNode().nodeValue = "<ol><li>Which color has the smallest?</li></ol>";
    input.simulate("click");
  });

  it("insert formula", () => {
    const input = component.find("input[type='text']").first();
    input.getDOMNode().nodeValue = "<h1>what is your favorite color?</h1>";
    input.simulate("click");
  });

  it("user should be able to edit X min value", () => {
    const input = component.find("input").at(0);
    input.getDOMNode().nodeValue = -15;
    input.simulate("blur");
  });

  it("user should be able to edit X max value", () => {
    const input = component.find("input").at(1);
    input.getDOMNode().nodeValue = 15;
    input.simulate("blur");
  });

  it("user should be able to edit Y min value", () => {
    const input = component.find("input").at(2);
    input.getDOMNode().nodeValue = -15;
    input.simulate("blur");
  });

  it("user should be able to edit Y max value", () => {
    const input = component.find("input").at(3);
    input.getDOMNode().nodeValue = 15;
    input.simulate("blur");
  });
});
