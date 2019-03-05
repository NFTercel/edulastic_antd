import {
  getItemDetailByIdAction,
  setItemDetailDataAction,
  updateItemDetailByIdAction,
  updateItemDetailDimensionAction,
  setItemDetailDraggingAction,
  deleteWidgetAction,
  updateTabTitleAction,
  useTabsAction,
  moveItemDetailWidgetAction
} from "../itemDetail";

describe("item detail", () => {
  it("get item detail by id should return an action", () => {
    expect(
      getItemDetailByIdAction("5bf28847dc39e409216aea00", {
        data: true,
        validation: true
      })
    ).toMatchSnapshot();
  });

  it("set item detail data should return an action", () => {
    expect(
      setItemDetailDataAction({
        rows: [
          {
            tabs: ["Tab 1", "Tab 2"],
            dimension: "100%",
            widgets: [
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a0fb6bad08e5cf69a4d94",
                tabIndex: 1
              },
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a1ac6bad08e5cf69a4d96",
                tabIndex: 1
              },
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a1b2ebad08e5cf69a4d97",
                tabIndex: 1
              }
            ],
            columns: []
          }
        ]
      })
    ).toMatchSnapshot();
  });

  it("update item detail by id should return an action", () => {
    expect(
      updateItemDetailByIdAction("5bf28847dc39e409216aea00", {
        rows: [
          {
            tabs: ["Tab 1", "Tab 2"],
            dimension: "100%",
            widgets: [
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a0fb6bad08e5cf69a4d94",
                tabIndex: 1
              },
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a1ac6bad08e5cf69a4d96",
                tabIndex: 1
              },
              {
                widgetType: "question",
                type: "clozeDragDrop",
                title: "Multiple choice",
                reference: "5c0a1b2ebad08e5cf69a4d97",
                tabIndex: 1
              }
            ],
            columns: []
          }
        ]
      })
    ).toMatchSnapshot();
  });

  it("update item detail dimention should return an action", () => {
    expect(
      updateItemDetailDimensionAction({
        left: 500,
        right: 400
      })
    ).toMatchSnapshot();
  });

  it("set item detail dragging should return an action", () => {
    expect(setItemDetailDraggingAction(false)).toMatchSnapshot();
    expect(setItemDetailDraggingAction(true)).toMatchSnapshot();
  });

  it("delete widget should return an action", () => {
    expect(deleteWidgetAction(1, 1)).toMatchSnapshot();
    expect(deleteWidgetAction(1, 2)).toMatchSnapshot();
  });

  it("update tab title should return an action", () => {
    expect(
      updateTabTitleAction({
        rowIndex: 1,
        tabIndex: 2,
        value: "Test1"
      })
    ).toMatchSnapshot();

    expect(
      updateTabTitleAction({
        rowIndex: 2,
        tabIndex: 1,
        value: "Test2"
      })
    ).toMatchSnapshot();
  });

  it("use tabs should return an action", () => {
    expect(
      useTabsAction({
        rowIndex: 1,
        isUseTabs: true
      })
    ).toMatchSnapshot();
    expect(
      useTabsAction({
        rowIndex: 1,
        isUseTabs: false
      })
    ).toMatchSnapshot();
  });

  it("move item detail widget should return an action", () => {
    expect(
      moveItemDetailWidgetAction({
        from: {
          widgetIndex: 2,
          rowIndex: 1,
          tabIndex: 1
        },
        to: {
          widgetIndex: 1,
          rowIndex: 1,
          tabIndex: 1
        }
      })
    ).toMatchSnapshot();

    expect(
      moveItemDetailWidgetAction({
        from: {
          widgetIndex: 2,
          rowIndex: 2,
          tabIndex: 1
        },
        to: {
          widgetIndex: 1,
          rowIndex: 2,
          tabIndex: 1
        }
      })
    ).toMatchSnapshot();

    expect(
      moveItemDetailWidgetAction({
        from: {
          widgetIndex: 2,
          rowIndex: 1,
          tabIndex: 3
        },
        to: {
          widgetIndex: 2,
          rowIndex: 1,
          tabIndex: 1
        }
      })
    ).toMatchSnapshot();
  });
});
