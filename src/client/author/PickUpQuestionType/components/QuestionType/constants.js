import { mainBlueColor, svgMapFillColor, svgMapStrokeColor } from "@edulastic/colors";
import { math } from "@edulastic/constants";
import uuid from "uuid/v4";
import {
  BY_LOCATION_METHOD,
  EXACT_MATCH,
  ON_LIMIT,
  previewAreas,
  SENTENCE_MODE,
  templateWithTokens
} from "../../../../assessment/constants/constantsForQuestions";

// Multiple Choice
import MCStandard from "../../../src/assets/multiple-choice/standard.svg";
import MCMultipleResponses from "../../../src/assets/multiple-choice/multiple-response.svg";
import MCTrueFalse from "../../../src/assets/multiple-choice/true-false.svg";
import MCBlockLayout from "../../../src/assets/multiple-choice/block-layout.svg";
import MCMatrixStandard from "../../../src/assets/multiple-choice/matrix-standard.svg";
import MCMatrixInline from "../../../src/assets/multiple-choice/matrix-inline.svg";
import MCMatrixLabels from "../../../src/assets/multiple-choice/matrix-labels.svg";

// Fill In blanks
import FBClozeDragDrop from "../../../src/assets/fill-in-blanks/cloze-drag-drop.svg";
import FBClozeDropDown from "../../../src/assets/fill-in-blanks/cloze-dropdown.svg";
import FBClozeText from "../../../src/assets/fill-in-blanks/cloze-text.svg";
import FBClozeImgDragDrop from "../../../src/assets/fill-in-blanks/img-drag-drop.svg";
import FBClozeImgDropDown from "../../../src/assets/fill-in-blanks/img-dropdown.svg";
import FBClozeImgText from "../../../src/assets/fill-in-blanks/img-text.svg";

// Classy Match
import CMClassification from "../../../src/assets/classy-match/classification.svg";
import CMMatch from "../../../src/assets/classy-match/match.svg";
import CMOrderList from "../../../src/assets/classy-match/order-list.svg";
import CMSortList from "../../../src/assets/classy-match/sort-list.svg";

// Written Spoken
import WSEssayRichText from "../../../src/assets/written-spoken/essay-rich-text.svg";
import WSEssayPlainText from "../../../src/assets/written-spoken/essay-plain-text.svg";
import WSShortText from "../../../src/assets/written-spoken/short-text.svg";
// import WSAudioPlayer from '../../assets/written-spoken/audio-player.svg';
// import WSVideoPlayer from '../../assets/written-spoken/video-player.svg';

// Highlight
import HLHightlight from "../../../src/assets/highlight/highlight-img.svg";
import HLHotspot from "../../../src/assets/highlight/hotspot.svg";
import HLShading from "../../../src/assets/highlight/shading.svg";
import HLTokenHighlight from "../../../src/assets/highlight/token-highlight.svg";

// Math
import MTFormula from "../../../src/assets/math/math-formula.svg";
import MTFractions from "../../../src/assets/math/math-fractions.svg";
import MTFillInBlanks from "../../../src/assets/math/math-fill-blanks.svg";
import MTText from "../../../src/assets/math/math-text.svg";
import MTMatrices from "../../../src/assets/math/math-matrices.svg";
import MTUnits from "../../../src/assets/math/math-units.svg";
import MTEssay from "../../../src/assets/math/math-essay.svg";
// import MTClozeMath from '../../assets/math/cloze-math.svg';
// import MTClozeMathWithImage from '../../assets/math/cloze-math-img.svg';

// Graphing
import GRGraphing from "../../../src/assets/graphing/graphing.svg";
import GRGraphingQuadrant from "../../../src/assets/graphing/graphing-quadrant.svg";
import GRNumberLineDragDrop from "../../../src/assets/graphing/line-drag-drop.svg";
import GRNumberLinePlot from "../../../src/assets/graphing/line-plot.svg";

