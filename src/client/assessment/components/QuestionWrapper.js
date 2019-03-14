import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { questionType } from "@edulastic/constants";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";

import { PaperWrapper } from "./Graph/common/styled_components";
import { themes } from "../themes";
import QuestionMenu from "./Graph/common/QuestionMenu";

import { OrderList } from "../widgets/OrderList";
import { SortList } from "../widgets/SortList";
import { MatchList } from "../widgets/MatchList";
import { Classification } from "../widgets/Classification";
import { MultipleChoice } from "../widgets/MultipleChoice";
import { ClozeDragDrop } from "../widgets/ClozeDragDrop";
import { ClozeImageDragDrop } from "../widgets/ClozeImageDragDrop";
import { ClozeImageDropDown } from "../widgets/ClozeImageDropDown";
import { ClozeImageText } from "../widgets/ClozeImageText";
import { Graph } from "./Graph";
import { ClozeDropDown } from "../widgets/ClozeDropDown";
import { ClozeText } from "../widgets/ClozeText";
import { ShortText } from "../widgets/ShortText";
import { TokenHighlight } from "../widgets/TokenHighlight";
import { Shading } from "../widgets/Shading";
import { Hotspot } from "../widgets/Hotspot";
import { HighlightImage } from "../widgets/HighlightImage";
import { Drawing } from "./Drawing";
import { EssayPlainText } from "../widgets/EssayPlainText";
import { EssayRichText } from "../widgets/EssayRichText";

import withAnswerSave from "./HOC/withAnswerSave";
import { MatrixChoice } from "../widgets/MatrixChoice";
import { Protractor } from "../widgets/Protractor";
import { Passage } from "../widgets/Passage";
import { MathFormula } from "../widgets/MathFormula";
import { FormulaEssay } from "../widgets/FormulaEssay";
import FeedbackBottom from "./FeedbackBottom";
import FeedbackRight from "./FeedbackRight";
import Timespent from "./Timespent";
import { setQuestionDataAction } from "../../author/src/actions/question";

const getQuestion = type => {
  switch (type) {
    case questionType.DRAWING:
      return Drawing;
    case questionType.HIGHLIGHT_IMAGE:
      return HighlightImage;
    case questionType.SHADING:
      return Shading;
    case questionType.HOTSPOT:
      return Hotspot;
    case questionType.TOKEN_HIGHLIGHT:
      return TokenHighlight;
    case questionType.SHORT_TEXT:
      return ShortText;
    case questionType.ESSAY_PLAIN_TEXT:
      return EssayPlainText;
    case questionType.ESSAY_RICH_TEXT:
      return EssayRichText;
    case questionType.MULTIPLE_CHOICE:
      return MultipleChoice;
    case questionType.CHOICE_MATRIX:
      return MatrixChoice;
    case questionType.SORT_LIST:
      return SortList;
    case questionType.CLASSIFICATION:
      return Classification;
    case questionType.MATCH_LIST:
      return MatchList;
    case questionType.ORDER_LIST:
      return OrderList;
    case questionType.CLOZE_DRAG_DROP:
      return ClozeDragDrop;
    case questionType.CLOZE_IMAGE_DRAG_DROP:
      return ClozeImageDragDrop;
    case questionType.PROTRACTOR:
      return Protractor;
    case questionType.CLOZE_IMAGE_DROP_DOWN:
      return ClozeImageDropDown;
    case questionType.CLOZE_IMAGE_TEXT:
      return ClozeImageText;
    case questionType.CLOZE_DROP_DOWN:
      return ClozeDropDown;
    case questionType.CLOZE_TEXT:
      return ClozeText;
    case questionType.PASSAGE:
      return Passage;
    case questionType.MATH:
      return MathFormula;
    case questionType.FORMULA_ESSAY:
      return FormulaEssay;
    case "graph":
      return Graph;
    default:
      return null;
  }
};

class QuestionWrapper extends Component {
  state = {
    main: [],
    advanced: [],
    activeTab: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.findActiveTab);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.findActiveTab);
  }

  calcScrollPosition = (index, offset) => {
    const scrollYMax =
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;

    if (index === 0) {
      return window.scrollY + 90;
    }
    if (index !== 0 && offset < scrollYMax) {
      return window.scrollY + 250;
    }
    if (index !== 0 && offset >= scrollYMax) {
      return window.scrollY + 650;
      // return window.scrollY + (offset - scrollYMax + 200)
    }
  };

  isActive = (index, options) => {
    const scrollPosition = this.calcScrollPosition(index, options[index].offset);

    if (index === 0) {
      if (scrollPosition <= options[index].offset) {
        return true;
      }
    } else if (index === options.length - 1) {
      if (scrollPosition <= document.documentElement.scrollHeight && scrollPosition >= options[index].offset) {
        return true;
      }
    } else if (scrollPosition >= options[index].offset && scrollPosition <= options[index + 1].offset) {
      return true;
    }
    return false;
  };

  findActiveTab = () => {
    const { main, advanced, activeTab } = this.state;
    const allOptions = main.concat(advanced);

    if (allOptions) {
      allOptions.forEach((option, index) => {
        if (this.isActive(index, allOptions)) {
          if (index !== activeTab) {
            return this.setState({ activeTab: index });
          }
        }
      });
    }
  };

  fillSections = (section, label, offset) => {
    this.setState(state => ({
      [section]: state[section].concat({ label, offset })
    }));
  };

  cleanSections = () => {
    this.setState({ main: [], advanced: [], activeTab: 0 });
  };

  render() {
    const { type, timespent, data, showFeedback, multiple, view, setQuestionData, t, ...restProps } = this.props;
    const { main, advanced, activeTab } = this.state;
    const Question = getQuestion(type);
    const studentName = ""; // data.activity.studentName;

    return (
      <ThemeProvider theme={themes.default}>
        <PaperWrapper style={{ width: "-webkit-fill-available", display: "flex" }}>
          {type === "graph" && view === "edit" && (
            <QuestionMenu activeTab={activeTab} main={main} advanced={advanced} />
          )}
          <Fragment>
            <div style={{ flex: "auto" }}>
              <Timespent timespent={timespent} view={view} />
              <Question
                {...restProps}
                setQuestionData={setQuestionData}
                item={data}
                view={view}
                cleanSections={this.cleanSections}
                fillSections={this.fillSections}
              />
            </div>
            {showFeedback &&
              (multiple ? <FeedbackBottom widget={data} /> : <FeedbackRight widget={data} studentName={studentName} />)}
          </Fragment>
        </PaperWrapper>
      </ThemeProvider>
    );
  }
}

QuestionWrapper.propTypes = {
  type: PropTypes.any,
  view: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  data: PropTypes.object,
  saveClicked: PropTypes.bool,
  testItem: PropTypes.bool
};

QuestionWrapper.defaultProps = {
  isNew: false,
  type: null,
  data: {},
  saveClicked: false,
  testItem: false
};

const enhance = compose(
  React.memo,
  withAnswerSave,
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(QuestionWrapper);
