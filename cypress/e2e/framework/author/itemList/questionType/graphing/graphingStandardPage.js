class GraphingStandardPage {
  constructor(svgWidth, svgHeight) {
    this.ignoreRepeatedShapesOption = {
      No: "no",
      "Compare by slope": "yes",
      "Compare by points": "strict"
    };

    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }

  // xK - percentage of graph width
  // yK - percentage of graph height
  invokeBoardTrigger(xK, yK) {
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

    return this.getBoard().then(board => {
      cy.window().then(window => {
        console.log(board);

        const boardRect = board[0].getBoundingClientRect();

        const left = boardRect.left + window.pageXOffset;
        const { top } = boardRect;
        const downEvent = CreatePointerDown(xK, yK, left, top);
        const upEvent = CreatePointerUp(xK, yK, left, top);

        let result = true;
        console.log(downEvent);
        console.log(upEvent);
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
    return this.getToolsContainer().contains("div", "Group");
  }

  getGroupTools(groupName) {
    return this.getToolsContainer()
      .contains("div", groupName)
      .find('[data-cy="selectStyle"]');
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
    return cy
      .contains("Axis X")
      .parent()
      .parent();
  }

  getAxisYSettingsContainer() {
    return cy
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

  getPointsParameter() {
    return this.getCorrectAnswersContainer().find('input[type="number"]');
  }

  getXAxisLabel() {
    return cy.get('input[name="xAxisLabel"]');
  }

  getYAxisLabel() {
    return cy.get('input[name="yAxisLabel"]');
  }

  getBgImageSrc() {
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

  getBgShapesImage() {
    return cy
      .contains("Background shapes")
      .siblings()
      .find("svg image");
  }

  getBoards() {
    return cy.get('[data-cy="axis-quadrants-container"] [data-cy="jxgbox"]');
  }

  getVisibleTickLabelsOnBoard(board) {
    return cy.wrap(board).find("text.JXGtext:visible");
  }

  // actions------------------------------------------------------

  clickOnStimulusH2Button() {
    return this.getStimulus()
      .find("button.ql-header[value=2]")
      .click();
  }

  clickOnToolDeleteButton(groupName, index) {
    // todo: needed fix, click on delete icon not worked
    this.getToolsContainer()
      .contains("div", groupName)
      .find('[data-cy="selectStyle"]')
      .eq(index - 1)
      .parent()
      .parent()
      .find("svg")
      .click();
    return this;
  }

  selectTool(index, option) {
    this.getToolsContainer()
      .find('select[data-cy="selectStyle"]')
      .eq(index - 1)
      .select(option);
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

  clickOnDeleteGroupButton(groupName) {
    cy.contains("span", groupName)
      .find("svg")
      .click();
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

  selectLastControlOption(option) {
    cy.get('[data-cy="selectStyle"]')
      .last()
      .select(option);
    return this;
  }

  clickOnResetButton() {
    cy.contains("Reset")
      .eq(0)
      .click();
    return this;
  }
}

export default GraphingStandardPage;
