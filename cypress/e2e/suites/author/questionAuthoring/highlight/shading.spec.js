import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import ShadingPage from "../../../../framework/author/itemList/questionType/highlight/shadingPage";
import FileHelper from "../../../../framework/util/fileHelper";
import Helpers from "../../../../framework/util/Helpers";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Shading" type question`, () => {
  describe("Shading", () => {
    const queData = {
      group: "Highlight",
      queType: "Shading",
      queText: "Shade the first and last box?",
      extlink: "www.testdomain.com",
      testtext: "testtext",
      formula: "s=ar^2"
    };

    const question = new ShadingPage();
    const editItem = new EditItemPage();
    let preview;

    before(() => {
      cy.setToken();
    });

    const RED = "rgb(238, 22, 88)";
    const GREEN = "rgb(31, 227, 161)";
    const CLEAR = "rgba(0, 176, 255, 0.19)";
    const BLUE = "rgba(0, 176, 255, 0.8)";

    context("Create basic question and validate.", () => {
      before("visit items page and select question type", () => {
        editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
        editItem.deleteAllQuestion();
        // create new que and select type
        editItem.addNew().chooseQuestion(queData.group, queData.queType);
      });

      it("[shad_s1] : user create question with default option and save", () => {
        // enter question
        question
          .getQuestionEditor()
          .clear()
          .type(queData.queText)
          .should("have.text", queData.queText);

        // set correct ans
        question
          .getCorrectAnsRowByIndex(0)
          .find("li")
          .first()
          .click()
          .should("not.have.css", "background-color", "transparent");

        question
          .getCorrectAnsRowByIndex(0)
          .find("li")
          .last()
          .click()
          .should("not.have.css", "background-color", "transparent");

        // save que
        question.header.save();
      });

      it("[shad_s2] : preview and validate with right/wrong ans", () => {
        preview = editItem.header.preview();
        // enter right ans
        question
          .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
          .find("li")
          .first()
          .as("first")
          .click();
        question
          .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
          .find("li")
          .last()
          .as("last")
          .click();

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 1/1");

            cy.get("@first").should("have.css", "background-color", GREEN);

            cy.get("@last").should("have.css", "background-color", GREEN);
          });

        preview
          .getClear()
          .click()
          .then(() => {
            question
              .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
              .find("li")
              .then($cells => {
                cy.wrap($cells).each(ele => {
                  expect(ele).to.have.css("background-color", CLEAR);
                });
              });
          });

        // enter partial correct ans
        question
          .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
          .find("li")
          .eq(0)
          .as("wrong")
          .click();

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 0/1");
            cy.get("@wrong").should("have.css", "background-color", GREEN);
          });

        preview.getClear().click();

        // enter wrong ans1
        question
          .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
          .find("li")
          .eq(1)
          .as("wrong1")
          .click();

        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            preview.getAntMsg().should("contain", "score: 0/1");

            cy.get("@wrong1").should("have.css", "background-color", RED);
          });

        preview.getClear().click();

        // show ans
        preview
          .getShowAnswer()
          .click()
          .then(() => {
            cy.get("@first").should("have.css", "background-color", GREEN);

            cy.get("@last").should("have.css", "background-color", GREEN);
          });
      });
    });

    context("Advanced Options", () => {
      before("visit items page and select question type", () => {
        editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
        editItem.deleteAllQuestion();
        // create new que and select type
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
        describe("Hide cells", () => {
          it("should be able to hide an each cell", () => {
            const shadesViewItems = question.getShadesViewItems();

            shadesViewItems.should("be.visible").each($el => {
              cy.wrap($el)
                .click()
                .should("have.css", "background-color")
                .and("eq", BLUE);
            });

            editItem.header.preview();
            cy.get('[data-cy="shadesViewItem"]').each($el => {
              cy.wrap($el)
                .should("have.attr", "visibility")
                .and("eq", "hidden");
            });
          });
          it("should be able to unhide an each cell", () => {
            const shadesViewItems = question.getShadesViewItems();

            shadesViewItems.should("be.visible").each($el => {
              cy.wrap($el)
                .click()
                .should("have.css", "background-color")
                .and("eq", CLEAR);
            });

            editItem.header.preview();
            cy.get('[data-cy="shadesViewItem"]').each($el => {
              cy.wrap($el)
                .should("have.attr", "visibility")
                .and("eq", "visible");
            });
          });
        });
        it("should be able to select border type: Outer", () => {
          const select = question.getBorderTypeSelect();

          select.should("be.visible").click();

          question
            .getOuterOption()
            .should("be.visible")
            .click();

          select.should("contain", "Outer");

          editItem.header.preview();
          cy.get('[data-cy="shadesView"]')
            .should("have.css", "border")
            .and("eq", "2px solid rgb(0, 176, 255)");
        });
        it("should be able to select border type: Full", () => {
          question
            .getBorderTypeSelect()
            .should("be.visible")
            .click();

          question
            .getFullOption()
            .should("be.visible")
            .click();

          question.getBorderTypeSelect().should("contain", "Full");

          editItem.header.preview();
          cy.get('[data-cy="shadesViewItem"]').each($el => {
            cy.wrap($el)
              .should("have.css", "border-width")
              .and("eq", "2px");
          });
        });
        it("should be able to select border type: None", () => {
          question
            .getBorderTypeSelect()
            .should("be.visible")
            .click();

          question
            .getNoneOption()
            .should("be.visible")
            .click();

          question.getBorderTypeSelect().should("contain", "None");

          editItem.header.preview();
          cy.get('[data-cy="shadesViewItem"]').each($el => {
            cy.wrap($el)
              .should("have.css", "border-width")
              .and("eq", "0px");
          });
        });
        it("should be able to set 2 selection", () => {
          const maxSelectionValue = 2;

          question
            .getMaxSelection()
            .should("be.visible")
            .invoke("attr", "type", "text")
            .clear()
            .type(maxSelectionValue)
            .should("have.value", `0${maxSelectionValue}`);

          editItem.header.preview();
          cy.get('[data-cy="shadesViewItem"]').each(($el, index) => {
            cy.wrap($el)
              .should("be.visible")
              .click()
              .as("item");

            if (index < maxSelectionValue) {
              cy.get("@item")
                .should("have.css", "background-color")
                .and("eq", BLUE);
            } else {
              cy.get("@item")
                .should("have.css", "background-color")
                .and("eq", CLEAR);
            }
          });
        });
        it("should be able to set 0 selection", () => {
          const maxSelectionValue = 0;

          question
            .getMaxSelection()
            .should("be.visible")
            .invoke("attr", "type", "text")
            .clear()
            .type(maxSelectionValue)
            .should("have.value", `0${maxSelectionValue}`);

          editItem.header.preview();
          cy.get('[data-cy="shadesViewItem"]').each($el => {
            cy.wrap($el)
              .should("be.visible")
              .click()
              .as("item");

            cy.get("@item")
              .should("have.css", "background-color")
              .and("eq", BLUE);
          });
        });
        it("should be able to check and uncheck hover state option", () => {
          question
            .getHoverStateOption()
            .should("be.visible")
            .check({ force: true })
            .should("be.checked")
            .uncheck({ force: true })
            .should("not.to.be.checked");
        });
        it("should be able to check Hover state checkbox", () => {
          question
            .getHoverStateOption()
            .should("be.visible")
            .check({ force: true })
            .should("be.checked");
        });
        it("should be able to uncheck Hover state checkbox", () => {
          question
            .getHoverStateOption()
            .should("be.visible")
            .uncheck({ force: true })
            .should("not.to.be.checked");
        });
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
      });
    });
  });
});
