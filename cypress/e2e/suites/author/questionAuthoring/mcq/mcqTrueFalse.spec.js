/// <reference types="Cypress" />
import ItemListPage from "../../../../framework/author/itemList/itemListPage.js";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import MCQTrueFalsePage from "../../../../framework/author/itemList/questionType/mcq/mcqTrueFalsePage.js";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "True or false" type question`, () => {
  const queData = {
    group: "Multiple Choice",
    queType: "True or false",
    queText: "Which is following option is true :",
    choices: ["TrueOption", "FalseOption"],
    correct: ["TrueOption"],
    alterate: ["trueOption"],
    extlink: "www.testdomain.com",
    formattext: "formattedtext",
    formula: "s=ar^2"
  };
  const question = new MCQTrueFalsePage();
  const editItem = new EditItemPage();
  const text = "testtext";
  const formates = question.formates;

  before(() => {
    cy.setToken();
  });

  context("User creates question.", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("[Tc_284]:test => Enter question text", () => {
      // edit text
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      // add formatting
      question
        .getQuestionEditor()
        .clear()
        .type(queData.formattext);

      formates.forEach(formate => {
        const text = queData.formattext;
        const { sel, tag } = formate;

        question
          .getQuestionEditor()
          .find("p")
          .makeSelection();

        question.editToolBar
          .stimulus()
          .find(sel)
          .click();

        question
          .getQuestionEditor()
          .contains(tag, text)
          .should("have.length", 1);

        question.editToolBar
          .stimulus()
          .find(sel)
          .click();

        question
          .getQuestionEditor()
          .find(tag)
          .should("not.be.exist");
      });
    });

    it("[Tc_285]:test => Multiple choices options", () => {
      // check default choice options
      question
        .getAllChoices()
        .should("have.length", 2)
        .and("contain", "True")
        .and("contain", "False");

      // edit 1st choice
      question
        .getChoiceByIndex(0)
        .clear()
        .type(text)
        .should("contain", text);

      // delete all choices
      question
        .getAllChoices()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteChoiceByIndex(cusIndex);
        })
        .should("have.length", 0);

      // add new
      const choices = queData.choices;
      choices.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });
    });

    it("[Tc_286]:test => Set Correct Answer(s)", () => {
      // update points
      question.getPoints().verifyNumInput(0.5);

      // select correct ans
      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });

      // alternate
      question.addAlternate();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });
    });

    it("[Tc_287]:test => Advanced Options", () => {
      question.clickOnAdvancedOptions();

      // scoring
      question.getMaxScore().verifyNumInput(1);

      question
        .getEnableAutoScoring()
        .click()
        .then($el => {
          cy.wrap($el).should("have.class", "ant-checkbox-checked");

          question
            .getCheckAnswerCheckbox()
            .click()
            .should("have.class", "ant-checkbox-checked")
            .click()
            .should("not.have.class", "ant-checkbox-checked");

          question.selectScoringType("Exact match");

          question.getPanalty().verifyNumInput(1);

          question.getCheckAnsAttempt().verifyNumInput(1);

          question.getMinScore().verifyNumInput(1);

          question
            .getUnscore()
            .click()
            .then($el2 => {
              cy.wrap($el2).should("have.class", "ant-checkbox-checked");

              question.getMinScore().should("have.attr", "disabled");
            });

          question
            .getUnscore()
            .click()
            .should("not.have.class", "ant-checkbox-checked");
        });

      question
        .getEnableAutoScoring()
        .click()
        .should("not.have.class", "ant-checkbox-checked");
    });

    it("[Tc_288]:test => Layout", () => {
      question.getNumofCol().verifyNumInput(1);

      // font select
      question.selectFontSize("Small");

      // orientation select
      question.selectOrientation("Horizontal");

      // style select
      question.selectChoicesStyle("Block");

      // label type
      const labels = [
        {
          label: "Numerical",
          key: "1"
        },
        {
          label: "Uppercase alphabet",
          key: "A"
        },
        {
          label: "Lowercase alphabet",
          key: "a"
        }
      ];

      labels.forEach(option => {
        question.selectLabelType(option.label);
        question
          .getAllAnsChoicesLabel()
          .eq(0)
          .find("input")
          .next()
          .should("have.text", option.key);
      });

      question.selectChoicesStyle("Standard");
    });

    it("[Tc_289]:test => Save question", () => {
      editItem.header.save();
      cy.contains(queData.formattext).should("be.visible");
      cy.url().should("contain", "item-detail");
    });

    it("[Tc_290]:test => Preview Item", () => {
      // editItem.header.save(); //TODO-remove this line
      const preview = editItem.header.preview();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          cy.get("body")
            .children()
            .should("contain", "score");
        });

      preview.getClear().click();

      preview.getShowAnswer().click();

      preview.getClear().click();

      preview.header.edit();
    });
  });

  context("User edit the question.", () => {
    const queData = {
      group: "Multiple Choice",
      queType: "True or false",
      queText: "editedWhich is following option is true :",
      choices: ["editedTrue", "editedFalse"],
      correct: ["editedTrue"],
      alterate: ["editedtrue"],
      extlink: "editedwww.testdomain.com",
      formattext: "editedformattedtext",
      formula: "editeds=ar^2"
    };

    before("delete old question and create dummy que to edit", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
      question.header.save();
      // edit
      editItem.getEditButton().click();
    });

    it("[Tc_291]:test => Enter question text", () => {
      // edit text
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      // add formatting
      question
        .getQuestionEditor()
        .clear()
        .type(queData.formattext);

      formates.forEach(formate => {
        const text = queData.formattext;
        const { sel, tag } = formate;

        question
          .getQuestionEditor()
          .find("p")
          .makeSelection();

        question.editToolBar
          .stimulus()
          .find(sel)
          .click();

        question
          .getQuestionEditor()
          .contains(tag, text)
          .should("have.length", 1);

        question.editToolBar
          .stimulus()
          .find(sel)
          .click();

        question
          .getQuestionEditor()
          .find(tag)
          .should("not.be.exist");
      });
    });

    it("[Tc_292]:test => Multiple choices options", () => {
      // check default choice options
      question
        .getAllChoices()
        .should("have.length", 2)
        .and("contain", "True")
        .and("contain", "False");

      // edit 1st choice
      question
        .getChoiceByIndex(0)
        .clear()
        .type(text)
        .should("contain", text);

      // delete all choices
      question
        .getAllChoices()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteChoiceByIndex(cusIndex);
        })
        .should("have.length", 0);

      // add new
      const choices = queData.choices;
      choices.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });
    });

    it("[Tc_293]:test => Set Correct Answer(s)", () => {
      // update points
      question.getPoints().verifyNumInput(0.5);

      // select correct ans
      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });

      // alternate
      question.addAlternate();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });
    });

    it("[Tc_294]:test => Advanced Options", () => {
      question.clickOnAdvancedOptions();

      // scoring
      question.getMaxScore().verifyNumInput(1);

      question
        .getEnableAutoScoring()
        .click()
        .then($el => {
          cy.wrap($el).should("have.class", "ant-checkbox-checked");

          question
            .getCheckAnswerCheckbox()
            .click()
            .should("have.class", "ant-checkbox-checked")
            .click()
            .should("not.have.class", "ant-checkbox-checked");

          question.selectScoringType("Exact match");

          question.getPanalty().verifyNumInput(1);

          question.getCheckAnsAttempt().verifyNumInput(1);

          question.getMinScore().verifyNumInput(1);

          question
            .getUnscore()
            .click()
            .then($el2 => {
              cy.wrap($el2).should("have.class", "ant-checkbox-checked");

              question.getMinScore().should("have.attr", "disabled");
            });

          question
            .getUnscore()
            .click()
            .should("not.have.class", "ant-checkbox-checked");
        });

      question
        .getEnableAutoScoring()
        .click()
        .should("not.have.class", "ant-checkbox-checked");
    });

    it("[Tc_295]:test => Layout", () => {
      question.getNumofCol().verifyNumInput(1);

      // font select
      question.selectFontSize("Small");

      // orientation select
      question.selectOrientation("Horizontal");

      // style select
      question.selectChoicesStyle("Block");

      // label type
      const labels = [
        {
          label: "Numerical",
          key: "1"
        },
        {
          label: "Uppercase alphabet",
          key: "A"
        },
        {
          label: "Lowercase alphabet",
          key: "a"
        }
      ];

      labels.forEach(option => {
        question.selectLabelType(option.label);
        question
          .getAllAnsChoicesLabel()
          .eq(0)
          .find("input")
          .next()
          .should("have.text", option.key);
      });

      question.selectChoicesStyle("Standard");
    });

    it("[Tc_296]:test => Save question", () => {
      editItem.header.save();
      cy.contains(queData.formattext).should("be.visible");
      cy.url().should("contain", "item-detail");
    });

    it("[Tc_297]:test => Preview Item", () => {
      // editItem.header.save(); //TODO-remove this line
      const preview = editItem.header.preview();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          cy.get("body")
            .children()
            .should("contain", "score");
        });

      preview.getClear().click();

      preview.getShowAnswer().click();

      preview.getClear().click();

      preview.header.edit();
    });

    it("[Tc_298]:test => Delete question from item", () => {
      editItem
        .getDelButton()
        .should("have.length", 1)
        .click()
        .should("have.length", 0);
    });
  });

  context("[sanity]:test => Create question using different options and validate", () => {
    before("visit items list page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // add new question
      editItem.addNew().chooseQuestion(queData.group, queData.queType);

      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText);

      question.getAllChoices().each(($el, index, $list) => {
        const cusIndex = $list.length - (index + 1);
        question.deleteChoiceByIndex(cusIndex);
      });

      // add choices
      const choices = queData.choices;
      choices.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });

      question
        .getAllAnsChoicesLabel()
        .contains(queData.correct[0])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      // save
      question.header.save();
    });

    it("[mcq_tf_test1]:test => Validate basic question with default setting", () => {
      // preview
      const preview = editItem.header.preview();

      // show ans
      preview
        .getShowAnswer()
        .click()
        .then(() => {
          // cy.get("label.wrong").should("have.length", queData.choices.length - 1);

          cy.get("label.right")
            .should("have.length", 1)
            .and("contain", queData.correct[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give correct ans and validate
      cy.contains(queData.correct[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 1/1");

          cy.get("label.wrong").should("have.length", 0);

          cy.get("label.right")
            .should("have.length", 1)
            .and("contain", queData.correct[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give wrong ans and check
      cy.contains(queData.choices[1]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          cy.get("label.wrong")
            .should("have.length", 1)
            .and("contain", queData.choices[1]);

          cy.get("label.right").should("have.length", 0);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give no ans and check
      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/0");

          cy.get("label.right,label.wrong").should("have.length", 0);
        });
    });
  });
});
