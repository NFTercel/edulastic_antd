import { setUserAnswerAction } from "../answers";

describe("Answer", () => {
  it("set user answer should return an action", () => {
    expect(
      setUserAnswerAction({
        id: "1qjfl125991weplz24667",
        data: {}
      })
    ).toMatchSnapshot();
  });
});
