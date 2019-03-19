class GraphingStandardPage {
  constructor(svgWidth, svgHeight) {
    this.ignoreRepeatedShapesOption = {
      No: "no",
      "Compare by slope": "yes",
      "Compare by points": "strict"
    };

    this.stemNumerationOption = {
      Numerical: "numerical",
      "Uppercase alphabet": "uppercase_alphabet",
      "Lowercase alphabet": "lowercase_alphabet"
    };

    this.fontSizeOption = {
      Small: "small",
      Normal: "normal",
      Large: "large",
      "Extra Large": "extra_large",
      Huge: "huge"
    };

    this.controls = {
      Undo: "undo",
      Redo: "redo",
      Reset: "reset"
    };

    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }

  // boardIndex - board number on page, start with 0
  // xK - percentage of graph width
  // yK - percentage of graph height
  invokeBoardTrigger(boardIndex, xK, yK) {
    const self = this;
    function CreateEvent(eventName, pos, offset) {
      const ev = new Event(eventName);
      ev.clientX = pos[0] * self.svgWidth + offset[0];
      ev.clientY = pos[1] * self.svgHeight + offset[1];

      return ev;
    }

    function CreatePointerDown(xPer, yPer, offsetX, offsetY) {
      return CreateEvent("pointerdown", [xPer, yPer], [offsetX, offsetY]);
    }

    function CreatePointerUp(xPer, yPer, offsetX, offsetY) {
      return CreateEvent("pointerup", [xPer, yPer], [offsetX, offsetY]);
    }

    return this.getBoards()
      .eq(boardIndex)
      .then(board => {
        cy.window().then(window => {
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

          return result;
        });
      });
  }

  // elements ---------------------------------------------------------------

  getCorrectAnswersContainer() {
    return cy.contains("section", "Set Correct Answer(s)");
  }

  getControlsContainer() {
    return cy.contains("section", "Controls");
  }

  getToolsContainer() {
    return cy.contains("section", "Tools");
  }

  getGridContainer() {
    return cy.contains("section", "Grid");
  }

  getAnnotationContainer() {
    return cy.contains("section", "Annotation");
  }

  getQuestionEditor() {
    return cy.get('[data-placeholder="Enter your question"]');
  }

  getStimulus() {
    return cy.get("#stimulus");
  }

  getQuestionHeader() {
    return cy.get('[data-cy="questionHeader"]');
  }

  getXMinParameter() {
    return cy.get('input[name="x_min"]');
  }

  getXMaxParameter() {
    return cy.get('input[name="x_max"]');
  }

  getYMinParameter() {
    return cy.get('input[name="y_min"]');
  }

  getYMaxParameter() {
    return cy.get('input[name="y_max"]');
  }

  getGroups() {
    return this.getToolsContainer().find('[data-cy="toolSubTitle"]');
  }

  getGroupTools(groupName) {
    return this.getToolsContainer()
      .contains("div", groupName)
      .find('[data-cy="selectStyle"]');
  }

  getGroupDeleteButton(groupName) {
    return this.getToolsContainer()
      .contains("span", groupName)
      .find("svg");
  }

  getToolDeleteButton(groupName, index) {
    return this.getToolsContainer()
      .contains("div", groupName)
      .find('[data-cy="selectStyle"]')
      .eq(index)
      .parent()
      .next();
  }

  getToolSelect(groupName, index) {
    return this.getToolsContainer()
      .contains("div", groupName)
      .find('select[data-cy="selectStyle"]')
      .eq(index);
  }

  getLayoutWidth() {
    return cy.get('input[name="layout_width"]');
  }

  getLayoutHeight() {
    return cy.get('input[name="layout_height"]');
  }

  getLayoutMargin() {
    return cy.get('input[name="layout_margin"]');
  }

  getLayoutSnapto() {
    return cy.get('input[name="layout_snapto"]');
  }

  getAxisXSettingsContainer() {
    return this.getGridContainer()
      .contains("Axis X")
      .parent()
      .parent();
  }

  getAxisYSettingsContainer() {
    return this.getGridContainer()
      .contains("Axis Y")
      .parent()
      .parent();
  }

  getXDistance() {
    return cy.get('input[name="xDistance"]');
  }

  getYDistance() {
    return cy.get('input[name="yDistance"]');
  }

  getXTickDistance() {
    return cy.get('input[name="xTickDistance"]');
  }

  getYTickDistance() {
    return cy.get('input[name="yTickDistance"]');
  }

  getXAxisLabel() {
    return cy.get('input[name="xAxisLabel"]');
  }

  getYAxisLabel() {
    return cy.get('input[name="yAxisLabel"]');
  }

  getBgImageUrl() {
    return cy.get('input[name="src"]');
  }

  getBgImageHeight() {
    return cy.get('input[name="height"]');
  }

  getBgImageWidth() {
    return cy.get('input[name="width"]');
  }

  getBgImageXAxisPosition() {
    return cy.contains("X axis image position").siblings("input");
  }

  getBgImageYAxisPosition() {
    return cy.contains("Y axis image position").siblings("input");
  }

  getBgImageOpacity() {
    return cy.get('input[name="opacity"]');
  }

  getBgImageOnBoard(index) {
    return this.getBoards(index).find("svg image");
  }

  getBoards() {
    return cy.get('[data-cy="axis-quadrants-container"] [data-cy="jxgbox"]');
  }

  getGraphContainers() {
    return cy.get('[data-cy="axis-quadrants-container"]');
  }

  getCorrectAnswerGraphContainer() {
    return this.getGraphContainers().first();
  }

  getBgShapesGraphContainer() {
    return this.getGraphContainers().last();
  }

  getGraphTools() {
    return cy.get('[data-cy="graphTools"]');
  }

  getGraphToolsMainShapes() {
    return cy.get("ul:first > li");
  }

  getGraphControls() {
    return cy.get("ul:last > li");
  }

  getGraphControlByName(name) {
    return cy.get("ul:last > li").contains(name);
  }

  getGraphToolsGroupShapes() {
    return cy.get("ul > li");
  }

  getLabelsOnGraphTool(index) {
    return this.getGraphTools()
      .eq(index)
      .find("span");
  }

  getVisibleTickLabelsOnBoard(index, containText = null) {
    if (containText !== null) {
      return this.getBoards()
        .eq(index)
        .find("text.JXGtext:not(:empty)")
        .filter(":visible")
        .filter(`:contains('${containText}')`);
    }
    return this.getBoards()
      .eq(index)
      .find("text.JXGtext:not(:empty)")
      .filter(":visible");
  }

  getAxisLabelByNameOnBoard(index, name) {
    return this.getBoards()
      .eq(index)
      .contains("div.JXGtext", name);
  }

  getPointsParameter() {
    return this.getCorrectAnswersContainer().find('input[type="number"]');
  }

  getGraphBgShapesPoints() {
    return cy.get('ellipse[fill="#ccc"]').filter(":visible");
  }

  getAnnotationTitle() {
    return this.getAnnotationContainer()
      .contains("Title")
      .next()
      .find(".ql-editor");
  }

  getAnnotationLabelTop() {
    return this.getAnnotationContainer()
      .contains("Label top")
      .next()
      .find(".ql-editor");
  }

  getAnnotationLabelLeft() {
    return this.getAnnotationContainer()
      .contains("Label left")
      .next()
      .find(".ql-editor");
  }

  getAnnotationLabelRight() {
    return this.getAnnotationContainer()
      .contains("Label right")
      .next()
      .find(".ql-editor");
  }

  getAnnotationLabelBottom() {
    return this.getAnnotationContainer()
      .contains("Label bottom")
      .next()
      .find(".ql-editor");
  }

  getGraphPoints() {
    return cy.get('ellipse[fill="#00b2ff"][stroke="#00b2ff"]').filter(":visible");
  }

  getGraphCorrectAnswerPoints() {
    return cy.get('ellipse[fill="#ffcb00"][stroke="#ffcb00"]').filter(":visible");
  }

  getGraphIncorrectPoints() {
    return cy.get('ellipse[fill="#ee1658"][stroke="#ee1658"]').filter(":visible");
  }

  getGraphCorrectPoints() {
    return cy.get('ellipse[fill="#1fe3a1"][stroke="#1fe3a1"]').filter(":visible");
  }

  getGraphCircles() {
    return cy.get('ellipse[fill="transparent"][stroke="#00b2ff"]').filter(":visible");
  }

  getGraphLines() {
    return cy.get('line[stroke="#00b2ff"]').filter(":visible");
  }

  getGraphParabolas() {
    return cy.get('path[stroke="#00b2ff"]').filter(":visible");
  }

  getGraphSines() {
    return cy.get('path[stroke="#00b2ff"]').filter(":visible");
  }

  getGraphPolygon() {
    return cy.get('polygon[fill="#00b2ff"]').filter(":visible");
  }

  getTabsContainer() {
    return cy.get('[data-cy="tabs"]');
  }

  // actions------------------------------------------------------

  clickOnStimulusH2Button() {
    return this.getStimulus()
      .find("button.ql-header[value=2]")
      .click();
  }

  clickOnToolDeleteButton(groupName, index) {
    this.getToolDeleteButton(groupName, index).trigger("click"); // because .click() not worked
    return this;
  }

  selectTool(groupName, index, option) {
    this.getToolSelect(groupName, index).select(option);
    return this;
  }

  clickOnNewGroupButton() {
    cy.contains("button", "ADD NEW GROUP").click();
    return this;
  }

  clickOnAddToolButton(groupName) {
    if (groupName) {
      cy.contains("div", groupName)
        .find("button", "ADD TOOL")
        .click();
      return this;
    }

    cy.contains("ADD TOOL").click();
    return this;
  }

  clickOnGroupDeleteButton(groupName) {
    this.getGroupDeleteButton(groupName).click();
    return this;
  }

  selectIgnoreRepeatedShapesOption(option) {
    this.getCorrectAnswersContainer()
      .find('[data-cy="selectStyle"]')
      .select(option);
    return this;
  }

  clickOnDrawLabelZero() {
    cy.contains("Draw label zero").click();
    return this;
  }

  clickOnDisplayPositionOnHover() {
    cy.contains("Display position on hover").click();
    return this;
  }

  selectStemNumerationOption(option) {
    cy.contains("div", "Stem numeration (review only)")
      .parent()
      .find('[data-cy="selectStyle"]')
      .select(option);
    return this;
  }

  selectFontSizeOption(option) {
    cy.contains("div", "Font Size")
      .parent()
      .find('[data-cy="selectStyle"]')
      .select(option);
    return this;
  }

  clickOnShowAxisLabel() {
    cy.contains("Show axis label").click();
    return this;
  }

  clickOnHideTicks() {
    cy.contains("Hide ticks").click();
    return this;
  }

  clickOnDrawLabels() {
    cy.contains("Draw labels").click();
    return this;
  }

  clickOnMinArrow() {
    cy.contains("Min arrow").click();
    return this;
  }

  clickOnMaxArrow() {
    cy.contains("Max arrow").click();
    return this;
  }

  clickOnCommaInLabel() {
    cy.contains("Comma in label").click();
    return this;
  }

  clickOnShowBgShapesPoints() {
    cy.contains("Show background shape points").click();
    return this;
  }

  clickOnControlDeleteButton(index) {
    cy.get('[data-cy="selectStyle"]')
      .eq(index)
      .parent()
      .next()
      // .click();
      .trigger("click"); // because .click() not worked
    return this;
  }

  selectControlOption(index, option) {
    cy.get('[data-cy="selectStyle"]')
      .eq(index)
      .select(option);
    return this;
  }

  clickOnResetButton() {
    cy.contains("Reset")
      .eq(0)
      .click();
    return this;
  }

  clickOnTabsPlusButton() {
    this.getTabsContainer()
      .find("button")
      .click();
    return this;
  }

  clickOnTab(index) {
    this.getTabsContainer()
      .find("> div")
      .eq(index)
      .click();
    return this;
  }

  clickOnAlternateAnswerDeleteButton(index) {
    this.getTabsContainer()
      .contains("Alternate")
      .eq(index)
      .parent()
      .find("svg")
      .click();
    return this;
  }
}

export default GraphingStandardPage;
