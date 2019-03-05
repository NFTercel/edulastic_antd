import {
  receiveItemsAction,
  receiveItemByIdAction,
  createItemAction,
  updateItemByIdAction,
  gotoItem,
  saveUserResponse,
  loadUserResponse
} from "../items";

describe("Items", () => {
  it("receive item should return an action", () => {
    expect(
      receiveItemsAction({
        page: 5,
        limit: 10,
        search: ""
      })
    ).toMatchSnapshot();
  });

  it("receive item by id should return an action", () => {
    expect(receiveItemByIdAction({ id: 1 })).toMatchSnapshot();
  });

  it("create item should return an action", () => {
    expect(
      createItemAction({
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

  it("update item by id should return an action", () => {
    expect(updateItemByIdAction({ id: 2 })).toMatchSnapshot();
  });

  it("go to item should return an action", () => {
    expect(
      gotoItem({
        item: {
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
        }
      })
    ).toMatchSnapshot();
  });

  it("save user response should return an action", () => {
    expect(
      saveUserResponse({
        item: 2
      })
    ).toMatchSnapshot();
  });

  it("load user response should return an action", () => {
    expect(
      loadUserResponse({
        item: 3
      })
    ).toMatchSnapshot();
  });
});
