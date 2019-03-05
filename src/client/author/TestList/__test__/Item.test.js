import React from "react";
import { shallow, render } from "enzyme";

import configureStore from "../../../../../configureStore";

import Item from "../Item";

const { store } = configureStore();

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

describe("<Item />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<Item />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("contains antd card component with an expectation", () => {
    const renderedComponent = render(<Item store={store} item={item} />);
    expect(renderedComponent.find(".ant-card-head").length).toBe(1);
    expect(renderedComponent.find(".ant-card-body").length).toBe(1);
  });
});
