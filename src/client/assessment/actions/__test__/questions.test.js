import { loadQuestions, gotoQuestion, addQuestion, addAnswer } from "../questions";

describe("Questions", () => {
  it("load questions should return an action", () => {
    expect(
      loadQuestions({
        questions: []
      })
    ).toMatchSnapshot();
  });

  it("go to questions should return an action", () => {
    expect(gotoQuestion({ question: {} })).toMatchSnapshot();
  });

  it("add questions should return an action", () => {
    expect(addQuestion({ question: {} })).toMatchSnapshot();
  });

  it("add answer should return an action", () => {
    expect(addAnswer({ qid: "5e245t52td186247824t" })).toMatchSnapshot();
  });
});
