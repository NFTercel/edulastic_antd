import groupReducer from "../group";

import { SET_GROUPS, SET_GROUP_STUDENTS } from "../../constants/actions";

describe("group", () => {
  it("should return the initial state", () => {
    expect(groupReducer([], {})).toMatchSnapshot();
  });

  it("should return the set groups state", () => {
    expect(
      groupReducer([], {
        type: SET_GROUPS,
        payload: {
          data: [1, 3, 4]
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the set group students state", () => {
    expect(
      groupReducer([], {
        type: SET_GROUP_STUDENTS,
        payload: {
          classId: 3,
          students: [1, 3]
        }
      })
    ).toMatchSnapshot();
  });
});
