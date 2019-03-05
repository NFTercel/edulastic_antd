import dictionariesReducer from "../dictionaries";

import {
  RECEIVE_DICT_CURRICULUMS_REQUEST,
  RECEIVE_DICT_CURRICULUMS_SUCCESS,
  RECEIVE_DICT_CURRICULUMS_ERROR,
  RECEIVE_DICT_STANDARDS_REQUEST,
  RECEIVE_DICT_STANDARDS_SUCCESS,
  RECEIVE_DICT_STANDARDS_ERROR
} from "../../constants/actions";

describe("dictionaries", () => {
  it("should return the initial state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {}
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary curriculums request state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_CURRICULUMS_REQUEST,
          payload: {}
        }
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary curriculums success state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_CURRICULUMS_SUCCESS,
          payload: {
            items: {
              curriculumId: "5wrg64u51qhiuytuiogazcv",
              grades: 5,
              search: "match"
            }
          }
        }
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary curriculums error state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_CURRICULUMS_ERROR,
          payload: {
            error: "unexpected error happened"
          }
        }
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary standard request state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_STANDARDS_REQUEST,
          payload: {}
        }
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary standard success state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_STANDARDS_SUCCESS,
          payload: {
            items: {
              curriculumId: 5
            }
          }
        }
      )
    ).toMatchSnapshot();
  });

  it("should return the receive dictionary standard error state", () => {
    expect(
      dictionariesReducer(
        {
          curriculums: {
            curriculums: [],
            loading: false,
            error: null
          },
          standards: {
            standards: [],
            loading: false,
            error: null
          }
        },
        {
          type: RECEIVE_DICT_STANDARDS_ERROR,
          payload: {
            error: "receive dictionary standard error happened"
          }
        }
      )
    ).toMatchSnapshot();
  });
});
