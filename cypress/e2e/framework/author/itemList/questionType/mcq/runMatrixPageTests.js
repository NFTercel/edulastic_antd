import Helpers from "../../../../util/Helpers";
import ChoiceMatrixPage from "./choiceMatrixPage";
import EditItemPage from "../../itemDetail/editPage";

const runMatrixPageTests = queData => {
  const editItem = new EditItemPage();
  const question = new ChoiceMatrixPage();

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });
    it("[Tc_318] => edit question text", () => {
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);
    });

    it("[Tc_319] => edit/delete multiple choice options", () => {
      // edit the 1st ans choice
      question
        .getChoiceByIndex(0)
        .clear()
        .type(queData.formattext)
        .should("contain", queData.formattext);

      // delete the 1st ans choice
      question.deleteChoiceByIndex(0);

      question.getChoiceByIndex(0).should("not.contain", queData.formattext);

      // add new choice
      question.addNewChoice();

      question
        .getChoiceByIndex(3)
        .type(queData.formattext)
        .should("contain", queData.formattext);

      question.getallChoices().should("be.have.length", 4);
    });

    it("[Tc_320] => edit/delete steam options", () => {
      // edit the 1st steam
      question
        .getSteamByIndex(0)
        .clear()
        .type(queData.formattext)
        .should("contain", queData.formattext);

      // delete the 1st steam
      question.deleteSteamByIndex(0);

      question.getSteamByIndex(0).should("not.contain", queData.formattext);

      // add new steam
      question.addNewSteam();

      question
        .getSteamByIndex(1)
        .type(queData.formattext)
        .should("contain", queData.formattext);

      question.getallSteam().should("be.have.length", 2);
    });

    it("[Tc_321] => set correct ans,multiple response,alternate", () => {
      // setting correct ans
      question.getCorrectAnsTable().each(($ele, index) => {
        cy.wrap($ele)
          .find("input")
          .eq(index % 2)
          .click();
      });

      // points

      // add alternate
      question.addAlternate();

      question.getAlternates().should("have.length", 1);

      // delete alternate
      question.deleteAlternate();

      question.getAlternates().should("not.exist");

      // check muplti response
      question.getMultipleResponse().click();
      question.getCorrectAnsTable().each($ele => {
        cy.wrap($ele)
          .find("input")
          .should("have.attr", "type", "checkbox");
      });
    });
  });

  context("[sanity-test] => create basic question and validate", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });
    it("[choice_std_s1] => create basic question and save", () => {
      // question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      // add choices
      question
        .getallChoices()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteChoiceByIndex(cusIndex);
        })
        .should("have.length", 0);

      queData.ansChoice.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });

      // add steam
      question
        .getallSteam()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteSteamByIndex(cusIndex);
        })
        .should("have.length", 0);

      queData.steams.forEach((ch, index) => {
        question
          .addNewSteam()
          .getSteamByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });

      // set correct ans
      question.getCorrectAnsTable().each(($ele, index) => {
        cy.wrap($ele)
          .find("input")
          .eq((index + 1) % 2)
          .click();
      });
      // save question
      question.header.save();
    });

    it("[choice_std_s1] => validate basic question with default setting", () => {
      // preview
      const preview = editItem.header.preview();

      // give correct ans and validate
      question.getCorrectAnsTable().each(($ele, index) => {
        cy.wrap($ele)
          .find("input")
          .eq((index + 1) % 2)
          .click();
      });

      preview.getCheckAnswer().click({ force: true });

      preview.getAntMsg().should("contain", "score: 1/1");

      preview.getClear().click();

      // give wrong ans and validate
      question.getCorrectAnsTable().each(($ele, index) => {
        cy.wrap($ele)
          .find("input")
          .eq(index % 2)
          .click();
      });

      preview.getCheckAnswer().click({ force: true });

      preview.getAntMsg().should("contain", "score: 0/1");
    });
  });

  context("Advanced Options", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
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
      it("should be able to select Inline matrix style", () => {
        const option = "Inline";
        question.selectMatrixStyle(option);
        question.checkMatrixStyle(option);
      });
      it("should be able to select Table matrix style", () => {
        const option = "Table";
        question.selectMatrixStyle(option);
        question.checkMatrixStyle(option);
      });
      it("should be able to show a stem numeration select after a table matrix style selected", () => {
        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
      });
      it("should be able to hide a stem numeration select after a inline matrix style selected", () => {
        question.selectMatrixStyle("Inline");
        question.getStemNumerationSelect().should("not.be.visible");
      });
      it("should be able to select a numerical stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.selectStemNumeration("Numerical");
      });
      it("should be able to select an uppercase alphabet stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.selectStemNumeration("Uppercase alphabet");
      });
      it("should be able to select an lowercase alphabet stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.selectStemNumeration("Lowercase alphabet");
      });
      it("should be able to type stem column title", () => {
        const text = "Stem column title";

        question
          .getStemColumnTitle()
          .should("be.visible")
          .clear()
          .type(text)
          .should("contain", text);

        question.checkTableTitle(text);
      });
      it("should be able to type option row title", () => {
        const text = "Option row title";

        question
          .getOptionRowTitle()
          .should("be.visible")
          .clear()
          .type(text)
          .should("contain", text);

        question.checkTableTitle(text);
      });
      it("should be able to change stem width if inline style selected", () => {
        const width = 200;

        question
          .getStemWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Inline");
        question.checkTableColumnWidth(0, width);
      });
      it("should be able to change stem width if table style selected", () => {
        const width = 200;

        question
          .getStemWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.checkTableColumnWidth(0, width);
      });
      it("should be able to change stem width if table style selected and Numerical Stem numeration selected", () => {
        const width = 121;

        question
          .getStemWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Numerical");
        question.checkTableColumnWidth(1, width);
      });
      it("should be able to select Numerical stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Numerical");
        question.checkStemNumeration("number");
      });
      it("should be able to select Uppercase alphabet stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Uppercase alphabet");
        question.checkStemNumeration("upper-alpha");
      });
      it("should be able to select Lowercase alphabet stem numeration", () => {
        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Lowercase alphabet");
        question.checkStemNumeration("lower-alpha");
      });
      it("should be able to change stem width if table style selected and Uppercase alphabet Stem numeration selected", () => {
        const width = 120;

        question
          .getStemWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Uppercase alphabet");
        question.checkTableColumnWidth(1, width);
      });
      it("should be able to change stem width if table style selected and Lowercase alphabet Stem numeration selected", () => {
        const width = 211;

        question
          .getStemWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Lowercase alphabet");
        question.checkTableColumnWidth(1, width);
      });
      it("should be able to change option width if if table style selected and Numerical Stem numeration selected", () => {
        const width = 135;

        question
          .getOptionWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Numerical");
        question.checkTableColumnWidth(2, width);
        question.checkTableColumnWidth(3, width);
      });
      it("should be able to change option width if if table style selected and Uppercase alphabet Stem numeration selected", () => {
        const width = 140;

        question
          .getOptionWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Uppercase alphabet");
        question.checkTableColumnWidth(2, width);
        question.checkTableColumnWidth(3, width);
      });
      it("should be able to change option width if if table style selected and Lowercase alphabet Stem numeration selected", () => {
        const width = 155;

        question
          .getOptionWidth()
          .should("be.visible")
          .type(`{selectall}${width}`, { force: true })
          .should("have.value", `${width}`);

        question.selectMatrixStyle("Table");
        question.getStemNumerationSelect().should("be.visible");
        question.selectStemNumeration("Lowercase alphabet");
        question.checkTableColumnWidth(2, width);
        question.checkTableColumnWidth(3, width);
      });
      it("should be able to check dividers checkbox", () => {
        question
          .getDividersCheckbox()
          .should("be.visible")
          .check({ force: true })
          .should("be.checked");

        question.checkDividers(true);
      });
      it("should be able to uncheck dividers checkbox", () => {
        question
          .getDividersCheckbox()
          .should("be.visible")
          .uncheck({ force: true })
          .should("not.be.checked");

        question.checkDividers(false);
      });
    });
  });
};

export default runMatrixPageTests;
