import ItemListPage from "../../../../framework/author/itemList/itemListPage.js";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import MCQStandardPage from "../../../../framework/author/itemList/questionType/mcq/mcqStandardPage.js";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Multiple choice - standard" type question`, () => {
  const queData = {
    group: "Multiple Choice",
    queType: "Multiple choice - standard",
    queText: "Indian state known as garden spice is:",
    choices: ["Karnataka", "West Bengal", "Kerala", "Delhi", "KL"],
    correct: ["Kerala"],
    alterate: ["KL"],
    extlink: "www.testdomain.com",
    formattext: "formattedtext",
    formula: "s=ar^2"
  };
  const question = new MCQStandardPage();
  const editItem = new EditItemPage();
  const text = "testtext";

  const { formates } = question;

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

    it("[Tc_250]:test => Enter question text", () => {
      // edit text
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);
      /* 
      // add ext link
      question.getQuestionEditor()
        .clear()
        .type(queData.formattext);

      question.getQuestionEditor().find('p')
        .makeSelection();

      question.editToolBar.link()
        .click();

      cy.focused().type(queData.extlink)
        .type('{enter}');

      question.getQuestionEditor()
        .contains(queData.formattext)
        .should('have.attr', 'href', queData.extlink);

      // add formula
      question.getQuestionEditor()
        .clear()
        .type(queData.formula);

      question.getQuestionEditor().find('p')
        .makeSelection();

      question.editToolBar.formula()
        .click();

      cy.focused()
        .type(queData.formula)
        .type('{enter}');

      question.getQuestionEditor()
        .find('.ql-formula')
        .should('have.attr', 'data-value', queData.formula);
 */
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

    it("[Tc_251]:test => Multiple choices options", () => {
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
      const { choices } = queData;
      choices.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });
    });

    it("[Tc_252]:test => Set Correct Answer(s)", () => {
      // update points
      question.getPoints().verifyNumInput(0.5);

      // select correct ans
      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });

      // multiple response
      question.getMultipleResponse().click();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();
      });

      question
        .getAllAnsChoicesLabel()
        .find("input:checked")
        .should("have.length.greaterThan", 1);

      question.getMultipleResponse().click();

      // alternate
      question.addAlternate();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });
    });

    it("[Tc_253]:test => Advanced Options", () => {
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

    it("[Tc_254]:test => Layout", () => {
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

    it("[Tc_255]:test => Save question", () => {
      editItem.header.save();
      cy.contains(queData.formattext).should("be.visible");
      cy.url().should("contain", "item-detail");
    });

    it("[Tc_256]:test => Preview Item", () => {
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
      queType: "Multiple choice - standard",
      queText: "editIndian state known as garden spice is:",
      choices: ["editKarnataka", "editWest Bengal", "editKerala", "editDelhi", "KL"],
      correct: ["editKerala"],
      alterate: ["editKL"],
      extlink: "editwww.testdomain.com",
      formattext: "editformattedtext",
      formula: "edits=ar^2"
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

    it("[Tc_257]:test => Enter question text", () => {
      // edit text
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);
      /*    
      // add ext link
      question.getQuestionEditor()
        .clear()
        .type(queData.formattext);

      question.getQuestionEditor().find('p')
        .makeSelection();

      question.editToolBar.link()
        .click();

      cy.focused().type(queData.extlink)
        .type('{enter}');

      question.getQuestionEditor()
        .contains(queData.formattext)
        .should('have.attr', 'href', queData.extlink);

      // add formula
      question.getQuestionEditor()
        .clear()
        .type(queData.formula);

      question.getQuestionEditor().find('p')
        .makeSelection();

      question.editToolBar.formula()
        .click();

      cy.focused()
        .type(queData.formula)
        .type('{enter}');

      question.getQuestionEditor()
        .find('.ql-formula')
        .should('have.attr', 'data-value', queData.formula);
    */
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

    it("[Tc_258]:test => Multiple choices options", () => {
      // edit 1st choice
      question
        .getChoiceByIndex(0)
        .clear()
        .type(queData.choices[0])
        .should("contain", queData.choices[0]);

      // delete all choices
      question
        .getAllChoices()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteChoiceByIndex(cusIndex);
        })
        .should("have.length", 0);

      // add new
      const { choices } = queData;
      choices.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });
    });

    it("[Tc_259]:test => Set Correct Answer(s)", () => {
      // update points
      question.getPoints().verifyNumInput(0.5);

      // select correct ans
      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });

      // multiple response
      question.getMultipleResponse().click();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();
      });

      question
        .getAllAnsChoicesLabel()
        .find("input:checked")
        .should("have.length.greaterThan", 1);

      question.getMultipleResponse().click();

      // alternate
      question.addAlternate();

      question.getAllAnsChoicesLabel().each($el => {
        cy.wrap($el).click();

        cy.wrap($el)
          .find("input")
          .should("be.checked");
      });

      //
    });

    it("[Tc_260]:test => Advanced Options", () => {
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

    it("[Tc_261]:test => Layout", () => {
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

    it("[Tc_262]:test => Save question", () => {
      editItem.header.save();

      cy.contains(queData.formattext).should("be.visible");

      cy.url().should("contain", "item-detail");
    });

    it("[Tc_263]:test => Preview Item", () => {
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

    it("[Tc_264]:test => Delete question from item", () => {
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
      const { choices } = queData;
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

    it("[mcq_std_test1]:test => Validate basic question with default setting", () => {
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
      cy.contains(queData.choices[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          cy.get("label.wrong")
            .should("have.length", 1)
            .and("contain", queData.choices[0]);

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

    it("[mcq_std_test2]:test => Enable multiple responses (exact & partial match) and validate", () => {
      question.header
        .edit()
        .getEditButton()
        .click();

      // select multiple correct ans
      question.getMultipleResponse().click();

      question
        .getAllAnsChoicesLabel()
        .contains(queData.alterate[0])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      // advanced
      question.clickOnAdvancedOptions();

      question.getEnableAutoScoring().click();

      // >> exact match
      question.selectScoringType("Exact match");

      // save
      question.header.save();

      // preview and show ans
      const preview = question.header.preview();

      preview
        .getShowAnswer()
        .click()
        .then(() => {
          // cy.get("label.wrong").should("have.length", queData.choices.length - 2);

          cy.get("label.right")
            .should("have.length", 2)
            .and("contain", queData.correct[0])
            .and("contain", queData.alterate[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give correct ans and validate
      cy.contains(queData.correct[0]).click();

      cy.contains(queData.alterate[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 1/1");

          cy.get("label.wrong").should("have.length", 0);

          cy.get("label.right")
            .should("have.length", 2)
            .and("contain", queData.correct[0])
            .and("contain", queData.alterate[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give partial wrong ans and check
      cy.contains(queData.choices[0]).click();
      cy.contains(queData.correct[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          cy.get("label.wrong")
            .should("have.length", 1)
            .and("contain", queData.choices[0]);

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

      // give no ans and check
      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/0");

          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // partial match
      preview.header
        .edit()
        .getEditButton()
        .click();

      question.clickOnAdvancedOptions();

      question.selectScoringType("Partial match");

      // save
      question.header.save();

      // show ans
      question.header.preview();

      preview
        .getShowAnswer()
        .click()
        .then(() => {
          // cy.get("label.wrong").should("have.length", queData.choices.length - 2);

          cy.get("label.right")
            .should("have.length", 2)
            .and("contain", queData.correct[0])
            .and("contain", queData.alterate[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give correct ans and validate
      cy.contains(queData.correct[0]).click();

      cy.contains(queData.alterate[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 1/1");

          cy.get("label.wrong").should("have.length", 0);

          cy.get("label.right")
            .should("have.length", 2)
            .and("contain", queData.correct[0])
            .and("contain", queData.alterate[0]);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give partial wrong ans and check
      cy.contains(queData.choices[0]).click();
      cy.contains(queData.correct[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0.5/1");

          cy.get("label.wrong")
            .should("have.length", 1)
            .and("contain", queData.choices[0]);

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

      // give no ans and check
      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/0");

          cy.get("label.right,label.wrong").should("have.length", 0);
        });
    });

    it("[mcq_std_test3]:test => Testing scoring block", () => {
      question.header
        .edit()
        .getEditButton()
        .click();

      // select multiple correct ans
      question.getMultipleResponse().click();

      question
        .getAllAnsChoicesLabel()
        .contains(queData.correct[0])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      question
        .addAlternate()
        .getAllAnsChoicesLabel()
        .contains(queData.alterate[0])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      // advanced
      question.clickOnAdvancedOptions();

      question.getEnableAutoScoring().click();

      // >> exact match
      question.selectScoringType("Exact match");

      // save
      question.header.save();

      // preview and check ans
      const preview = question.header.preview();

      // give correct ans and validate
      cy.contains(queData.correct[0]).click();

      cy.contains(queData.alterate[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      // give incorrect ans and validate
      cy.contains(queData.choices[1]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          cy.get("label.wrong").should("have.length", 1);

          cy.get("label.right").should("have.length", 0);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      preview.header
        .edit()
        .getEditButton()
        .click();

      // advanced
      question.clickOnAdvancedOptions();

      question.getMinScore().type(2);

      // save
      question.header.save();

      question.header.preview();

      cy.contains(queData.choices[1]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 2/2");

          cy.get("label.wrong").should("have.length", 1);

          cy.get("label.right").should("have.length", 0);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      preview.header
        .edit()
        .getEditButton()
        .click();

      // advanced
      question.clickOnAdvancedOptions();

      question
        .getPoints()
        .clear()
        .type(3);

      question.getAlternates().click();

      question
        .getPoints()
        .clear()
        .type(4);

      // save
      question.header.save();

      question.header.preview();

      cy.contains(queData.choices[1]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 2/4");

          cy.get("label.wrong").should("have.length", 1);

          cy.get("label.right").should("have.length", 0);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });

      preview.header
        .edit()
        .getEditButton()
        .click();

      // advanced
      question.clickOnAdvancedOptions();

      question
        .getPoints()
        .clear()
        .type(8);
      question.selectScoringType("Partial match");

      question
        .getAllAnsChoicesLabel()
        .contains(queData.choices[0])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      question
        .getAllAnsChoicesLabel()
        .contains(queData.choices[4])
        .click()
        .closest("label")
        .find("input")
        .should("be.checked");

      question
        .getAlternates()
        .next()
        .click();

      question.getMinScore().clear();

      question.getPanalty().type(4);

      // save
      question.header.save();

      question.header.preview();

      cy.contains(queData.choices[1]).click();
      cy.contains(queData.choices[0]).click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 2/8");

          cy.get("label.wrong").should("have.length", 1);

          cy.get("label.right").should("have.length", 1);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("label.right,label.wrong").should("have.length", 0);
        });
    });
  });
});
