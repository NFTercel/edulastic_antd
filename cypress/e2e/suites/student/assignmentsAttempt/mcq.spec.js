import AssignmentsPage from "../../../framework/student/assignmentsPage";
import SidebarPage from "../../../framework/student/sidebarPage";
import FileHelper from "../../../framework/util/fileHelper";
import TestTypes from "./testTypes";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Test Assignment Page`, () => {
  const sideBarPage = new SidebarPage();
  const assignmentPage = new AssignmentsPage();
  const assignmentName = "MCQ Auto Test";
  const asgnstatus = {
    notstarted: "NOT STARTED",
    inprogress: "IN PROGRESS",
    sub: "SUBMITTED"
  };
  const answerData = {
    right: "FC Barcelona",
    wrong: "Real Madrid"
  };
  const buttonText = { start: "START ASSIGNMENT", retake: "RETAKE", resume: "RESUME", review: "REVIEW" };

  const ques = [
    {
      "Question 1": "Q1"
    },
    {
      "Question 2": "Q2"
    },
    {
      "Question 3": "Q3"
    },
    {
      "Question 4": "Q4"
    },
    {
      "Question 5": "Q5"
    },
    {
      "Question 6": "Q6"
    },
    {
      "Question 7": "Q7"
    }
  ];

  let test;

  before(() => {
    cy.setToken("student");
  });
  context("Assignment attempt and stats", () => {
    before(() => {
      cy.deleteAllAssignments();
      cy.assignAssignment(TestTypes.multipleChoice);
      cy.reload();
      cy.wait("@assignment");
    });

    context("1st attempt - test assessment player,attempt all questions and submit the test,validate", () => {
      it("Check Assignment Status", () => {
        assignmentPage.validateAssignment(assignmentName, asgnstatus.notstarted, buttonText.start);
        test = assignmentPage.clickOnAssignmentButton();
      });

      it("Check dropdown and button navigation", () => {
        // dropdown navigation
        ques.forEach((queNum, index, allQue) => {
          const total = allQue.length;
          const key = Object.keys(queNum)[0];
          test.getQueDropDown().click();

          cy.contains(key)
            .should("be.visible")
            .click();

          cy.contains(queNum[key]).should("be.visible");

          if (index === 0) {
            test.getPrevious().should("be.disabled");

            test.getNext().should("not.be.disabled");
          }
          if (index > 0 && index < total - 1) {
            test.getPrevious().should("not.be.disabled");

            test.getNext().should("not.be.disabled");
          }
          if (index === total - 1) {
            test.getPrevious().should("not.be.disabled");

            test.getNext().should("not.have.class", "ant-btn-icon-only");
          }
        });

        // button navigation
        ques.reverse().forEach((queNum, index) => {
          if (index > 0) {
            const key = Object.keys(queNum)[0];
            test.clickOnPrevious();
            cy.contains(queNum[key]).should("be.visible");
          }
        });
      });

      it("Check every question", () => {
        // attempt 1st que
        // wrong ans
        cy.contains("Violet")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();
        // right ans
        cy.contains("Red")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q2").should("be.visible");

        // attempt 2nd que
        // wrong ans
        cy.contains("Orange")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();
        // right ans
        cy.contains("Red")
          .should("be.visible")
          .click();
        // test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q3").should("be.visible");

        // attempt 3rd que
        // wrong ans
        cy.contains("False")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();
        // right ans
        cy.contains("True")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");
        // attempt 4th que
        // wrong
        cy.contains("Dublin")
          .eq(0)
          .click();
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
        cy.contains("Q3").should("be.visible");

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");
        // attempt 4th que
        // right
        cy.contains("Dublin")
          .eq(0)
          .click();
        cy.contains("London")
          .eq(0)
          .click();
        // test.checkAnsValidateAsRight();

        // attempt 5th que
        // wrong
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 5th que
        // right
        cy.contains("Q5").should("be.visible");
        test.clickSecondRadioByTitle(answerData.wrong);
        test.clickFirstRadioByTitle(answerData.right);
        test.checkAnsValidateAsRight();

        // attempt 6th que
        // wrong
        test.clickOnNext();
        cy.contains("Q6").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 6th que
        // right
        cy.contains("Q6").should("be.visible");
        test.clickSecondRadioByTitle(answerData.wrong);
        test.clickFirstRadioByTitle(answerData.right);
        test.checkAnsValidateAsRight();

        // attempt 7th que
        // wrong
        test.clickOnNext();
        cy.contains("Q7").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 7th que
        // right
        cy.contains("Q7").should("be.visible");
        test.clickSecondRadioByTitle(answerData.wrong);
        test.clickFirstRadioByTitle(answerData.right);
        test.checkAnsValidateAsRight();

        test.clickOnNext();
        // review page
        test.submitTest();
        sideBarPage.clickOnAssignment();

        // validate stats
        assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.retake);
        assignmentPage.validateStats(1, "1/3", "7/7", "100%");
      });
    });

    context("2nd attempt - attempt questions,submit the test,validate stats", () => {
      it("Check every question", () => {
        test = assignmentPage.clickOnAssignmentButton();
        cy.contains("Q1").should("be.visible");

        // right ans
        cy.contains("Red")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q2").should("be.visible");

        // attempt 2nd que
        // right ans
        cy.contains("Orange")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();

        // next que
        test.clickOnNext();
        cy.contains("Q3").should("be.visible");

        // attempt 3rd que
        // right ans
        cy.contains("True")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");
        // attempt 4th que
        // right
        cy.contains("Dublin")
          .eq(0)
          .click();
        test.checkAnsValidateAsWrong();

        // attempt 5th que
        // wrong
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 6th que
        // wrong
        test.clickOnNext();
        cy.contains("Q6").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 7th que
        // wrong
        test.clickOnNext();
        cy.contains("Q7").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        test.clickOnNext();
        // review page
        test.submitTest();
        sideBarPage.clickOnAssignment();

        // validate stats
        assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.retake);
        assignmentPage.validateStats(2, "2/3", "2/7", "28.57%");
        // assignmentPage.validateAttemptLinkStats(2, 1, "7/7", "100%");
      });
    });

    context("3rd attempt - attempt questions,submit the test,validate stats", () => {
      it("Check every question for last attempt", () => {
        test = assignmentPage.clickOnAssignmentButton();
        cy.contains("Q1").should("be.visible");

        // right ans
        cy.contains("Red")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsRight();

        // next que
        test.clickOnNext();
        cy.contains("Q2").should("be.visible");

        // attempt 2nd que
        // right ans
        cy.contains("Orange")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();

        // next que
        test.clickOnNext();
        cy.contains("Q3").should("be.visible");

        // attempt 3rd que
        // right ans
        cy.contains("False")
          .should("be.visible")
          .click();
        test.checkAnsValidateAsWrong();

        // next que
        test.clickOnNext();
        cy.contains("Q4").should("be.visible");
        // attempt 4th que
        // right
        cy.contains("Dublin")
          .eq(0)
          .click();
        test.checkAnsValidateAsWrong();

        // attempt 5th que
        // wrong
        test.clickOnNext();
        cy.contains("Q5").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 6th que
        // wrong
        test.clickOnNext();
        cy.contains("Q6").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        // attempt 7th que
        // wrong
        test.clickOnNext();
        cy.contains("Q7").should("be.visible");
        test.clickFirstRadioByTitle(answerData.wrong);
        test.clickSecondRadioByTitle(answerData.right);
        test.checkAnsValidateAsWrong();

        test.clickOnNext();
        // review page
        const reportsPage = test.submitTest();
        // validate stats
        reportsPage.validateAssignment(assignmentName, asgnstatus.sub, buttonText.review);
        reportsPage.validateStats(3, "3/3", "1/7", "14.28%");
        // reportsPage.validateAttemptLinkStats(3, 1, "7/7", "100%");
        reportsPage.validateAttemptLinkStats(3, 2, "2/7", "28.57%");

        sideBarPage.clickOnAssignment();
        cy.contains(assignmentName).should("not.be.visible");
      });
    });
  });
});
