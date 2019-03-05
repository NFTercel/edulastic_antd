import { fetchGroupsAction, fetchStudentsOfGroupAction } from "../group";

describe("group", () => {
  it("fetch groups should return an action", () => {
    expect(fetchGroupsAction()).toMatchSnapshot();
  });

  it("fetch students of group action should return an action", () => {
    expect(
      fetchStudentsOfGroupAction({
        id: "53wqwri21567"
      })
    ).toMatchSnapshot();
  });
});
