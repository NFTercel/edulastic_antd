import React from "react";
import { shallow, render } from "enzyme";

import configureStore from "../../../../../configureStore";

import SortBar from "../SortBar";

const { store } = configureStore();

describe("<SortBar />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<SortBar />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("contains antd select component with an expectation", () => {
    const renderedComponent = render(<SortBar store={store} />);
    expect(renderedComponent.find(".ant-select").length).toBe(1);
  });
});