export const getCards = onSelectQuestionType => {
  const { EMBED_RESPONSE } = math;

  // use it for ids of MCQ
  const uuids = [uuid(), uuid(), uuid()];

  return [
    {
      type: "highlight",
      cardImage: HLHightlight,
      data: {
        title: "Highlight Image",
        image: {
          source: "",
          width: 900,
          height: 470,
          altText: ""
        },
        line_color: [mainBlueColor],
        stimulus: "<p>[This is the stem.]</p>",
        type: "highlightImage",
        validation: {}
      },
      onSelectQuestionType
    },
    {
      type: "highlight",
      cardImage: HLShading,
      data: {
        title: "Shading",
        canvas: {
          cell_height: 2,
          cell_width: 2,
          column_count: 6,
          row_count: 1,
          shaded: [],
          read_only_author_cells: false
        },
        stimulus: "<p>[This is the stem.]</p>",
        type: "shading",
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: {
              method: BY_LOCATION_METHOD,
              value: []
            }
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "highlight",
      cardImage: HLHotspot,
      data: {
        title: "Hotspot",
        stimulus: "<p>[This is the stem.]</p>",
        type: "hotspot",
        image: {
          source: "https://assets.learnosity.com/organisations/1/bead7655-fb71-41af-aeea-9e08a47eac68.png",
          width: 900,
          altText: "",
          height: 470
        },
        areas: [],
        previewAreas,
        area_attributes: {
          global: {
            fill: svgMapFillColor,
            stroke: svgMapStrokeColor
          },
          local: []
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        },
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "highlight",
      cardImage: HLTokenHighlight,
      data: {
        title: "Token highlight",
        stimulus: "<p>[This is the stem.]</p>",
        template:
          '<p>Risus et tincidunt turpis facilisis.</p><p class="newline_section"><br></p><p>Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum. Nunc diam enim, porta sed eros vitae. dignissim, et tincidunt turpis facilisis.</p><p class="newline_section"><br></p><p>Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum.</p>',
        templeWithTokens: templateWithTokens,
        tokenization: SENTENCE_MODE,
        type: "tokenhighlight",
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "edit",
      cardImage: WSEssayRichText,
      data: {
        title: "Essay with rich text",
        stimulus: "[This is the stem.]",
        type: "essayRichText",
        show_word_count: true,
        max_word: 5,
        show_word_limit: ON_LIMIT,
        validation: {},
        formatting_options: [
          { id: "test1", value: "bold", active: true },
          { id: "test2", value: "italic", active: true },
          { id: "test3", value: "underline", active: true },
          { id: "test4", value: "strike", active: false },
          { id: "test5", value: "header", param: 1, active: false },
          { id: "test6", value: "header", param: 2, active: false },
          { id: "test9", value: "|", active: true },
          { id: "test10", value: "list", param: "ordered", active: true },
          { id: "test11", value: "list", param: "bullet", active: true },
          { id: "test12", value: "align", param: "center", active: false },
          { id: "test13", value: "align", param: "justify", active: false },
          { id: "test14", value: "align", param: "right", active: false },
          { id: "test15", value: "|", active: false },
          { id: "test16", value: "|", active: false },
          { id: "test17", value: "blockquote", active: false },
          { id: "test18", value: "script", param: "sub", active: false },
          { id: "test19", value: "script", param: "super", active: false },
          { id: "test20", value: "|", active: false },
          { id: "test21", value: "indent", param: "+1", active: false },
          { id: "test22", value: "indent", param: "-1", active: false },
          { id: "test23", value: "|", active: false },
          { id: "test24", value: "direction", param: "rtl", active: false },
          { id: "test26", value: "clean", active: false }
        ]
      },
      onSelectQuestionType
    },
    {
      type: "edit",
      cardImage: WSEssayPlainText,
      data: {
        title: "Essay with plain text",
        stimulus: "[This is the stem.]",
        type: "essayPlainText",
        show_copy: true,
        show_cut: true,
        show_paste: true,
        max_word: 5,
        show_word_limit: ON_LIMIT,
        show_word_count: true,
        validation: {}
      },
      onSelectQuestionType
    },
    {
      type: "edit",
      cardImage: WSShortText,
      data: {
        title: "Short text",
        stimulus: "[This is the stem.]",
        type: "shortText",
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            matching_rule: EXACT_MATCH,
            value: ""
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCStandard,
      data: {
        title: "Multiple choice - standard",
        type: "multipleChoice",
        stimulus: "Which color has the smallest walvelenght?",
        ui_style: {
          type: "horizontal"
        },
        options: [
          { value: uuids[0], label: "Red" },
          { value: uuids[1], label: "Violet" },
          { value: uuids[2], label: "Green" }
        ],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [uuids[0]]
          },
          alt_responses: []
        },
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCMultipleResponses,
      data: {
        title: "Multiple choice - multiple response",
        type: "multipleChoice",
        stimulus: "Which color has the smallest walvelenght?",
        ui_style: {
          type: "horizontal"
        },
        options: [
          { value: uuids[0], label: "Red" },
          { value: uuids[1], label: "Violet" },
          { value: uuids[2], label: "Green" }
        ],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [uuids[1]]
          },
          alt_responses: []
        },
        multiple_responses: true
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCTrueFalse,
      data: {
        title: "True or false",
        type: "multipleChoice",
        stimulus: "The sky is blue due to gases.",
        ui_style: {
          type: "horizontal"
        },
        options: [{ value: uuids[0], label: "True" }, { value: uuids[1], label: "False" }],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [uuids[0]]
          },
          alt_responses: []
        },
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCBlockLayout,
      data: {
        title: "Multiple choice - block layout",
        type: "multipleChoice",
        stimulus: "What is the capital city of England?",
        ui_style: {
          type: "block",
          choice_label: "upper-alpha"
        },
        options: [
          { value: uuids[0], label: "Dublin" },
          { value: uuids[1], label: "London" },
          { value: uuids[2], label: "Liverpool" }
        ],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [uuids[0]]
          },
          alt_responses: []
        },
        multiple_responses: true
      },
      onSelectQuestionType
    },
    {
      type: "classify",
      cardImage: CMSortList,
      data: {
        title: "Sort List",
        firstMount: true,
        type: "sortList",
        stimulus: "Sort the sine and cosine values from lower to higher.",
        ui_style: {},
        source: ["Item A", "Item B", "Item C", "Item D"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [1, 2, 0, 3]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "classify",
      cardImage: CMClassification,
      data: {
        title: "Classification",
        firstMount: true,
        group_possible_responses: false,
        possible_response_groups: [
          {
            title: "",
            responses: ["Choice B", "Choice C", "Choice A", "Choice D"]
          }
        ],
        possible_responses: ["Choice B", "Choice C", "Choice A", "Choice D"],
        stimulus: "Your question is here",
        type: "classification",
        ui_style: {
          column_count: 2,
          column_titles: ["COLUMN 1", "COLUMN 2"],
          row_count: 1,
          row_titles: []
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [[0, 2], [1, 3]]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "classify",
      cardImage: CMMatch,
      data: {
        title: "Match list",
        firstMount: true,
        group_possible_responses: false,
        possible_response_groups: [
          {
            title: "",
            responses: ["Choice B", "Choice C", "Choice A"]
          }
        ],
        possible_responses: ["Choice A", "Choice B", "Choice C"],
        type: "matchList",
        stimulus: "<p>This is the stem.</p>",
        list: ["Stem 1", "Stem 2", "Stem 3"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: ["Choice A", "Choice B", "Choice C"]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "classify",
      cardImage: CMOrderList,
      data: {
        title: "OrderList",
        type: "orderList",
        stimulus: "Which color has the smallest walvelenght?",
        list: ["Item A", "Item B", "Item C"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [0, 1, 2]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCMatrixStandard,
      data: {
        title: "Choice matrix - standard",
        firstMount: true,
        type: "choiceMatrix",
        stimulus: "This is the stem.",
        ui_style: {
          type: "table",
          horizontal_lines: false
        },
        stems: ["[Stem 1]", "[Stem 2]", "[Stem 3]", "[Stem 4]"],
        options: ["True", "False"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [null, null, null, null]
          },
          alt_responses: []
        },
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCMatrixInline,
      data: {
        title: "Choice matrix - inline",
        firstMount: true,
        options: ["True", "False"],
        stems: ["[Stem 1]", "[Stem 2]", "[Stem 3]", "[Stem 4]"],
        stimulus: "This is the stem.",
        type: "choiceMatrix",
        ui_style: {
          type: "inline",
          horizontal_lines: false
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [null, null, null, null]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "multiple-choice",
      cardImage: MCMatrixLabels,
      data: {
        title: "Choice matrix - labels",
        firstMount: true,
        options: ["True", "False"],
        stems: ["[Stem 1]", "[Stem 2]", "[Stem 3]", "[Stem 4]"],
        stimulus: "This is the stem.",
        type: "choiceMatrix",
        ui_style: {
          stem_numeration: "upper-alpha",
          type: "table",
          horizontal_lines: false
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: [null, null, null, null]
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeDragDrop,
      stimulus: "",
      data: {
        title: "Cloze with Drag & Drop",
        type: "clozeDragDrop",
        stimulus: "",
        options: ["WHISPERED", "HOLMES", "INTRUDER"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeDropDown,
      stimulus: "",
      data: {
        title: "Cloze with Drop Down",
        type: "clozeDropDown",
        stimulus: "",
        options: {
          0: ["A", "B"],
          1: ["Choice A", "Choice B"]
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeText,
      stimulus: "",
      data: {
        title: "Cloze with Text",
        type: "clozeText",
        stimulus: "",
        options: {
          0: "",
          1: ""
        },
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeImgDragDrop,
      stimulus: "",
      data: {
        title: "Label Image with Drag & Drop",
        type: "clozeImageDragDrop",
        firstMount: true,
        stimulus: "",
        options: ["Country A", "Country B", "Country C"],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        },
        responses: [
          { top: 0, left: 240, width: 200, height: 40 },
          { top: 100, left: 120, width: 220, height: 40 },
          { top: 220, left: 200, width: 200, height: 40 }
        ]
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeImgDropDown,
      stimulus: "",
      ui_style: {
        background: "#0288d1"
      },
      data: {
        title: "Label Image with Drop Down",
        type: "clozeImageDropDown",
        firstMount: true,
        stimulus: "",
        options: [["A", "B"], ["Choice A", "Choice B"], ["Select A", "Select B"]],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        },
        responses: [
          { top: 0, left: 240, width: 200, height: 40 },
          { top: 100, left: 120, width: 220, height: 40 },
          { top: 220, left: 200, width: 200, height: 40 }
        ],
        imageWidth: 600,
        stimulusReviewonly: "",
        instructorStimulus: "",
        rubricReference: "",
        sampleAnswer: "",
        distractorRationalePerResponse: "",
        distractorRationaleOptions: []
      },
      onSelectQuestionType
    },
    {
      type: "fill-blanks",
      cardImage: FBClozeImgText,
      stimulus: "",
      data: {
        title: "Label Image with Text",
        type: "clozeImageText",
        stimulus: "",
        options: [],
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        },
        responses: [
          { top: 0, left: 240, width: 200, height: 40 },
          { top: 100, left: 120, width: 220, height: 40 },
          { top: 220, left: 200, width: 200, height: 40 }
        ],
        imageWidth: 600,
        stimulusReviewonly: "",
        instructorStimulus: "",
        rubricReference: "",
        sampleAnswer: "",
        distractorRationalePerResponse: "",
        distractorRationaleOptions: []
      },
      onSelectQuestionType
    },
    {
      stimulus: "Which color has the smallest walvelenght?",
      type: "graphing",
      cardImage: GRGraphing,
      data: {
        title: "Graphing",
        type: "graph",
        graphType: "quadrants",
        stimulus: "Which color has the smallest walvelenght?",
        canvas: {
          x_max: 10.4,
          x_min: -10.4,
          y_max: 10.4,
          y_min: -10.4
        },
        controlbar: {
          controls: ["undo", "redo"],
          default_control: "undo"
        },
        toolbar: {
          tools: ["point", "line"],
          default_tool: "point"
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          unscored: false,
          penaltyPoints: 1,
          checkAttempts: 2,
          minScore: 1,
          checkAnswerButton: true,
          alt_responses: []
        },
        extra_options: {
          rubric_reference: "",
          sample_answer: "",
          stimulus_review: "",
          instructor_stimulus: ""
        },
        ui_style: {
          drawLabelZero: false,
          displayPositionOnHover: false,
          currentStemNum: "numerical",
          currentFontSize: "normal",
          xShowAxisLabel: false,
          xHideTicks: false,
          xDrawLabel: true,
          xMaxArrow: true,
          xMinArrow: true,
          xCommaInLabel: false,
          yShowAxisLabel: false,
          yHideTicks: false,
          yDrawLabel: true,
          yMaxArrow: true,
          yMinArrow: true,
          yCommaInLabel: false,
          xDistance: 1,
          yDistance: 1,
          xTickDistance: 1,
          yTickDistance: 1,
          layout_width: 600,
          layout_height: 600,
          layout_margin: 0,
          layout_snapto: "grid",
          xAxisLabel: "X",
          yAxisLabel: "Y"
        },
        background_image: {
          src: "",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 100,
          showShapePoints: true
        },
        background_shapes: [],
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "graphing",
      cardImage: GRGraphingQuadrant,
      data: {
        title: "Graphing in the 1st quadrant",
        type: "graph",
        graphType: "firstQuadrant",
        stimulus: "[This is the stem2.]",
        canvas: {
          x_max: 10.4,
          x_min: -0.8,
          y_max: 10.4,
          y_min: -0.8
        },
        controlbar: {
          controls: ["undo", "redo"],
          default_control: "undo"
        },
        toolbar: {
          tools: ["point", "line"],
          default_tool: "point"
        },
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            score: 1,
            value: []
          },
          unscored: false,
          penaltyPoints: 1,
          checkAttempts: 2,
          minScore: 1,
          checkAnswerButton: true,
          alt_responses: []
        },
        extra_options: {
          rubric_reference: "",
          sample_answer: "",
          stimulus_review: "",
          instructor_stimulus: ""
        },
        ui_style: {
          drawLabelZero: false,
          displayPositionOnHover: false,
          currentStemNum: "numerical",
          currentFontSize: "normal",
          xShowAxisLabel: false,
          xHideTicks: false,
          xDrawLabel: true,
          xMaxArrow: true,
          xMinArrow: true,
          xCommaInLabel: false,
          yShowAxisLabel: false,
          yHideTicks: false,
          yDrawLabel: true,
          yMaxArrow: true,
          yMinArrow: true,
          yCommaInLabel: false,
          xDistance: 1,
          yDistance: 1,
          xTickDistance: 1,
          yTickDistance: 1,
          layout_width: 600,
          layout_height: 600,
          layout_margin: 0,
          layout_snapto: "grid",
          xAxisLabel: "X",
          yAxisLabel: "Y"
        },
        background_image: {
          src: "",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 100,
          showShapePoints: true
        },
        background_shapes: [],
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "graphing",
      cardImage: GRNumberLinePlot,
      data: {
        title: "Number line with plot",
        type: "graph",
        stimulus: "[This is the stem3.]",
        graphType: "axisSegments",
        canvas: {
          x_max: 10,
          x_min: 0,
          y_max: 0.5,
          y_min: -0.5,
          numberline: true,
          margin: 75,
          responsesAllowed: 2,
          title: ""
        },
        controlbar: {
          controls: ["undo", "redo", "reset"],
          default_control: "undo"
        },
        toolbar: {
          tools: [],
          default_tool: null
        },
        extra_options: {
          rubric_reference: "",
          sample_answer: "",
          stimulus_review: "",
          instructor_stimulus: ""
        },
        numberlineAxis: {
          leftArrow: false,
          rightArrow: false,
          showTicks: true,
          snapToTicks: true,
          ticksDistance: 1,
          showMin: true,
          showMax: true,
          fontSize: 12,
          labelShowMax: true,
          labelShowMin: true,
          minorTicks: 1,
          showLabels: true,
          stackResponses: false,
          stackResponsesSpacing: 30,
          renderingBase: "min-value-based",
          specificPoints: ""
        },
        ui_style: {
          gridVisible: false,
          drawLabelZero: false,
          displayPositionOnHover: false,
          currentStemNum: "numerical",
          currentFontSize: "normal",
          xShowAxisLabel: false,
          xHideTicks: true,
          xDrawLabel: false,
          xMaxArrow: false,
          xMinArrow: false,
          xVisible: false,
          xCommaInLabel: false,
          yShowAxisLabel: false,
          yDrawLabel: false,
          yMaxArrow: false,
          yMinArrow: false,
          yCommaInLabel: false,
          yVisible: false,
          xDistance: 1,
          yDistance: 0,
          xTickDistance: 1,
          yTickDistance: 0,
          layout_width: 600,
          layout_height: 150,
          layout_margin: 0,
          layout_snapto: "grid",
          xAxisLabel: "X",
          yAxisLabel: "Y",
          title_position: 15,
          line_position: 50,
          point_box_position: 60
        },
        background_image: {
          src: "",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 100,
          showShapePoints: false
        },
        background_shapes: [],
        multiple_responses: false,
        validation: {
          graphType: "axisSegments",
          scoring_type: EXACT_MATCH,
          unscored: false,
          penaltyPoints: 1,
          checkAttempts: 2,
          minScore: 1,
          checkAnswerButton: true,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        }
      },
      onSelectQuestionType
    },
    {
      type: "feature",
      data: {
        title: "Protractor",
        type: "protractor",
        stimulus: "",
        image: "",
        label: "Protractor",
        alt: "A 180-degree standard protractor.",
        width: 530,
        height: 265,
        rotate: true
      },
      onSelectQuestionType
    },
    {
      type: "graphing",
      cardImage: GRNumberLineDragDrop,
      data: {
        title: "Number line with drag & drop",
        type: "graph",
        graphType: "axisLabels",
        list: [
          {
            text: "Option 1",
            id: `list-item-${Math.random()
              .toString(36)
              .substr(2, 9)}`
          },
          {
            text: "Option 2",
            id: `list-item-${Math.random()
              .toString(36)
              .substr(2, 9)}`
          }
        ],
        toolbar: {
          controls: [],
          default_control: ""
        },
        extra_options: {
          rubric_reference: "",
          sample_answer: "",
          stimulus_review: "",
          instructor_stimulus: ""
        },
        stimulus: "[This is the stem. axisLabels]",
        validation: {
          graphType: "axisLabels",
          scoring_type: EXACT_MATCH,
          unscored: false,
          penaltyPoints: 1,
          checkAttempts: 2,
          minScore: 1,
          checkAnswerButton: true,
          valid_response: {
            score: 1,
            value: []
          },
          alt_responses: []
        },
        canvas: {
          x_max: 10,
          x_min: 0,
          y_max: 1,
          y_min: -1.75,
          numberline: true,
          margin: 75,
          title: ""
        },
        numberlineAxis: {
          leftArrow: false,
          rightArrow: false,
          showTicks: true,
          snapToTicks: true,
          ticksDistance: "1",
          labelsFrequency: 1,
          showMin: true,
          showMax: true,
          fontSize: 12,
          labelShowMax: true,
          labelShowMin: true,
          minorTicks: 1,
          showLabels: true,
          separationDistanceX: 10,
          separationDistanceY: 20,
          renderingBase: "min-value-based",
          specificPoints: "",
          fractionsFormat: "not-normalized-fractions"
        },
        ui_style: {
          gridVisible: false,
          drawLabelZero: false,
          displayPositionOnHover: false,
          currentStemNum: "numerical",
          currentFontSize: "normal",
          xShowAxisLabel: false,
          xHideTicks: true,
          xDrawLabel: false,
          xMaxArrow: false,
          xMinArrow: false,
          xVisible: false,
          xCommaInLabel: false,
          yShowAxisLabel: false,
          yHideTicks: true,
          yDrawLabel: false,
          yMaxArrow: false,
          yMinArrow: false,
          yCommaInLabel: false,
          yVisible: false,
          xDistance: 1,
          yDistance: 0,
          xTickDistance: 1,
          yTickDistance: 0,
          layout_width: 600,
          layout_height: 250,
          layout_margin: 0,
          layout_snapto: "grid",
          xAxisLabel: "X",
          yAxisLabel: "Y",
          title_position: 55,
          line_position: 34,
          point_box_position: 60
        },
        background_image: {
          src: "",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 100,
          showShapePoints: false
        },
        background_shapes: [],
        multiple_responses: false
      },
      onSelectQuestionType
    },
    {
      type: "feature",
      data: {
        title: "Passage",
        type: "passage",
        heading: "Section 3",
        math_renderer: "",
        content: "Enabling a <b>highlightable</b> text passage that can be used across multiple items."
      },
      list: ["Item A", "Item B"],
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTFormula,
      stimulus: "",
      data: {
        title: "Math formula",
        is_math: true,
        stimulus: "<p>[This is the stem.]</p>",
        type: "math",
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: ""
              }
            ]
          }
        },
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["units_si", "units_us", "qwerty"],
        template: ""
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTFractions,
      stimulus: "",
      data: {
        title: "Math with fractions",
        is_math: true,
        stimulus: "<p>[This is the stem.]</p>",
        template: `\\frac${EMBED_RESPONSE}${EMBED_RESPONSE}`,
        type: "math",
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: "\\frac{x}{x}"
              }
            ]
          }
        },
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["basic", "qwerty"]
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTFillInBlanks,
      stimulus: "",
      data: {
        title: "Math – fill in the blanks",
        is_math: true,
        stimulus: "<p>[This is the stem.]</p>",
        template: `${EMBED_RESPONSE} + ${EMBED_RESPONSE} =`,
        type: "math",
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: "x+y"
              }
            ]
          }
        },
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["basic", "qwerty"]
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTText,
      stimulus: "",
      data: {
        title: "Math with text",
        is_math: true,
        response_containers: [
          {
            width: "60px"
          }
        ],
        stimulus: "<p>[This is the stem.]</p>",
        type: "math",
        template: `${EMBED_RESPONSE}\\text{q ft}`,
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: "\\text{s}\\text{q ft}"
              }
            ]
          }
        },
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["basic", "qwerty"]
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTMatrices,
      stimulus: "",
      data: {
        title: "Math with matrices",
        is_math: true,
        stimulus: "<p>[This is the stem.]</p>",
        template: `\\begin{bmatrix}4&0\\\\1&-9\\end{bmatrix}\\times2=${EMBED_RESPONSE}`,
        type: "math",
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: ""
              }
            ]
          }
        },
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["matrices", "general", "qwerty"]
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTUnits,
      stimulus: "",
      data: {
        title: "Math with units",
        is_math: true,
        stimulus: "<p>[This is the stem.]</p>",
        template: `${EMBED_RESPONSE}=1m`,
        type: "math",
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [
              {
                method: "equivSymbolic",
                options: {
                  inverseResult: false,
                  significantDecimalPlaces: 10
                },
                value: "100cm=1m"
              }
            ]
          }
        },
        text_blocks: [
          "g",
          "kg",
          "mg",
          "m",
          "km",
          "cm",
          "mm",
          "L",
          "mL",
          "s",
          "ms",
          "oz",
          "lb",
          "in",
          "ft",
          "mi",
          "fl oz",
          "pt",
          "gal"
        ],
        ui_style: {
          type: "floating-keyboard"
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        symbols: ["units_si", "units_us", "qwerty"]
      },
      onSelectQuestionType
    },
    {
      type: "math",
      cardImage: MTEssay,
      stimulus: "",
      data: {
        title: "Math essay",
        stimulus: "<p>[This is the stem.]</p>",
        type: "formulaessay",
        ui_style: {
          default_mode: "math",
          fontsize: "",
          text_formatting_options: ["bold", "italic", "underline", "unorderedList"]
        },
        numberPad: [
          "7",
          "8",
          "9",
          "\\div",
          "4",
          "5",
          "6",
          "\\times",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          ",",
          "+",
          "left_move",
          "right_move",
          "Backspace",
          "="
        ],
        metadata: {},
        is_math: true,
        symbols: ["basic", "qwerty"]
      },
      onSelectQuestionType
    }
  ];
};
