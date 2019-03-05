describe("Test Graphing - number line with drag and drop", () => {
  before(() => {
    cy.setToken();
  });

  it("Visit Item List Page", () => {
    cy.visit("/author/items");
  });

  it("Check Flow", () => {
    cy.get("button")
      .contains("Create")
      .should("be.visible");
    cy.contains("Create").click();
    cy.contains("Add New").click();

    cy.get("li").should("contain", "Multiple Choice");
    cy.get("li").should("contain", "Fill in the Blanks");
    cy.get("li").should("contain", "Classify, Match & Order");
    cy.get("li").should("contain", "Written & Spoken");
    cy.get("li").should("contain", "Highlight");
    cy.get("li").should("contain", "Math");
    cy.get("li").should("contain", "Graphing");
    cy.get("li").should("contain", "Charts");
    cy.get("li").should("contain", "Chemistry");
    cy.get("li").should("contain", "Other");
  });

  it("Graphing - Number line with plot", () => {
    cy.get("li")
      .contains("Graphing")
      .click();

    cy.get("div")
      .contains("Number line with drag & drop")
      .click();

    cy.get('[data-placeholder="Enter your question"]')
      .find("[contenteditable]")
      .eq(0)
      .focus()
      .clear()
      .type("Type a question");

    cy.get('input[name="x_min"]')
      .clear()
      .type(-15);

    cy.get('input[name="x_max"]')
      .clear()
      .type(15);

    cy.get('input[name="title"]')
      .clear()
      .type("Type a title");
  });

  const svgWidth = 1100;
  const svgHeight = 200;

  function CreateEvent(eventName, pos, offset) {
    const ev = new Event(eventName);
    ev.clientX = pos[0] * svgWidth + offset[0];
    ev.clientY = pos[1] * svgHeight + offset[1];

    return ev;
  }

  function CreatePointerDown(xPer, yPer, offsetX, offsetY) {
    return CreateEvent("pointerdown", [xPer, yPer], [offsetX, offsetY]);
  }

  function CreatePointerUp(xPer, yPer, offsetX, offsetY) {
    return CreateEvent("pointerup", [xPer, yPer], [offsetX, offsetY]);
  }

  // xK - percentage of graph width
  // yK - percentage of graph height
  function InvokeBoardTrigger(xK, yK) {
    cy.get("@Board").then(board => {
      cy.window().then(window => {
        console.log(board);

        const boardRect = board[0].getBoundingClientRect();

        const left = boardRect.left + window.pageXOffset;
        const { top } = boardRect;
        const downEvent = CreatePointerDown(xK, yK, left, top);
        const upEvent = CreatePointerUp(xK, yK, left, top);

        let result = true;
        try {
          board[0].dispatchEvent(downEvent);
          window.document.dispatchEvent(upEvent);
        } catch (e) {
          result = false;
        }

        assert.isTrue(result, "invoke board trigger");
      });
    });
  }

  function DrawPoints(points) {
    for (let i = 0; i < points.length; i++) {
      InvokeBoardTrigger(points[i][0], points[i][1]);
    }
  }

  // Needed variables - CurrentTool, Board, ClearBtn
  function TestDraw(points, selector, save = false) {
    DrawPoints(points);

    cy.get("@Board")
      .find(selector)
      .should("exist");

    if (!save) {
      cy.get("@ClearTool").click();

      DrawPoints(points);

      cy.get("@Board")
        .find(selector)
        .should("not.exist");
    }
  }

  it("Visit Preview Page", () => {
    cy.server();
    cy.route("PUT", "**/testitem/**").as("saveItem");
    cy.route("GET", "**/testitem/**").as("reload");

    cy.contains("div", "SAVE")
      .should("be.visible")
      .click();

    cy.wait("@saveItem");
    cy.wait("@reload");

    cy.contains("PREVIEW").should("be.visible");

    cy.contains("PREVIEW").click();
  });
});
