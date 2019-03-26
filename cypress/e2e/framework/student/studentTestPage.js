import ReportsPage from "./reportsPage";
class StudentTestPage {
  checkAnsValidateAsWrong() {
    cy.get("[data-cy=checkAnswer]")
      .should("be.visible")
      .click();
    cy.get("body")
      .contains("score: 0 / 1")
      .should("be.visible");
  }

  checkAnsValidateAsRight() {
    cy.get("[data-cy=checkAnswer]")
      .should("be.visible")
      .click();
    cy.get("body")
      .contains("score: 1 / 1")
      .should("be.visible");
  }

  getNext() {
    return cy.get("[data-cy=next]");
  }

  clickOnNext() {
    cy.wait(500);
    this.getNext()
      .should("be.visible")
      .click();
  }

  getPrevious() {
    return cy.get("[data-cy=prev]");
  }

  clickOnPrevious() {
    this.getPrevious()
      .should("be.visible")
      .click();
  }

  //  click on finish test
  clickOnExitTest() {
    cy.get("[data-cy=finishTest]")
      .should("be.visible")
      .click();
  }

  clickOnCancel() {
    cy.get("[data-cy=cancel]")
      .should("be.visible")
      .click();
  }

  clickOnProceed() {
    cy.get("[data-cy=proceed]")
      .should("be.visible")
      .click();
  }

  submitTest() {
    cy.contains("SUBMIT")
      .as("submit")
      .should("be.visible")
      .click();
    this.clickOnCancel();

    cy.get("@submit").click();
    cy.get("[data-cy=submit]")
      .should("be.visible")
      .click();
    cy.url().should("include", "/home/reports");
    return new ReportsPage();
  }

  getQueDropDown() {
    return cy.get("[data-cy=options]").should("be.visible");
  }

  clickOnMenuCheckAns() {
    cy.get("[data-cy=setting]")
      .should("be.visible")
      .click();
    cy.contains("Check Answer")
      .should("be.visible")
      .click();
  }

  getHint() {
    return cy.contains("hint").should("be.visible");
  }

  getBookmark() {
    return cy.contains("bookmark").should("be.visible");
  }

  clickFirstRadioByTitle = title =>
    cy
      .contains("p", title)
      .closest("td")
      .next()
      .find(">div")
      .find("input")
      .click()
      .parent()
      .should("have.class", "ant-radio-checked");

  clickSecondRadioByTitle = title =>
    cy
      .contains("p", title)
      .closest("td")
      .next()
      .next()
      .find(">div")
      .find("input")
      .click()
      .parent()
      .should("have.class", "ant-radio-checked");

  getAnswerBox = () => cy.get(".responses_box");

  getQuestionBox = () => cy.get(".template_box ");

  dragAndDropByIndex = (answer, questionIndex) => {
    this.getAnswerBox()
      .contains("div", answer)
      .customDragDrop(`#response-container-${questionIndex}`)
      .then(() => {
        this.getQuestionBox().contains("div", answer);
      });
    return this;
  };

  dragAndDropInsideQuestion = (answer, questionIndex) => {
    this.getQuestionBox()
      .contains("div", answer)
      .customDragDrop(`#response-container-${questionIndex}`)
      .then(() => {
        this.getQuestionBox().contains("div", answer);
      });
    return this;
  };

  getImageQuestionBox = () => cy.get(".imagedragdrop_template_box ");

  imageDragAndDropByIndex = (answer, questionIndex) => {
    this.getAnswerBox()
      .contains("div", answer)
      .customDragDrop(`#answerboard-dragdropbox-${questionIndex}`)
      .then(() => {
        this.getImageQuestionBox().contains("div", answer);
      });
    return this;
  };

  imageDragAndDropInsideQuestion = (answer, questionIndex) => {
    this.getImageQuestionBox()
      .contains("div", answer)
      .customDragDrop(`#answerboard-dragdropbox-${questionIndex}`)
      .then(() => {
        this.getImageQuestionBox().contains("div", answer);
      });
    return this;
  };
}
export default StudentTestPage;
