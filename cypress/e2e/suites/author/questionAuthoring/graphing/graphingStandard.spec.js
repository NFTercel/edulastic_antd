import GraphingStandardPage from "../../../../framework/author/itemList/questionType/graphing/graphingStandardPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";
import PreviewItemPage from "../../../../framework/author/itemList/itemDetail/previewPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Graphing" type question`, () => {
  const queData = {
    group: "Graphing",
    queType: "Graphing",
    queText: "Draw a point",
    graphParameters: {
      xMin: "-5",
      xMax: "10",
      yMin: "-9",
      yMax: "4"
    },
    tools: {
      defaultGroupName: "Default Group",
      groupName1: "Group 1",
      groupName2: "Group 2"
    },
    layout: {
      width: 500,
      height: 500,
      margin: "50",
      snapTo: "grid",
      stemNum: "Uppercase alphabet",
      fontSize: "Small"
    },
    grid: {
      xAxisLabel: "abscissa",
      yAxisLabel: "ordinate"
    },
    bgImage: {
      url: "https://www.cypress.io/img/logo-dark.36f3e062.png",
      width: "90",
      height: "30",
      xAxisPosition: "5",
      yAxisPosition: "5",
      opacity: "5"
    },
    bgShapes: {
      point1: {
        x: 0.6,
        y: 0.6
      },
      point2: {
        x: 0.3,
        y: 0.3
      }
    },
    annotation: {
      title: "annotation title",
      labelTop: "label top",
      labelLeft: "label left",
      labelRight: "label right",
      labelBottom: "label bottom"
    },
    correctAnswers: {
      points: "2",
      alternatePoints: "3"
    }
  };

  const question = new GraphingStandardPage();
  const editItemPage = new EditItemPage();
  const previewItemPage = new PreviewItemPage();
  const header = new Header();

  before(() => {
    cy.setToken();
  });

  context("User creates question.", () => {
    before("visit items page and select question type", () => {
      editItemPage.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItemPage.deleteAllQuestion();

      // create new que and select type
      editItemPage.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("Edit question text", () => {
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      question.getStimulus().should("be.visible");

      question.clickOnStimulusH2Button();

      question
        .getQuestionEditor()
        .find("h2")
        .should("contain", queData.queText);

      question
        .getQuestionHeader()
        .find("h2")
        .should("contain", queData.queText);
    });

    it("Edit graph parameters", () => {
      question
        .getXMinParameter()
        .clear()
        .type(queData.graphParameters.xMin);

      question
        .getXMaxParameter()
        .clear()
        .type(queData.graphParameters.xMax);

      question
        .getYMinParameter()
        .clear()
        .type(queData.graphParameters.yMin);

      question
        .getYMaxParameter()
        .clear()
        .type(queData.graphParameters.yMax);

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i).should("have.length", 25);
          }
        });
    });

    it("Edit tools", () => {
      question.getGroups().should("have.length", 1);
      question.getGroupTools(queData.tools.defaultGroupName).should("have.length", 2);

      question.clickOnToolDeleteButton(queData.tools.defaultGroupName, 1);
      question.getGroupTools(queData.tools.defaultGroupName).should("have.length", 1);
      question.getGroupDeleteButton(queData.tools.defaultGroupName).should("have.length", 0);
      question.getToolDeleteButton(queData.tools.defaultGroupName, 0).should("have.length", 0);

      question
        .clickOnAddToolButton(queData.tools.defaultGroupName)
        .selectTool(queData.tools.defaultGroupName, 1, "Ray");

      question
        .clickOnNewGroupButton()
        .clickOnAddToolButton(queData.tools.groupName1)
        .clickOnAddToolButton(queData.tools.groupName1)
        .clickOnAddToolButton(queData.tools.groupName1)
        .selectTool(queData.tools.groupName1, 1, "Sine")
        .selectTool(queData.tools.groupName1, 2, "Polygon");

      question.clickOnNewGroupButton().clickOnAddToolButton(queData.tools.groupName2);

      question.getCorrectAnswerGraphContainer().within(() => {
        question.getGraphTools().within(() => {
          question.getGraphToolsMainShapes().should("have.length", 4);
          question
            .getGraphToolsMainShapes()
            .eq(0)
            .should("contain", "Point");
          question
            .getGraphToolsMainShapes()
            .eq(1)
            .should("contain", "Ray");
          question
            .getGraphToolsMainShapes()
            .eq(2)
            .should("contain", "Point");
          question
            .getGraphToolsMainShapes()
            .eq(3)
            .should("contain", "Point");

          question
            .getGraphToolsMainShapes()
            .eq(2)
            .click();
          question
            .getGraphToolsMainShapes()
            .eq(2)
            .within(() => {
              question.getGraphToolsGroupShapes().should("have.length", 3);
              question
                .getGraphToolsGroupShapes()
                .eq(0)
                .should("contain", "Point");
              question
                .getGraphToolsGroupShapes()
                .eq(1)
                .should("contain", "Sine");
              question
                .getGraphToolsGroupShapes()
                .eq(2)
                .should("contain", "Polygon");
            });

          question
            .getGraphToolsMainShapes()
            .eq(3)
            .click();
          question
            .getGraphToolsMainShapes()
            .eq(3)
            .within(() => {
              question.getGraphToolsGroupShapes().should("have.length", 1);
              question
                .getGraphToolsGroupShapes()
                .eq(0)
                .should("contain", "Point");
            });
        });
      });

      question
        .clickOnToolDeleteButton(queData.tools.groupName1, 1)
        .clickOnToolDeleteButton(queData.tools.defaultGroupName, 1)
        .clickOnGroupDeleteButton(queData.tools.groupName2)
        .getGroups()
        .should("have.length", 2);

      question.getCorrectAnswerGraphContainer().within(() => {
        question.getGraphTools().within(() => {
          question.getGraphToolsMainShapes().should("have.length", 2);
          question
            .getGraphToolsMainShapes()
            .eq(0)
            .should("contain", "Point");
          question
            .getGraphToolsMainShapes()
            .eq(1)
            .should("contain", "Point");

          question
            .getGraphToolsMainShapes()
            .eq(1)
            .click();
          question
            .getGraphToolsMainShapes()
            .eq(1)
            .within(() => {
              question.getGraphToolsGroupShapes().should("have.length", 2);
              question
                .getGraphToolsGroupShapes()
                .eq(0)
                .should("contain", "Point");
              question
                .getGraphToolsGroupShapes()
                .eq(1)
                .should("contain", "Polygon");
            });
        });
      });
    });

    it("Edit layout", () => {
      question
        .getLayoutWidth()
        .clear()
        .type(queData.layout.width);

      question
        .getLayoutHeight()
        .clear()
        .type(queData.layout.height);

      question
        .getLayoutMargin()
        .clear()
        .type(queData.layout.margin);

      question
        .getLayoutSnapto()
        .clear()
        .type(queData.layout.snapTo);

      question.clickOnDrawLabelZero();

      question.clickOnDisplayPositionOnHover();

      question.selectStemNumerationOption(queData.layout.stemNum);

      question.selectFontSizeOption(queData.layout.fontSize);

      question
        .getBoards()
        .first()
        .find("svg")
        .invoke("width")
        .should("be.equal", queData.layout.width);

      question
        .getBoards()
        .first()
        .find("svg")
        .invoke("height")
        .should("be.equal", queData.layout.height);

      question
        .getBoards()
        .first()
        .should("have.css", "margin", `${queData.layout.margin}px`);

      question
        .getGraphTools()
        .its("length")
        .then(graphToolsLength => {
          for (let i = 0; i < graphToolsLength; i++) {
            question
              .getLabelsOnGraphTool(i)
              .its("length")
              .then(length => {
                for (let j = 0; j < length; j++) {
                  question
                    .getLabelsOnGraphTool(i)
                    .eq(j)
                    .should("have.css", "font-size", "12px");
                }
              });
          }
        });

      // todo: add tests for:
      // Snap to,
      // Draw Label Zero,
      // Display Position On Hover,
      // Stem Numeration
    });

    it("Edit grid", () => {
      question
        .getXDistance()
        .clear()
        .type(2);

      question
        .getXTickDistance()
        .clear()
        .type(2);

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i).should("have.length", 18);
          }
        });

      question
        .getYDistance()
        .clear()
        .type(2);

      question
        .getYTickDistance()
        .clear()
        .type(2);

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i).should("have.length", 12);
          }
        });

      question.getAxisXSettingsContainer().within(() => {
        question.clickOnShowAxisLabel();

        question
          .getXAxisLabel()
          .should("be.visible")
          .clear()
          .type(queData.grid.xAxisLabel);
      });

      question.getAxisYSettingsContainer().within(() => {
        question.clickOnShowAxisLabel();

        question
          .getYAxisLabel()
          .should("be.visible")
          .clear()
          .type(queData.grid.yAxisLabel);
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getAxisLabelByNameOnBoard(i, queData.grid.xAxisLabel).should("be.visible");
            question.getAxisLabelByNameOnBoard(i, queData.grid.yAxisLabel).should("be.visible");
          }
        });

      question.getAxisXSettingsContainer().within(() => {
        question.clickOnHideTicks();

        question.clickOnDrawLabels();

        question.clickOnMinArrow();

        question.clickOnMaxArrow();
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i).should("have.length", 5);
          }
        });

      question.getAxisYSettingsContainer().within(() => {
        question.clickOnHideTicks();

        question.clickOnDrawLabels();

        question.clickOnMinArrow();

        question.clickOnMaxArrow();
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i).should("have.length", 0);
          }
        });

      // check comma in label
      question.getAxisXSettingsContainer().within(() => {
        question.clickOnDrawLabels();
      });
      question.getAxisYSettingsContainer().within(() => {
        question.clickOnDrawLabels();
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i, ",").should("have.length", 0);
          }
        });

      question
        .getXDistance()
        .clear()
        .type(1000);

      question
        .getXTickDistance()
        .clear()
        .type(1000);

      question
        .getYDistance()
        .clear()
        .type(1000);

      question
        .getYTickDistance()
        .clear()
        .type(1000);

      question
        .getXMinParameter()
        .clear()
        .type(-3000);

      question
        .getXMaxParameter()
        .clear()
        .type(3000);

      question
        .getYMinParameter()
        .clear()
        .type(-2000);

      question
        .getYMaxParameter()
        .clear()
        .type(2000);

      question.getAxisXSettingsContainer().within(() => {
        question.clickOnCommaInLabel();
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i, ",").should("have.length", 4);
          }
        });

      question.getAxisYSettingsContainer().within(() => {
        question.clickOnCommaInLabel();
      });

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question.getVisibleTickLabelsOnBoard(i, ",").should("have.length", 6);
          }
        });

      question
        .getXMinParameter()
        .clear()
        .type(queData.graphParameters.xMin);

      question
        .getXMaxParameter()
        .clear()
        .type(queData.graphParameters.xMax);

      question
        .getYMinParameter()
        .clear()
        .type(queData.graphParameters.yMin);

      question
        .getYMaxParameter()
        .clear()
        .type(queData.graphParameters.yMax);

      question
        .getXDistance()
        .clear()
        .type(1);

      question
        .getXTickDistance()
        .clear()
        .type(1);

      question
        .getYDistance()
        .clear()
        .type(1);

      question
        .getYTickDistance()
        .clear()
        .type(1);

      // todo: add tests for:
      // X Distance,
      // Y Distance,
      // Hide Ticks (both),
      // Min Arrow (both),
      // Max Arrow (both)
    });

    it("Edit background image", () => {
      question
        .getBgImageUrl()
        .clear()
        .type(queData.bgImage.url);

      question
        .getBgImageHeight()
        .clear()
        .type(queData.bgImage.height);

      question
        .getBgImageWidth()
        .clear()
        .type(queData.bgImage.width);

      question
        .getBgImageXAxisPosition()
        .clear()
        .type(queData.bgImage.xAxisPosition);

      question
        .getBgImageYAxisPosition()
        .clear()
        .type(queData.bgImage.yAxisPosition);

      question
        .getBgImageOpacity()
        .clear()
        .type(queData.bgImage.opacity);

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question
              .getBgImageOnBoard(i)
              .should("exist")
              .and("have.attr", "xlink:href", queData.bgImage.url)
              .and("have.attr", "opacity", `${+queData.bgImage.opacity / 100}`);
            // todo: add tests for:
            // height
            // width
            // xAxisPosition
            // yAxisPosition
          }
        });
    });

    it("Edit controls", () => {
      question.getControlsContainer().within(() => {
        question.clickOnAddToolButton();
        question.selectControlOption(2, "Reset");
      });

      question.getCorrectAnswerGraphContainer().within(() => {
        question.getGraphTools().within(() => {
          question.getGraphControls().should("have.length", 3);
          question.getGraphControlByName("Undo").should("have.length", 1);
          question.getGraphControlByName("Redo").should("have.length", 1);
          question.getGraphControlByName("Reset").should("have.length", 1);
        });
      });
    });

    it("Edit background shapes", () => {
      question.getBgShapesGraphContainer().within(() => {
        question.getGraphTools().within(() => {
          question
            .getGraphToolsMainShapes()
            .eq(1)
            .click({ force: true });
        });
      });

      question.invokeBoardClick(1, queData.bgShapes.point1.x, queData.bgShapes.point1.y);

      question.invokeBoardClick(1, queData.bgShapes.point2.x, queData.bgShapes.point2.y);

      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphBgShapesPoints().should("have.length", 2);
        });

      question.clickOnShowBgShapesPoints();

      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphBgShapesPoints().should("not.exist");
        });

      question.clickOnShowBgShapesPoints();
    });

    it("Edit annotation", () => {
      question
        .getAnnotationTitle()
        .clear()
        .type(queData.annotation.title);

      question
        .getAnnotationLabelTop()
        .clear()
        .type(queData.annotation.labelTop);

      question
        .getAnnotationLabelLeft()
        .clear()
        .type(queData.annotation.labelLeft);

      question
        .getAnnotationLabelRight()
        .clear()
        .type(queData.annotation.labelRight);

      question
        .getAnnotationLabelBottom()
        .clear()
        .type(queData.annotation.labelBottom);

      question
        .getBoards()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            cy.contains(queData.annotation.title).should("exist");
            cy.contains(queData.annotation.labelTop).should("exist");
            cy.contains(queData.annotation.labelLeft).should("exist");
            cy.contains(queData.annotation.labelRight).should("exist");
            cy.contains(queData.annotation.labelBottom).should("exist");
          }
        });
    });

    it("Edit correct answers", () => {
      question
        .getPointsParameter()
        .clear()
        .type(queData.correctAnswers.points);

      question.selectIgnoreRepeatedShapesOption("Compare by points");

      // draw point
      question.selectTool(queData.tools.defaultGroupName, 0, "Point");
      question.invokeBoardClick(0, 0.6, 0.6);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 1);
        });

      // draw line
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Line");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.3, 0.3);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphLines().should("have.length", 1);
          question.getGraphLines().should("have.attr", "marker-start");
          question.getGraphLines().should("have.attr", "marker-end");
        });

      // draw ray
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Ray");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.3, 0.3);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphLines().should("have.length", 1);
          question.getGraphLines().should("not.have.attr", "marker-start");
          question.getGraphLines().should("have.attr", "marker-end");
        });

      // draw segment
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Segment");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.3, 0.3);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphLines().should("have.length", 1);
          question.getGraphLines().should("not.have.attr", "marker-start");
          question.getGraphLines().should("not.have.attr", "marker-end");
        });

      // draw vector
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Vector");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.3, 0.3);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphLines().should("have.length", 1);
          question.getGraphLines().should("not.have.attr", "marker-start");
          question.getGraphLines().should("have.attr", "marker-end");
        });

      // draw circle
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Circle");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.3, 0.3);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphCircles().should("have.length", 1);
        });

      // draw parabola
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Parabola");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.7, 0.7);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphParabolas().should("have.length", 1);
        });

      // draw sine
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Sine");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.7, 0.7);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 2);
          question.getGraphSines().should("have.length", 1);
        });

      // draw polygon
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Polygon");
      question.invokeBoardClick(0, 0.6, 0.6);
      question.invokeBoardClick(0, 0.8, 0.6);
      question.invokeBoardClick(0, 0.8, 0.4);
      question.invokeBoardClick(0, 0.6, 0.4);
      question.invokeBoardClick(0, 0.6, 0.6);
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphPoints().should("have.length", 4);
          question.getGraphLines().should("have.length", 4);
          question.getGraphPolygon().should("have.length", 1);
        });

      // todo: add tests for:
      // draw label

      // alternate answers
      question.clickOnTabsPlusButton();
      question
        .getPointsParameter()
        .clear()
        .type(queData.correctAnswers.alternatePoints);

      question.clickOnTab(0);
      question.getPointsParameter().should("have.value", queData.correctAnswers.points);
      question.clickOnTab(1);
      question.getPointsParameter().should("have.value", queData.correctAnswers.alternatePoints);

      question.clickOnAlternateAnswerDeleteButton(0);
      question.getPointsParameter().should("have.value", queData.correctAnswers.points);
    });

    it("Check preview", () => {
      question.clickOnResetButton();
      question.selectTool(queData.tools.defaultGroupName, 0, "Point");
      question.invokeBoardClick(0, 0.6, 0.6);

      header.save();
      header.preview();

      previewItemPage.getShowAnswer().click();
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphCorrectAnswerPoints().should("have.length", 1);
        });

      previewItemPage.getClear().click();
      question.invokeBoardClick(0, 0.2, 0.4);
      previewItemPage.getCheckAnswer().click();
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphIncorrectPoints().should("have.length", 1);
        });

      previewItemPage.getClear().click();
      question.invokeBoardClick(0, 0.6, 0.6);
      previewItemPage.getCheckAnswer().click();
      question
        .getBoards()
        .eq(0)
        .within(() => {
          question.getGraphCorrectPoints().should("have.length", 1);
        });
    });
  });
});
