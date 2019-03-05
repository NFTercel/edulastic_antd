import React from "react";
import { shallow, render } from "enzyme";

import AxisLabelsLayoutSettings from "../AxisLabelsLayoutSettings";

import configureStore from "../../../../../../configureStore";

const { store } = configureStore();

describe("<AxisLabelsLayoutSettings />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<AxisLabelsLayoutSettings />);
    expect(renderedComponent.length).toEqual(1);
  });

  it("should match with snapshot", () => {
    const component = render(<AxisLabelsLayoutSettings store={store} />);
    expect(component).toMatchSnapshot();
  });
});
