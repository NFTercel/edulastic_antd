import { receiveTestItemsAction, setTestItemsAction } from "../testItems";

describe("test items", () => {
  it("receive test items should return an action", () => {
    expect(receiveTestItemsAction({})).toMatchSnapshot();
  });

  it("set test items should return an action", () => {
    expect(
      setTestItemsAction([
        {
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        }
      ])
    ).toMatchSnapshot();
  });
});
