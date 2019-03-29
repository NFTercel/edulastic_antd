import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { maxBy, isEmpty } from "lodash";

import { PaddingDiv, FlexContainer, MathFormulaDisplay } from "@edulastic/common";

import { ALPHABET } from "../../../constants/alphabet";
import { CheckboxContainer } from "../styled/CheckboxContainer";
import { MultiChoiceContent } from "../styled/MultiChoiceContent";
import { Label } from "../styled/Label";
import { IconWrapper } from "../styled/IconWrapper";
import { IconCheck } from "../styled/IconCheck";
import { IconClose } from "../styled/IconClose";
import { getFontSize } from "../../../../../utils/helpers";

const Option = props => {
  const {
    index,
    item,
    showAnswer,
    userSelections,
    onChange,
    smallSize,
    uiStyle,
    correct = [],
    checkAnswer,
    validation
  } = props;
  const [className, setClassName] = useState("");
  const isSelected = userSelections.includes(item.value);
  const isCorrect = correct[userSelections.indexOf(item.value)];
  const fontSize = getFontSize(uiStyle.fontsize);

  useEffect(() => {
    if (showAnswer) {
      let validAnswers = [];

      if (!isEmpty(validation)) {
        validAnswers = [validation.valid_response, ...validation.alt_responses];
      }

      const correctAnswer = maxBy(validAnswers, "score").value;
      if (correctAnswer.includes(item.value)) {
        setClassName("right");
      } else if (isSelected) {
        if (validAnswers.some(ans => ans.value.includes(item.value))) {
          setClassName("right");
        } else {
          setClassName("wrong");
        }
      }
    } else if (checkAnswer) {
      if (correct.length && checkAnswer) {
        if (isCorrect && isSelected) {
          setClassName("right");
        } else if (isCorrect === false && isSelected) {
          setClassName("wrong");
        }
      } else {
        setClassName("");
      }
    }
  }, [correct, showAnswer]);

  useEffect(() => {
    if (checkAnswer) {
      setClassName("");
    }
  }, [userSelections]);

  const getLabel = inx => {
    if (uiStyle.type === "block") {
      switch (uiStyle.choice_label) {
        case "number":
          return inx + 1;
        case "upper-alpha":
          return ALPHABET[inx].toUpperCase();
        case "lower-alpha":
          return ALPHABET[inx].toLowerCase();
        default:
          return inx + 1;
      }
    } else {
      return ALPHABET[inx].toUpperCase();
    }
  };

  const container = (
    <CheckboxContainer smallSize={smallSize}>
      <input type="checkbox" name="mcq_group" value={item.value} checked={isSelected} onChange={onChange} />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {getLabel(index)}
      </span>
      <div />
    </CheckboxContainer>
  );

  const renderCheckbox = () => {
    switch (uiStyle.type) {
      case "radioBelow":
        return (
          <FlexContainer flexDirection="column" justifyContent="center">
            <MultiChoiceContent fontSize={fontSize} smallSize={smallSize} style={{ marginBottom: 10 }}>
              <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
            {container}
          </FlexContainer>
        );
      case "block":
        return (
          <FlexContainer alignItems="center">
            {container}
            <MultiChoiceContent fontSize={fontSize} smallSize={smallSize}>
              <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
          </FlexContainer>
        );
      case "standard":
      default:
        return (
          <React.Fragment>
            {container}
            <MultiChoiceContent fontSize={fontSize} smallSize={smallSize}>
              <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
          </React.Fragment>
        );
    }
  };

  const width = uiStyle.columns ? `${100 / uiStyle.columns - 1}%` : "100%";

  return (
    // <Label width={width} smallSize={smallSize} className={className} showAnswer>
    // TODO setup label background color for each option
    <Label smallSize={smallSize} className={className} showAnswer>
      <PaddingDiv top={0} bottom={0}>
        <FlexContainer justifyContent={uiStyle.type === "radioBelow" ? "center" : "space-between"}>
          {renderCheckbox()}
          <IconWrapper>
            {((isSelected && checkAnswer) || showAnswer) && className === "right" && <IconCheck />}
            {((isSelected && checkAnswer) || showAnswer) && className === "wrong" && <IconClose />}
          </IconWrapper>
        </FlexContainer>
      </PaddingDiv>
    </Label>
  );
};

Option.propTypes = {
  index: PropTypes.number.isRequired,
  showAnswer: PropTypes.bool,
  item: PropTypes.any.isRequired,
  userSelections: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  checkAnswer: PropTypes.bool.isRequired,
  validation: PropTypes.any.isRequired,
  uiStyle: PropTypes.object.isRequired,
  correct: PropTypes.object.isRequired
};

Option.defaultProps = {
  showAnswer: false,
  smallSize: false,
  userSelections: []
};

export default React.memo(Option);
