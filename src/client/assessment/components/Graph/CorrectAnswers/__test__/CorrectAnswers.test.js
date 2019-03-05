import React from "react";
import {
  shallow
} from "enzyme";

import CorrectAnswers from "../CorrectAnswers";

describe("<CorrectAnswers />", () => {
  const renderedComponent = shallow(<CorrectAnswers />);
  expect(renderedComponent.length).toEqual(1);
});
