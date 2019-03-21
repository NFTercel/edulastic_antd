import AssignmentsPage from "../../framework/student/assignmentsPage";
import SidebarPage from "../../framework/student/sidebarPage";
import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Test Assignment Page`, () => {
  const sideBarPage = new SidebarPage();
  const assignmentPage = new AssignmentsPage();
  const assignmentName = "Auto Test Assignment";
  const asgnstatus = {
    notstarted: "NOT STARTED",
    inprogress: "IN PROGRESS",
    sub: "SUBMITTED"
  };
  const buttonText = { start: "START ASSIGNMENT", retake: "RETAKE", resume: "RESUME", review: "REVIEW" };

  before(() => {
    cy.setToken("student");
  });

  context("Assignment attempt and stats", () => {
    before(() => {
      cy.deleteAllAssignments();
      cy.assignAssignment();
      cy.reload();
      cy.wait("@assignment");
    });

    it("1st attempt - test assessment player,attempt all questions and submit the test,validate", () => {
      assignmentPage.validateAssignment(assignmentName, asgnstatus.notstarted, buttonText.start);
      const test = assignmentPage.clickOnAssignmentButton();
      // navigation
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
        }
      ];

      // dropdown navigation
      ques.forEach((queNum, index, allQue) => {
        const total = allQue.length;
        const key = Object.keys(queNum)[0];
        test.getQueDropDown().click();

        cy.contains(key)
          .should("be.visible")
          .click();

        cy.contains(queNum[key]).should("be.visible");

        if (index == 0) {
          test.getPrevious().should("be.disabled");

          test.getNext().should("not.be.disabled");
        }
        if (index > 0 && index < total - 1) {
          test.getPrevious().should("not.be.disabled");

          test.getNext().should("not.be.disabled");
        }
        if (index == total - 1) {
          test.getPrevious().should("not.be.disabled");

          test.getNext().should("not.have.class", "ant-btn-icon-only");
        }
      });

      // button navigation
      ques.reverse().forEach((queNum, index, allQue) => {
        const total = allQue.length;
        if (index > 0) {
          const key = Object.keys(queNum)[0];
          test.clickOnPrevious();
          cy.contains(queNum[key]).should("be.visible");
        }
      });

      // attempt 1st que
      // wrong ans
      cy.contains("Red")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();
      // right ans
      cy.contains("Violet")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsRight();

      // next que
      test.clickOnNext();
      cy.contains("Q2").should("be.visible");

      // attempt 2nd que
      // wrong ans
      cy.contains("TRUE")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();
      // right ans
      cy.contains("true")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsRight();

      // next que
      test.clickOnNext();
      cy.contains("Q3").should("be.visible");

      // attempt 3rd que
      // wrong ans
      cy.contains("True")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();
      // right ans
      cy.contains("False")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsRight();

      // next que
      test.clickOnNext();
      cy.contains("Q4").should("be.visible");
      // attempt 4th que
      // wrong
      cy.get("div.template_box > div.ant-select")
        .eq(0)
        .click();
      cy.contains("li", "optionB").click();
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
      cy.get("div.template_box > div.ant-select")
        .eq(0)
        .click();
      cy.contains("li", "optionA").click();
      test.checkAnsValidateAsRight();

      test.clickOnNext();
      // review page
      test.submitTest();
      sideBarPage.clickOnAssignment();

      // validate stats
      assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.retake);
      assignmentPage.validateStats(1, "1/3", "4/4", "100%");
    });

    it("2nd attempt - attempt questions,submit the test,validate stats", () => {
      const test = assignmentPage.clickOnAssignmentButton();
      cy.contains("Q1").should("be.visible");
      // attempt 1st que
      // right ans
      cy.contains("Violet")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsRight();

      // next que
      test.clickOnNext();
      cy.contains("Q2").should("be.visible");
      // attempt 2nd que
      // wrong ans
      cy.contains("FALSE")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();

      // next que
      test.clickOnNext();
      cy.contains("Q3").should("be.visible");
      // attempt 3rd que
      // wrong ans
      cy.contains("True")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();

      // next que
      test.clickOnNext();
      cy.contains("Q4").should("be.visible");
      // attempt 4th que
      // wrong
      cy.get("div.template_box > div.ant-select")
        .eq(0)
        .click();
      cy.contains("li", "optionB").click();
      test.checkAnsValidateAsWrong();

      test.clickOnNext();
      // review page
      test.submitTest();
      sideBarPage.clickOnAssignment();

      // validate stats
      assignmentPage.validateAssignment(assignmentName, asgnstatus.inprogress, buttonText.retake);
      assignmentPage.validateStats(2, "2/3", "1/4", "25%");
      assignmentPage.validateAttemptLinkStats(2, 1, "4/4", "100%");
    });

    it("3rd attempt - attempt questions,submit the test,validate stats", () => {
      const test = assignmentPage.clickOnAssignmentButton();
      cy.contains("Q1").should("be.visible");
      // attempt 1st que
      // wrong ans
      cy.contains("White")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();

      // next que
      test.clickOnNext();
      cy.contains("Q2").should("be.visible");
      // attempt 2nd que
      // wrong ans
      cy.contains("FALSE")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsWrong();

      // next que
      test.clickOnNext();
      cy.contains("Q3").should("be.visible");
      // attempt 3rd que
      // wrong ans
      cy.contains("False")
        .should("be.visible")
        .click();
      test.checkAnsValidateAsRight();

      // next que
      test.clickOnNext();
      cy.contains("Q4").should("be.visible");
      // attempt 4th que
      // wrong
      cy.get("div.template_box > div.ant-select")
        .eq(0)
        .click();
      cy.contains("li", "optionA").click();
      test.checkAnsValidateAsRight();

      test.clickOnNext();
      // review page
      const reportsPage = test.submitTest();
      // validate stats
      reportsPage.validateAssignment(assignmentName, asgnstatus.sub, buttonText.review);
      reportsPage.validateStats(3, "3/3", "2/4", "50%");
      reportsPage.validateAttemptLinkStats(3, 1, "4/4", "100%");
      reportsPage.validateAttemptLinkStats(3, 2, "1/4", "25%");

      sideBarPage.clickOnAssignment();
      cy.contains(assignmentName).should("not.be.visible");
    });
  });

  context("Assignment with start and due-date scenarios", () => {
    before("delete all old assignment", () => {
      cy.deleteAllAssignments();
    });

    it("Verify assignments entry before and after due date", () => {
      cy.server();
      cy.route("GET", "**assignments**").as("asgns");
      cy.route("GET", "**summary**").as("summary");

      let start = new Date();
      let end = new Date();
      end.setSeconds(end.getSeconds() + 30);

      // assign assignment with 30 sec future duedate
      cy.assignAssignment(start, end);
      // validate assignment entry present
      cy.reload();
      cy.wait("@asgns");
      cy.wait("@summary");
      assignmentPage.validateAssignment(assignmentName, asgnstatus.notstarted, buttonText.start);

      // wait for due date
      cy.wait(30000);
      // validate assignment entry not present
      cy.reload();
      cy.wait("@asgns");
      cy.wait("@summary");
      assignmentPage.getAssignmentButton().should("not.be.visible");
    });
  });
});
