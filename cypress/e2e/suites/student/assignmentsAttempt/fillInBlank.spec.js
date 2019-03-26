import AssignmentsPage from "../../../framework/student/assignmentsPage";
import SidebarPage from "../../../framework/student/sidebarPage";
import FileHelper from "../../../framework/util/fileHelper";
import TestTypes from "./testTypes";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Test Assignment Page`, () => {
  const sideBarPage = new SidebarPage();
  const assignmentPage = new AssignmentsPage();
  const assignmentName = "Fill in the Blank Auto Test";
  const asgnstatus = {
    notstarted: "NOT STARTED",
    inprogress: "IN PROGRESS",
    sub: "SUBMITTED"
  };
  const buttonText = { start: "START ASSIGNMENT", retake: "RETAKE", resume: "RESUME", review: "REVIEW" };
  const answerData = {
    right: "FC Barcelona",
    wrong: "Real Madrid"
  };
  const ques = [
    {
      "Question 1": "Q1"
    },
    {
      "Question 2": "Q2"
    },
    // {
    //   "Question 3": "Q3"
    // },
    {
      "Question 4": "Q4"
    },
    {
      "Question 5": "Q5"
    }
    // {
    //   "Question 6": "Q6"
    // }
  ];

  let test;

  before(() => {
    cy.setToken("student");
  });
  context("Assignment attempt and stats", () => {
    before(() => {
      cy.deleteAllAssignments();
      cy.assignAssignment(TestTypes.fillInBlanks);
      cy.reload();
      cy.wait("@assignment");
    });

    context("1st attempt - test assessment player,attempt all questions and submit the test,validate", () => {
      it("Check Assignment Status", () => {
        assignmentPage.validateAssignment(assignmentName, asgnstatus.notstarted, buttonText.start);
        test = assignmentPage.clickOnAssignmentButton();
      });

      // it("Check dropdown and button navigation", () => {
      //   // dropdown navigation
      //   ques.forEach((queNum, index, allQue) => {
      //     const total = allQue.length;
      //     const key = Object.keys(queNum)[0];
      //     test.getQueDropDown().click();

      //     cy.contains(key)
      //       .should("be.visible")
      //       .click();

      //     cy.contains(queNum[key]).should("be.visible");

      //     if (index === 0) {
      //       test.getPrevious().should("be.disabled");

      //       test.getNext().should("not.be.disabled");
      //     }
      //     if (index > 0 && index < total - 1) {
      //       test.getPrevious().should("not.be.disabled");

      //       test.getNext().should("not.be.disabled");
      //     }
      //     if (index === total - 1) {
      //       test.getPrevious().should("not.be.disabled");

      //       test.getNext().should("not.have.class", "ant-btn-icon-only");
      //     }
      //   });

      //   // button navigation
      //   ques.reverse().forEach((queNum, index) => {
      //     if (index > 0) {
      //       const key = Object.keys(queNum)[0];
      //       test.clickOnPrevious();
      //       cy.contains(queNum[key]).should("be.visible");
      //     }
      //   });
      // });

      it("Check every question", () => {
        // attempt 1st que
        // wrong ans
        test.dragAndDropByIndex(answerData.wrong, 0);
        test.dragAndDropByIndex(answerData.right, 1);
        test.checkAnsValidateAsWrong();
        // right ans
        test.dragAndDropInsideQuestion(answerData.right, 0);
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q2").should("be.visible");

        // attempt 2nd que
        // wrong ans
        cy.get("div.template_box > div.ant-select")
          .eq(0)
          .click();
        cy.contains("li", answerData.wrong).click();
        test.checkAnsValidateAsWrong();

        // right ans
        cy.get("div.template_box > div.ant-select")
          .eq(0)
          .click();
        cy.contains("li", answerData.right).click();
        cy.get("div.template_box > div.ant-select")
          .eq(1)
          .click();
        cy.contains("li.ant-select-dropdown-menu-item-active", answerData.wrong).click();
        test.checkAnsValidateAsRight();

        // Q3 - Todo - Cloze With Text, site crashing entering cloze text detail page

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");

        // attempt 4rd que
        // wrong ans
        test.imageDragAndDropByIndex("Red", 2);
        test.imageDragAndDropByIndex("Orange", 1);
        test.imageDragAndDropByIndex("Green", 0);
        test.checkAnsValidateAsWrong();
        // right ans
        test.imageDragAndDropInsideQuestion("Red", 0);
        test.imageDragAndDropByIndex("Green", 2);
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        // attempt 5th que
        // wrong
        cy.get("div.imagelabeldragdrop-droppable")
          .eq(0)
          .click();
        cy.contains("li", "Orange").click();
        test.checkAnsValidateAsWrong();

        // exit assignment
        test.clickOnExitTest();
        test.clickOnCancel();
        test.clickOnExitTest();
        test.clickOnProceed();
        cy.url().should("include", "/home/assignments");
        assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.resume);
        // resume assignment
        assignmentPage.clickOnAssignmentButton();
        cy.contains("Q4").should("be.visible");

        // next que
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        // attempt 5th que
        // right
        cy.get("div.imagelabeldragdrop-droppable")
          .eq(0)
          .click();
        cy.contains("li", "Red").click();

        cy.get("div.imagelabeldragdrop-droppable")
          .eq(1)
          .click();
        cy.contains("li", "Green").click();

        cy.get("div.imagelabeldragdrop-droppable")
          .eq(2)
          .click();
        cy.contains("li", "White").click();
        test.checkAnsValidateAsRight();

        // Q6 - Todo - Cloze Image With Text, site crashing entering cloze text detail page

        test.clickOnNext();
        // review page
        test.submitTest();
        sideBarPage.clickOnAssignment();

        // validate stats
        assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.retake);
        assignmentPage.validateStats(1, "1/2", "4/4", "100%");
      });
    });

    context("2nd attempt - attempt questions,submit the test,validate stats", () => {
      it("Check every question", () => {
        test = assignmentPage.clickOnAssignmentButton();
        cy.contains("Q1").should("be.visible");

        // attempt 1st que
        // right ans
        test.dragAndDropByIndex(answerData.wrong, 1);
        test.dragAndDropByIndex(answerData.right, 0);
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q2").should("be.visible");

        // attempt 2nd que
        // wrong ans
        cy.get("div.template_box > div.ant-select")
          .eq(0)
          .click();
        cy.contains("li", answerData.wrong).click();
        test.checkAnsValidateAsWrong();

        // Q3 - Todo - Cloze With Text, site crashing entering cloze text detail page

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");

        // attempt 4rd que
        // wrong ans
        test.imageDragAndDropByIndex("Red", 2);
        test.imageDragAndDropByIndex("Orange", 1);
        test.imageDragAndDropByIndex("Green", 0);
        test.checkAnsValidateAsWrong();

        // next que
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        // attempt 5th que
        // right
        cy.get("div.imagelabeldragdrop-droppable")
          .eq(0)
          .click();
        cy.contains("li", "Red").click();

        cy.get("div.imagelabeldragdrop-droppable")
          .eq(1)
          .click();
        cy.contains("li", "Green").click();

        cy.get("div.imagelabeldragdrop-droppable")
          .eq(2)
          .click();
        cy.contains("li", "White").click();
        test.checkAnsValidateAsRight();

        // Q6 - Todo - Cloze Image With Text, site crashing entering cloze text detail page

        test.clickOnNext();

        // review page
        const reportsPage = test.submitTest();
        // validate stats
        reportsPage.validateAssignment(assignmentName, asgnstatus.sub, buttonText.review);
        reportsPage.validateStats(2, "2/2", "2/4", "50%");
        reportsPage.validateAttemptLinkStats(2, 1, "4/4", "100%");

        sideBarPage.clickOnAssignment();
        cy.contains(assignmentName).should("not.be.visible");
      });
    });
  });
});
