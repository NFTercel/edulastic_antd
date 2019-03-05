import questionReducer from "../question";

import {
  RECEIVE_QUESTION_REQUEST,
  RECEIVE_QUESTION_SUCCESS,
  RECEIVE_QUESTION_ERROR,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_SUCCESS,
  SAVE_QUESTION_ERROR,
  SET_QUESTION_DATA,
  SET_QUESTION,
  SET_QUESTION_ALIGNMENT_ADD_ROW,
  SET_QUESTION_ALIGNMENT_REMOVE_ROW
} from "../../constants/actions";

describe("question", () => {
  const initialState = {
    entity: {
      alignment: 1
    },
    loading: false,
    saving: false,
    error: null,
    saveError: null
  };

  it("should return the initial state", () => {
    expect(questionReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the receive question request state", () => {
    expect(
      questionReducer(initialState, {
        type: RECEIVE_QUESTION_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive question success state", () => {
    expect(
      questionReducer(initialState, {
        type: RECEIVE_QUESTION_SUCCESS,
        payload: {
          entity: {
            data: {
              type: "multipleChoice",
              stimulus: "<p>What is the capital city of England?</p>",
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
                  label: "Green"
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
          }
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive question error state", () => {
    expect(
      questionReducer(initialState, {
        type: RECEIVE_QUESTION_ERROR,
        payload: {
          error: "unexpected error happened when receive question"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the save question request state", () => {
    expect(
      questionReducer(initialState, {
        type: SAVE_QUESTION_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the save question success state", () => {
    expect(
      questionReducer(initialState, {
        type: SAVE_QUESTION_SUCCESS,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the save question error state", () => {
    expect(
      questionReducer(initialState, {
        type: SAVE_QUESTION_ERROR,
        payload: { error: "unexpected error happend when save question" }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question data state", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION_DATA,
        payload: {
          data: {
            type: "multipleChoice",
            stimulus: "<p>What is the capital city of England?</p>",
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
                label: "Green"
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
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question  state", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION,
        payload: { data: {} }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question  state", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION,
        payload: { data: {} }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question alignment add row state1", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION_ALIGNMENT_ADD_ROW,
        payload: { alignmentRow: 1 }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question alignment add row state2", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION_ALIGNMENT_ADD_ROW,
        payload: { alignmentRow: 3 }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question alignment remove row state1", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION_ALIGNMENT_REMOVE_ROW,
        payload: { index: 1 }
      })
    ).toMatchSnapshot();
  });

  it("should return the set question alignment remove row state1", () => {
    expect(
      questionReducer(initialState, {
        type: SET_QUESTION_ALIGNMENT_REMOVE_ROW,
        payload: { index: 3 }
      })
    ).toMatchSnapshot();
  });
});
