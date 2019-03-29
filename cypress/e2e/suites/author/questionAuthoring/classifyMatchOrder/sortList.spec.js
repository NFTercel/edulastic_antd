import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import SortListPage from "../../../../framework/author/itemList/questionType/classifyMatchOrder/sortListPage";
import FileHelper from "../../../../framework/util/fileHelper";
import Helpers from "../../../../framework/util/Helpers";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Sort List" type question`, () => {
  const queData = {
    group: "Classify, Match & Order",
    queType: "Sort List"
  };

  const question = new SortListPage();
  const editItem = new EditItemPage();

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      cy.deleteOldQuestion({ editItem });
      cy.selectQuestionType({ editItem, queData });
    });

    context("Advanced Options", () => {
      before("visit items page and select question type", () => {
        cy.selectQuestionType({ editItem, queData });
      });

      beforeEach(() => {
        editItem.header.edit();
        editItem.showAdvancedOptions();
      });

      afterEach(() => {
        editItem.header.edit();
      });

      describe("Layout", () => {
        it("should be able to select small font size", () => {
          const select = question.getFontSizeSelect();
          const { name, font } = Helpers.fontSize("small");

          select.should("be.visible").click();

          question
            .getSmallFontSizeOption()
            .should("be.visible")
            .click();

          select.should("contain", name);
          question.checkFontSize(font);
        });
        it("should be able to select normal font size", () => {
          const select = question.getFontSizeSelect();
          const { name, font } = Helpers.fontSize("normal");

          select.should("be.visible").click();

          question
            .getNormalFontSizeOption()
            .should("be.visible")
            .click();

          select.should("contain", name);
          question.checkFontSize(font);
        });
        it("should be able to select large font size", () => {
          const select = question.getFontSizeSelect();
          const { name, font } = Helpers.fontSize("large");

          select.should("be.visible").click();

          question
            .getLargeFontSizeOption()
            .should("be.visible")
            .click();

          select.should("contain", name);
          question.checkFontSize(font);
        });
        it("should be able to select extra large font size", () => {
          const select = question.getFontSizeSelect();
          const { name, font } = Helpers.fontSize("xlarge");

          select.should("be.visible").click();

          question
            .getExtraLargeFontSizeOption()
            .should("be.visible")
            .click();

          select.should("contain", name);
          question.checkFontSize(font);
        });
        it("should be able to select huge font size", () => {
          const select = question.getFontSizeSelect();
          const { name, font } = Helpers.fontSize("xxlarge");

          select.should("be.visible").click();

          question
            .getHugeFontSizeOption()
            .should("be.visible")
            .click();

          select.should("contain", name);
          question.checkFontSize(font);
        });
        it("should be able to select horizontal orientation", () => {
          const select = question.getOrientationSelect();

          select.should("be.visible").click();

          question
            .getHorizontalOption()
            .should("be.visible")
            .click();

          select.should("contain", "Horizontal");
          question.checkOrientation("horizontal");
        });
        it("should be able to select vertical orientation", () => {
          const select = question.getOrientationSelect();

          select.should("be.visible").click();

          question
            .getVerticalOption()
            .should("be.visible")
            .click();

          select.should("contain", "Vertical");
          question.checkOrientation("vertical");
        });
      });
    });
  });
});
