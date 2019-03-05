import React from "react";
import PropTypes from "prop-types";

import QuestionHeader from "../common/QuestionHeader";
import GraphContainer from "./GraphContainer";

const GraphQuadrantsDisplay = ({
  qIndex,
  smallSize,
  question,
  uiStyle,
  elements,
  showAnswer,
  checkAnswer,
  preview,
  ...restProps
}) => (
  <div>
    <QuestionHeader qIndex={qIndex} smallSize={smallSize} dangerouslySetInnerHTML={{ __html: question }} />
    {showAnswer ? "showAnswer" : null}
    {checkAnswer ? "checkAnswer" : null}
    {preview ? "preview" : null}
    <GraphContainer
      uiStyle={uiStyle}
      elements={elements}
      {...restProps}
      showAnswer={showAnswer}
      checkAnswer={checkAnswer}
    />
  </div>
);

GraphQuadrantsDisplay.propTypes = {
  smallSize: PropTypes.bool,
  question: PropTypes.string.isRequired,
  uiStyle: PropTypes.object,
  tools: PropTypes.array.isRequired,
  canvasConfig: PropTypes.object.isRequired,
  bgImgOptions: PropTypes.object.isRequired,
  backgroundShapes: PropTypes.array,
  onChange: PropTypes.func,
  validation: PropTypes.object,
  elements: PropTypes.array,
  showAnswer: PropTypes.bool,
  checkAnswer: PropTypes.bool
};

GraphQuadrantsDisplay.defaultProps = {
  uiStyle: {},
  smallSize: false,
  onChange: () => {},
  validation: {},
  elements: [],
  showAnswer: false,
  checkAnswer: false,
  backgroundShapes: []
};

export default GraphQuadrantsDisplay;
