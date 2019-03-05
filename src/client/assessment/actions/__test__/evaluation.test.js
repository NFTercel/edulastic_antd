import { evaluateAnswer } from "../evaluation";

describe("Assessment", () => {
  it("assessment should return an action", () => {
    expect(evaluateAnswer({})).toMatchSnapshot();
  });
});
