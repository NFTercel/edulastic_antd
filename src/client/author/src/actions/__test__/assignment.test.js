import {
  addAssignmentAction,
  setAssignmentAction,
  updateAssignmentAction,
  fetchAssignmentsAction,
  deleteAssignmentAction
} from "../assignment";

describe("Assignment", () => {
  it("add assignment should return an action", () => {
    expect(addAssignmentAction({})).toMatchSnapshot();
  });

  it("set assignment should return an action", () => {
    expect(setAssignmentAction({})).toMatchSnapshot();
  });

  it("update assignment should return an action", () => {
    expect(updateAssignmentAction({})).toMatchSnapshot();
  });

  it("fetch assignment should return an action", () => {
    expect(fetchAssignmentsAction()).toMatchSnapshot();
  });

  it("delete assignment should return an action", () => {
    expect(deleteAssignmentAction(1)).toMatchSnapshot();
  });
});
