import React from "react";
import { shallow, mount } from "enzyme";

import CorrectAnswer from "../CorrectAnswer";

import configureStore from "../../../../../configureStore";

const { store } = configureStore();

describe("<GraphToolsParams />", () => {
  const component = mount(<CorrectAnswer store={store} />);

  it("should render properly", () => {
    const renderedComponent = shallow(<CorrectAnswer />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("update points", () => {
    const input = component.find("input").first();
    input.getDOMNode().nodeValue(2.5);
    input.getDOMNode().nodeValue(3);
    input.getDOMNode().nodeValue(3.5);
    input.simulate("blur");
  });
});
