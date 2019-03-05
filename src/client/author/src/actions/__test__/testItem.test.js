import { createTestItemAction, updateTestItemByIdAction, checkAnswerAction, showAnswerAction } from "../testItem";

describe("test item", () => {
  it("create test item should return an action", () => {
    expect(
      createTestItemAction({
        rows: [
          {
            tabs: [],
            dimension: "100%",
            widgets: []
          }
        ]
      })
    ).toMatchSnapshot();

    expect(
      createTestItemAction({
        rows: [
          {
            tabs: [],
            dimension: "100%",
            widgets: [
              {
                widgetType: "question",
                type: "multipleChoice",
                title: "Multiple choice",
                reference: "5c0f0c9ed8c7f4453f5bb51f",
                tabIndex: 0
              }
            ]
          }
        ],
        columns: []
      })
    ).toMatchSnapshot();
  });

  it("update test item by id should return an action", () => {
    expect(
      updateTestItemByIdAction(1, {
        rows: [
          {
            tabs: [],
            dimension: "100%",
            widgets: []
          }
        ]
      })
    ).toMatchSnapshot();

    expect(
      updateTestItemByIdAction(2, {
        rows: [
          {
            tabs: [],
            dimension: "100%",
            widgets: [
              {
                widgetType: "question",
                type: "multipleChoice",
                title: "Multiple choice",
                reference: "5c0f0c9ed8c7f4453f5bb51f",
                tabIndex: 0
              }
            ]
          }
        ],
        columns: []
      })
    ).toMatchSnapshot();
  });

  it("check answer should return an action", () => {
    expect(checkAnswerAction()).toMatchSnapshot();
  });

  it("show answer should return an action", () => {
    expect(showAnswerAction()).toMatchSnapshot();
  });
});
