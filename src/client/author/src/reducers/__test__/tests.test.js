import testsReducer from "../testItems";

import {
  RECEIVE_TESTS_REQUEST,
  RECEIVE_TESTS_SUCCESS,
  RECEIVE_TESTS_ERROR,
  CREATE_TEST_REQUEST,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
  RECEIVE_TEST_BY_ID_REQUEST,
  RECEIVE_TEST_BY_ID_SUCCESS,
  RECEIVE_TEST_BY_ID_ERROR,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_ERROR,
  SET_DEFAULT_TEST_DATA,
  SET_ASSIGNMENT
} from "../../constants/actions";

describe("tests", () => {
  const initialTestState = {
    title: "New Test",
    description: "",
    maxAttempts: 1,
    renderingType: "assessment",
    status: "draft",
    thumbnail: "https://fakeimg.pl/500x135/",
    createdBy: {
      id: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    tags: [],
    scoring: {
      total: 0,
      testItems: []
    },
    testItems: [],
    assignments: [],
    standardsTag: {
      curriculum: "",
      standards: []
    },
    grades: [],
    subjects: [],
    courses: [],
    collections: "",
    analytics: {
      usage: "0",
      likes: "0"
    }
  };

  const initialState = {
    entities: [],
    entity: initialTestState,
    error: null,
    page: 1,
    limit: 5,
    count: 0,
    loading: false,
    creating: false
  };

  it("should return the initial state", () => {
    expect(testsReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the initial state", () => {
    expect(testsReducer(initialTestState, {})).toMatchSnapshot();
  });

  it("should return the receive tests request state", () => {
    expect(
      testsReducer(initialState, {
        type: RECEIVE_TESTS_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive tests success state", () => {
    expect(
      testsReducer(initialState, {
        type: RECEIVE_TESTS_SUCCESS,
        payload: {
          entities: [
            {
              title: "New Test",
              description: "",
              maxAttempts: 1,
              renderingType: "assessment",
              status: "draft",
              thumbnail: "https://fakeimg.pl/500x135/",
              createdBy: {
                id: "",
                firstName: "",
                lastName: "",
                email: ""
              },
              tags: [],
              scoring: {
                total: 0,
                testItems: []
              },
              testItems: [],
              assignments: [],
              standardsTag: {
                curriculum: "",
                standards: []
              },
              grades: [],
              subjects: [],
              courses: [],
              collections: "",
              analytics: {
                usage: "0",
                likes: "0"
              }
            }
          ],
          page: 5,
          limit: 10,
          count: 50
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive tests error state", () => {
    expect(
      testsReducer(initialState, {
        type: RECEIVE_TESTS_ERROR,
        payload: { error: "unexpected error happend when receive tests" }
      })
    ).toMatchSnapshot();
  });

  it("should return the create test request state", () => {
    expect(
      testsReducer(initialState, {
        type: CREATE_TEST_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the create test success state", () => {
    expect(
      testsReducer(initialState, {
        type: CREATE_TEST_SUCCESS,
        payload: {
          entity: {
            title: "New Test",
            description: "",
            maxAttempts: 1,
            renderingType: "assessment",
            status: "draft",
            thumbnail: "https://fakeimg.pl/500x135/",
            createdBy: {
              id: "",
              firstName: "",
              lastName: "",
              email: ""
            },
            tags: [],
            scoring: {
              total: 0,
              testItems: []
            },
            testItems: [],
            assignments: [],
            standardsTag: {
              curriculum: "",
              standards: []
            },
            grades: [],
            subjects: [],
            courses: [],
            collections: "",
            analytics: {
              usage: "0",
              likes: "0"
            }
          }
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the create tests error state", () => {
    expect(
      testsReducer(initialState, {
        type: CREATE_TEST_ERROR,
        payload: { error: "unexpected error happend when create tests" }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive test id request state", () => {
    expect(
      testsReducer(initialTestState, {
        type: RECEIVE_TEST_BY_ID_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive test id success state", () => {
    expect(
      testsReducer(initialTestState, {
        type: RECEIVE_TEST_BY_ID_SUCCESS,
        payload: {
          entity: {
            title: "New Test",
            description: "",
            maxAttempts: 1,
            renderingType: "assessment",
            status: "draft",
            thumbnail: "https://fakeimg.pl/500x135/",
            createdBy: {
              id: "",
              firstName: "",
              lastName: "",
              email: ""
            },
            tags: [],
            scoring: {
              total: 0,
              testItems: []
            },
            testItems: [],
            assignments: [],
            standardsTag: {
              curriculum: "",
              standards: []
            },
            grades: [],
            subjects: [],
            courses: [],
            collections: "",
            analytics: {
              usage: "0",
              likes: "0"
            }
          }
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive test id error state", () => {
    expect(
      testsReducer(initialTestState, {
        type: RECEIVE_TEST_BY_ID_ERROR,
        payload: { error: "unexpected error happened when receive test id" }
      })
    ).toMatchSnapshot();
  });

  it("should return the update test request state", () => {
    expect(
      testsReducer(initialTestState, {
        type: UPDATE_TEST_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the update test success state", () => {
    expect(
      testsReducer(initialTestState, {
        type: UPDATE_TEST_SUCCESS,
        payload: {
          entity: {
            title: "New Test",
            description: "",
            maxAttempts: 1,
            renderingType: "assessment",
            status: "draft",
            thumbnail: "https://fakeimg.pl/500x135/",
            createdBy: {
              id: "",
              firstName: "",
              lastName: "",
              email: ""
            },
            tags: [],
            scoring: {
              total: 0,
              testItems: []
            },
            testItems: [],
            assignments: [],
            standardsTag: {
              curriculum: "",
              standards: []
            },
            grades: [],
            subjects: [],
            courses: [],
            collections: "",
            analytics: {
              usage: "0",
              likes: "0"
            }
          }
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the update test error state", () => {
    expect(
      testsReducer(initialTestState, {
        type: UPDATE_TEST_ERROR,
        payload: { error: "unexpected error happened when update test" }
      })
    ).toMatchSnapshot();
  });

  it("should return the set default test data state", () => {
    expect(
      testsReducer(initialState, {
        type: SET_DEFAULT_TEST_DATA
      })
    ).toMatchSnapshot();
  });

  it("should return the set assignment state", () => {
    expect(
      testsReducer(initialState, {
        type: SET_ASSIGNMENT,
        payload: {
          obj: {}
        }
      })
    ).toMatchSnapshot();
  });
});
