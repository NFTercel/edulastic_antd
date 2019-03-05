import React from "react";
import PropTypes from "prop-types";

import { PaddingDiv, FlexContainer } from "@edulastic/common";

import { ALPHABET } from "../../../constants/alphabet";

import { CheckboxContainer } from "../styled/CheckboxContainer";
import { MultiChoiceContent } from "../styled/MultiChoiceContent";
import { Label } from "../styled/Label";
import { IconWrapper } from "../styled/IconWrapper";
import { IconCheck } from "../styled/IconCheck";
import { IconClose } from "../styled/IconClose";

const getFontSize = size => {
  switch (size) {
    case "small":
      return "10px";
    case "normal":
      return "13px";
    case "large":
      return "17px";
    case "xlarge":
      return "20px";
    case "xxlarge":
      return "24px";
    default:
      return "12px";
  }
};

const Option = props => {
  const { index, item, showAnswer, userSelections, onChange, smallSize, uiStyle, correct, view } = props;
  const isSelected = userSelections.includes(item.value);

  let className = "";

  if (showAnswer) {
    className = "right";
  }

  if (correct) {
    className = "right";
  }

  if (correct === false) {
    className = "wrong";
  }

  const fontSize = getFontSize(uiStyle.fontsize);

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
      return "";
    }
  };

  const container = (
    <CheckboxContainer smallSize={smallSize}>
      <input type="checkbox" name="mcq_group" value={index} checked={isSelected} onChange={onChange} />
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
              <div dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
            {container}
          </FlexContainer>
        );
      case "block":
        return (
          <FlexContainer alignItems="center">
            {container}
            <MultiChoiceContent fontSize={fontSize} smallSize={smallSize}>
              <div dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
          </FlexContainer>
        );
      case "standard":
      default:
        return (
          <React.Fragment>
            {container}
            <MultiChoiceContent fontSize={fontSize} smallSize={smallSize}>
              <div dangerouslySetInnerHTML={{ __html: item.label }} />
            </MultiChoiceContent>
          </React.Fragment>
        );
    }
  };

  const isChecked = isSelected && !className && uiStyle.type === "block" && !showAnswer;
  const width = uiStyle.columns ? `${100 / uiStyle.columns - 1}%` : "100%";
  let labelClassName = isChecked ? "checked" : className;
  const isPreview = view === "preview" && !isSelected;

  if (isPreview) {
    labelClassName = "preview";
  }

  return (
    <Label width={width} smallSize={smallSize} className={labelClassName} showAnswer>
      <PaddingDiv top={smallSize ? 0 : 10} bottom={smallSize ? 0 : 10}>
        <FlexContainer justifyContent={uiStyle.type === "radioBelow" ? "center" : "space-between"}>
          {renderCheckbox()}
          <IconWrapper>
            {isSelected && className === "right" && <IconCheck />}
            {isSelected && className === "wrong" && <IconClose />}
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
  uiStyle: PropTypes.object.isRequired,
  correct: PropTypes.object.isRequired
};

Option.defaultProps = {
  showAnswer: false,
  smallSize: false,
  userSelections: []
};

export default React.memo(Option);
