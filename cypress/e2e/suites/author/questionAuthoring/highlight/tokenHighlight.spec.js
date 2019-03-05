import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import TokenHighlightPage from "../../../../framework/author/itemList/questionType/highlight/tokenHighlightPage";
import PreviewItemPage from "../../../../framework/author/itemList/itemDetail/previewPage";

describe('Author - "Token highlight" type question', () => {
  const queData = {
    group: "Highlight",
    queType: "Token highlight",
    queText: "Highlight the correct part?",
    template: [
      "This is first paragraph.And of two sentences.",
      "This is second paragraph.And of three sentenses.Third sentense is here."
    ],
    correct: {
      para: [0],
      sentence: ["And of two sentenses", "Third sentense is here"],
      word: ["first", "three", "Third"]
    },
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new TokenHighlightPage();
  const editItem = new EditItemPage();
  const preview = new PreviewItemPage();

  const RED_BG = "rgb(251, 223, 231)";
  const RED_BD = "rgb(238, 22, 88)";
  const GREEN_BG = "rgb(225, 251, 242)";
  const GREEN_BD = "rgb(31, 227, 161)";

  const ACTIVE = "rgb(31, 227, 161)";
  const ACTIVEWORD = "active-word";

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("[Tc_210] : Enter question text in Compose Question text box", () => {
      // enter question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("have.text", queData.queText);
    });

    it("[Tc_211] : Edit template and token", () => {
      // template
      question
        .getTemplateEditor()
        .click()
        .type(queData.template[0])
        .type("{enter}")
        .type(queData.template[1]);

      // token
      question.goToEditToken();
      const tokens = [{ sel: "Paragraph", count: 2 }, { sel: "Sentence", count: 5 }, { sel: "Word", count: 20 }];

      tokens.forEach(token => {
        const { sel, count } = token;
        cy.get("body")
          .contains(sel)
          .click()
          .should("have.css", "background-color", ACTIVE);
        question
          .getAllTokens()
          .should("have.length", count)
          .each($tok => {
            cy.wrap($tok)
              .click({ force: true })
              .should("not.have.class", ACTIVEWORD)
              .click({ force: true })
              .should("have.class", ACTIVEWORD);
          });
      });

      // fix token to para
      question.paragraph().click();
    });

    it("[Tc_212] : set correct answer", () => {
      // point
      question.getPoint().verifyNumInput(1);

      // set correct ans
      question
        .getAllTokenAnswer()
        .eq(0)
        .click()
        .should("have.class", ACTIVEWORD);
    });

    it("[Tc_213] : save question", () => {
      // save que
      question.header.save();
      cy.url().should("contain", "item-detail");
    });

    context("[Tc_214] :  preview and validate checkAns,ShowAns,Clear", () => {
      it("[Tc_1] : Paragraph Token, validate checkAns,ShowAns,Clear", () => {
        preview.header.preview();
        // enter right ans and check
        question
          .getAllTokenOnPreview()
          .eq(0)
          .as("answered")
          .click()
          .should("have.class", ACTIVEWORD);

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 1/1");
            cy.get("@answered")
              .should("have.css", "background-color", GREEN_BG)
              .and("have.css", "border-color", GREEN_BD);
          });

        // clear
        preview
          .getClear()
          .click()
          .then(() => {
            question.getAllTokenOnPreview().each(ele => {
              cy.wrap(ele).should("not.have.class", ACTIVEWORD);
            });
          });

        // enter wrong ans and check
        question
          .getAllTokenOnPreview()
          .eq(1)
          .as("answered")
          .click()
          .should("have.class", ACTIVEWORD);

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 0/1");
            cy.get("@answered")
              .should("have.css", "background-color", RED_BG)
              .and("have.css", "border-color", RED_BD);
          });

        preview.getClear().click();

        // show ans
        preview
          .getShowAnswer()
          .click()
          .then(() => {
            cy.get(`.${ACTIVEWORD}`).should("contain", queData.template[0]);
          });
      });

      it("[Tc_2] : Sentence Token, validate checkAns", () => {
        preview.header.edit();
        editItem.getEditButton().click();

        // set token and ans
        question.goToEditToken();
        question.sentence().click();

        // set correct
        question.getAllTokenAnswer().then($ele => {
          queData.correct.sentence.forEach(text => {
            cy.wrap($ele)
              .contains(text)
              .click();
          });
        });

        // enter right ans and check
        question.getAllTokenOnPreview().then($ele => {
          queData.correct.sentence.forEach(text => {
            cy.wrap($ele)
              .contains(text)
              .click()
              .should("have.class", ACTIVEWORD);
          });
        });

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().the.should("contain", "score: 1/1");
            queData.correct.sentence.forEach(text => {
              question
                .getAllTokenOnPreview()
                .contains("span", text)
                .should("have.css", "background-color", GREEN_BG)
                .and("have.css", "border-color", GREEN_BD);
            });
          });

        // clear
        preview.getClear().click();

        // enter wrong ans and check
        question
          .getAllTokenOnPreview()
          .eq(1)
          .as("answered")
          .click()
          .should("have.class", ACTIVEWORD);

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 0/1");
            cy.get("@answered")
              .should("have.css", "background-color", RED_BG)
              .and("have.css", "border-color", RED_BD);
          });

        preview.getClear().click();
      });

      it("[Tc_3] : Word Token,validate checkAns", () => {
        preview.header.edit();
        // set token and ans
        question.goToEditToken();
        question.word().click();

        // set correct
        question.getAllTokenAnswer().then($ele => {
          queData.correct.word.forEach(text => {
            cy.wrap($ele)
              .contains(text)
              .click();
          });
        });

        // enter right ans and check
        question.getAllTokenOnPreview().then($ele => {
          queData.correct.word.forEach(text => {
            cy.wrap($ele)
              .contains(text)
              .click()
              .should("have.class", ACTIVEWORD);
          });
        });

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().the.should("contain", "score: 1/1");
            queData.correct.word.forEach(text => {
              question
                .getAllTokenOnPreview()
                .contains("span", text)
                .should("have.css", "background-color", GREEN_BG)
                .and("have.css", "border-color", GREEN_BD);
            });
          });

        // clear
        preview.getClear().click();

        // enter wrong ans and check
        question
          .getAllTokenOnPreview()
          .eq(1)
          .as("answered")
          .click()
          .should("have.class", ACTIVEWORD);

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 0/1");
            cy.get("@answered")
              .should("have.css", "background-color", RED_BG)
              .and("have.css", "border-color", RED_BD);
          });

        preview.getClear().click();
      });
    });
  });
});
