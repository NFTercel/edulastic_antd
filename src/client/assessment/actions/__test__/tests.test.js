import { loadTestAction, finishTestAcitivityAction, loadPreviousReponseAction } from "../test";

describe("Test", () => {
  it("load test should return an action", () => {
    expect(loadTestAction({ testId: "6te42hgfd67821fa" })).toMatchSnapshot();
  });

  it("finish test activity should return an action", () => {
    expect(finishTestAcitivityAction({})).toMatchSnapshot();
  });

  it("load previous response should return an action", () => {
    expect(loadPreviousReponseAction({})).toMatchSnapshot();
  });
});
