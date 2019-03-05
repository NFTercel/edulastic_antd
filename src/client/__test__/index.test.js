import React from "react";
import * as authorActionTypes from "../author/src/constants/actions";
import * as studentActionTypes from "../student/constants/actions";
import * as assessmentActionTypes from "../assessment/src/constants/actions";

jest.mock("redux-persist/lib/integration/react", () => ({
  PersistGate: () => <div />
}));

describe("Author Constants:ActionTypes", () => {
  it("should match the snapshot", () => {
    expect(authorActionTypes).toMatchSnapshot();
  });
});

describe("Student Constants:ActionTypes", () => {
  it("should match the snapshot", () => {
    expect(studentActionTypes).toMatchSnapshot();
  });
});

describe("Assessment Constants:ActionTypes", () => {
  it("should match the snapshot", () => {
    expect(assessmentActionTypes).toMatchSnapshot();
  });
});
