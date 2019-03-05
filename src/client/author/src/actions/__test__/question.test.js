import {
  receiveQuestionByIdAction,
  saveQuestionAction,
  setQuestionDataAction,
  setQuestionAlignmentRowAction,
  setQuestionAlignmentRowStandardsAction,
  setQuestionAlignmentAddRowAction,
  setQuestionAction
} from "../question";

describe("Question", () => {
  it("receive question by id should return an action", () => {
    expect(receiveQuestionByIdAction("5c0fd3ea025fa415ffeb6895")).toMatchSnapshot();
    expect(receiveQuestionByIdAction("5c0fd3ea025fa415ffeb6896")).toMatchSnapshot();
    expect(receiveQuestionByIdAction("5c0fd3ea025fa415ffeb6897")).toMatchSnapshot();
  });

  it("save question should return an action", () => {
    expect(saveQuestionAction()).toMatchSnapshot();
  });

  it("set question data should return an action", () => {
    expect(
      setQuestionDataAction({
        data: {
          type: "multipleChoice",
          stimulus: "Which color has the smallest walvelenght?",
          ui_style: {
            type: "horizontal"
          },
          options: [
            {
              value: 0,
              label: "Red"
            },
            {
              value: 1,
              label: "Violet"
            },
            {
              value: 2,
              label: "<p>Green</p>"
            }
          ],
          validation: {
            scoring_type: "exactMatch",
            valid_response: {
              score: 1,
              value: [1]
            },
            alt_responses: []
          },
          multiple_responses: false,
          smallSize: true
        }
      })
    ).toMatchSnapshot();

    expect(
      setQuestionDataAction({
        data: {
          type: "multipleChoice",
          stimulus: "What is the capital city of London?",
          ui_style: {
            type: "horizontal"
          },
          options: [
            {
              value: 0,
              label: "Moscow"
            },
            {
              value: 1,
              label: "Paris"
            },
            {
              value: 2,
              label: "<p>London</p>"
            }
          ],
          validation: {
            scoring_type: "exactMatch",
            valid_response: {
              score: 2,
              value: [2]
            },
            alt_responses: []
          },
          multiple_responses: false,
          smallSize: true
        }
      })
    ).toMatchSnapshot();
  });

  it("set question alignment row should return an action", () => {
    expect(setQuestionAlignmentRowAction(1, 1)).toMatchSnapshot();
    expect(setQuestionAlignmentRowAction(2, 1)).toMatchSnapshot();
  });

  it("set question alignment row standard should return an action", () => {
    expect(setQuestionAlignmentRowStandardsAction(1, 2)).toMatchSnapshot();
    expect(setQuestionAlignmentRowStandardsAction(2, 1)).toMatchSnapshot();
  });

  it("set question alignment add row should return an action", () => {
    expect(setQuestionAlignmentAddRowAction()).toMatchSnapshot();
  });

  it("set question should return an action", () => {
    expect(
      setQuestionAction({
        type: "multipleChoice",
        stimulus: "Which color has the smallest walvelenght?",
        ui_style: {
          type: "horizontal"
        },
        options: [
          {
            value: 0,
            label: "Red"
          },
          {
            value: 1,
            label: "Violet"
          },
          {
            value: 2,
            label: "<p>Green</p>"
          }
        ],
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [1]
          },
          alt_responses: []
        },
        multiple_responses: false,
        smallSize: true
      })
    ).toMatchSnapshot();

    expect(
      setQuestionAction({
        type: "multipleChoice",
        stimulus: "How many countries are there in the world?",
        ui_style: {
          type: "horizontal"
        },
        options: [
          {
            value: 0,
            label: "245"
          },
          {
            value: 1,
            label: "256"
          },
          {
            value: 2,
            label: "<p>247</p>"
          }
        ],
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 2,
            value: [2]
          },
          alt_responses: []
        },
        multiple_responses: false,
        smallSize: true
      })
    ).toMatchSnapshot();
  });
});
