import React from "react";
import { shallow, render } from "enzyme";

import configureStore from "../../../../../configureStore";

import ListItem from "../ListItem";

const item = {
  createdBy: {
    id: 0,
    firstName: "John",
    lastName: "John"
  },
  analytics: {
    usage: 0
  },
  tags: []
};

const { store } = configureStore();

describe("<ListItem />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<ListItem />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("contains antd card component with an expectation", () => {
    const renderedComponent = render(<ListItem store={store} item={item} />);
    expect(renderedComponent.find(".ant-card").length).toBe(1);
  });

  it("contains antd rate component with an expectation", () => {
    const renderedComponent = render(<ListItem store={store} item={item} />);
    expect(renderedComponent.find(".ant-rate").length).toBe(1);
  });
});
