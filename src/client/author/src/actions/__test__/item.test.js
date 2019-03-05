import { receiveItemsAction, receiveItemByIdAction, createItemAction, updateItemByIdAction } from "../items";

describe("Items", () => {
  it("receive items should return an action", () => {
    expect(
      receiveItemsAction({
        page: 1,
        limit: 5,
        search: "items"
      })
    ).toMatchSnapshot();
  });

  it("receive item by id should return an action", () => {
    expect(
      receiveItemByIdAction({
        id: 5
      })
    ).toMatchSnapshot();
  });

  it("receive item by id should return an action", () => {
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

  it("receive item by id should return an action", () => {
    expect(
      updateItemByIdAction({
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
});
