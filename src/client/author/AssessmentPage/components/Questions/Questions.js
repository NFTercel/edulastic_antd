import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";
import { methods } from "@edulastic/constants/const/math";

import { getPreviewSelector, getViewSelector } from "../../../src/selectors/view";
import { checkAnswerAction } from "../../../src/actions/testItem";
import { changePreviewAction } from "../../../src/actions/view";
import { EXACT_MATCH } from "../../../../assessment/constants/constantsForQuestions";
import {
  addQuestionAction,
  updateQuestionAction,
  getQuestionsArraySelector,
  getQuestionsSelector
} from "../../../sharedDucks/questions";
import AddQuestion from "../AddQuestion/AddQuestion";
import QuestionItem from "../QuestionItem/QuestionItem";
import QuestionEditModal from "../QuestionEditModal/QuestionEditModal";
import { QuestionsWrapper, AnswerActionsWrapper, AnswerAction } from "./styled";

const defaultQuestionValue = {
  [MULTIPLE_CHOICE]: [],
  [SHORT_TEXT]: "",
  [CLOZE_DROP_DOWN]: [],
  [MATH]: [
    {
      method: methods.EQUIV_SYMBOLIC,
      options: {
        inverseResult: false,
        significantDecimalPlaces: 10
      },
      value: ""
    }
  ]
};

const defaultQuestionOptions = {
  [MULTIPLE_CHOICE]: [],
  [CLOZE_DROP_DOWN]: {
    0: ["A", "B"]
  }
};

const mathData = {
  is_math: true,
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
};

const createQuestion = type => ({
  id: uuid(),
  title: `${type} - standart`,
  type,
  options: defaultQuestionOptions[type],
  validation: {
    scoring_type: "exactMatch",
    valid_response: {
      score: 1,
      value: defaultQuestionValue[type]
    },
    alt_responses: []
  },
  multiple_responses: false,
  ...(type === MATH ? mathData : {})
});

const updateQuesionData = (question, data) => ({
  ...question,
  ...data
});

const updateMultipleChoice = optionsValue => {
  const options = optionsValue.split(" ");
  return {
    options: options.map((option, index) => ({
      label: option,
      value: index + 1
    })),
    validation: {
      scoring_type: "exactMatch",
      valid_response: {
        score: 1,
        value: []
      },
      alt_responses: []
    }
  };
};

const updateShortText = value => ({
  validation: {
    scoring_type: EXACT_MATCH,
    valid_response: {
      score: 1,
      matching_rule: EXACT_MATCH,
      value
    },
    alt_responses: []
  }
});

const validationCreators = {
  [MULTIPLE_CHOICE]: updateMultipleChoice,
  [SHORT_TEXT]: updateShortText
};

class Questions extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    questionsById: PropTypes.object,
    addQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    changePreview: PropTypes.func.isRequired,
    previewMode: PropTypes.string.isRequired,
    viewMode: PropTypes.string.isRequired
  };

  static defaultProps = {
    list: [],
    questionsById: {}
  };

  state = {
    currentEditQuestionIndex: -1
  };

  handleAddQuestion = type => () => {
    const { addQuestion } = this.props;

    const question = createQuestion(type);
    addQuestion(question);
  };

  handleCreateOptions = (questionId, type) => ({ target: { value } }) => {
    const { questionsById, updateQuestion } = this.props;
    const question = questionsById[questionId];
    const createValidation = validationCreators[type];

    if (question) {
      const questionWithOptions = updateQuesionData(question, createValidation(value));

      updateQuestion(questionWithOptions);
    }
  };

  handleUpdateData = data => {
    const { updateQuestion } = this.props;
    const question = this.currentQuestion;

    const nextQuestion = updateQuesionData(question, data);

    updateQuestion(nextQuestion);
  };

  handleOpenEditModal = questionIndex => () =>
    this.setState({
      currentEditQuestionIndex: questionIndex
    });

  handleCloseEditModal = () =>
    this.setState({
      currentEditQuestionIndex: -1
    });

  handleCheckAnswer = () => {
    const { checkAnswer, changePreview } = this.props;

    changePreview("check");
    checkAnswer("edit");
  };

  handleShowAnswer = () => {
    const { checkAnswer, changePreview } = this.props;

    changePreview("show");
    checkAnswer("edit");
  };

  get currentQuestion() {
    const { currentEditQuestionIndex } = this.state;
    const { list } = this.props;

    return list[currentEditQuestionIndex];
  }

  get editModalVisible() {
    const { currentEditQuestionIndex } = this.state;
    return currentEditQuestionIndex > -1;
  }

  render() {
    const { currentEditQuestionIndex } = this.state;
    const { list, previewMode, viewMode } = this.props;

    const review = viewMode === "review";

    return (
      <>
        <QuestionsWrapper>
          <div>
            {list.map((question, i) => (
              <QuestionItem
                key={question.id}
                index={i}
                data={question}
                onCreateOptions={this.handleCreateOptions}
                onOpenEdit={this.handleOpenEditModal(i)}
                previewMode={previewMode}
                viewMode={viewMode}
              />
            ))}
          </div>
          {!review && <AddQuestion onAdd={this.handleAddQuestion} />}
          {review && (
            <AnswerActionsWrapper>
              <AnswerAction active={previewMode === "check"} onClick={this.handleCheckAnswer}>
                Check Answer
              </AnswerAction>
              <AnswerAction active={previewMode === "show"} onClick={this.handleShowAnswer}>
                Show Answer
              </AnswerAction>
            </AnswerActionsWrapper>
          )}
        </QuestionsWrapper>
        <QuestionEditModal
          visible={this.editModalVisible}
          question={this.currentQuestion}
          index={currentEditQuestionIndex}
          onClose={this.handleCloseEditModal}
          onUpdate={this.handleUpdateData}
          onCurrentChange={this.handleOpenEditModal}
        />
      </>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      list: getQuestionsArraySelector(state),
      questionsById: getQuestionsSelector(state),
      previewMode: getPreviewSelector(state),
      viewMode: getViewSelector(state)
    }),
    {
      addQuestion: addQuestionAction,
      updateQuestion: updateQuestionAction,
      checkAnswer: checkAnswerAction,
      changePreview: changePreviewAction
    }
  )
);

export default enhance(Questions);
