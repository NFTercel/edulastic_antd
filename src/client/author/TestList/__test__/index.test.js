import React from "react";
import { shallow, render } from "enzyme";

import configureStore from "../../../../../configureStore";

import TestList from "../Container";

const { store } = configureStore();

describe("<Container />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<TestList />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("contains antd input component with an expectation", () => {
    const renderedComponent = render(<TestList store={store} />);
    expect(renderedComponent.find(".ant-input").length).toBe(2);
  });

  it("contains antd suffix component with an expectation", () => {
    const renderedComponent = render(<TestList store={store} />);
    expect(renderedComponent.find(".ant-input-suffix").length).toBe(2);
  });
});
