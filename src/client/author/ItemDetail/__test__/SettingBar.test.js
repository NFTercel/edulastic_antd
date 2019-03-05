import React from "react";
import { shallow, render } from "enzyme";

import SettingsBar from "../SettingsBar";

describe("<SettingBar />", () => {
  it("should render properly", () => {
    const renderedComponent = shallow(<SettingsBar />);
    expect(renderedComponent.length).toEqual(1);
  });

  const renderedComponent = render(<SettingsBar />);
  expect(renderedComponent.find("SettingsButtonWrapper").length).toBe(0);
});
