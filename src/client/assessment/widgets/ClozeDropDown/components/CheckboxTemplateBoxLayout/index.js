import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { WithMathFormula } from "@edulastic/common";

import { IconWrapper } from "./styled/IconWrapper";
import { RightIcon } from "./styled/RightIcon";
import { WrongIcon } from "./styled/WrongIcon";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const MathSpan = WithMathFormula(styled.span`
  user-select: none;
`);

const CheckboxTemplateBoxLayout = ({
  showAnswer,
  templateParts,
  hasGroupResponses,
  responsecontainerindividuals,
  responseBtnStyle,
  fontSize,
  userSelections,
  stemNumeration,
  evaluation
}) => {
  let responseIndex = 0;

  return (
    <div className="template_box" style={{ fontSize, padding: 20 }}>
      {templateParts.map((templatePart, index) => {
        if (templatePart.indexOf('class="response-btn"') !== -1) {
          const dropTargetIndex = responseIndex;
          responseIndex++;
          let indexStr;
          const className = evaluation[dropTargetIndex] ? "right" : "wrong";
          switch (stemNumeration) {
            case "lowercase": {
              indexStr = ALPHABET[dropTargetIndex];
              break;
            }
            case "uppercase": {
              indexStr = ALPHABET[dropTargetIndex].toUpperCase();
              break;
            }
            case "numerical": {
              indexStr = dropTargetIndex + 1;
              break;
            }
            default:
          }
          let btnStyle = responsecontainerindividuals && responsecontainerindividuals[dropTargetIndex];
          if (btnStyle === undefined) {
            btnStyle = responseBtnStyle;
          }
          if (btnStyle && btnStyle.widthpx === 0) {
            btnStyle.widthpx = responseBtnStyle.widthpx;
          }
          if (btnStyle && btnStyle.heightpx === 0) {
            btnStyle.heightpx = responseBtnStyle.heightpx;
          }
          if (btnStyle && btnStyle.wordwrap === undefined) {
            btnStyle.wordwrap = responseBtnStyle.wordwrap;
          }
          return (
            <div key={index}>
              {showAnswer && hasGroupResponses && (
                <div
                  className={`response-btn check-answer ${className} ${showAnswer ? "show-answer" : ""}`}
                  style={btnStyle}
                >
                  &nbsp;<span className="index">{indexStr}</span>
                  <span className="text">
                    {userSelections[dropTargetIndex] && userSelections[dropTargetIndex].data}
                  </span>
                  &nbsp;
                  <IconWrapper>
                    {className === "right" && <RightIcon />}
                    {className === "wrong" && <WrongIcon />}
                  </IconWrapper>
                </div>
              )}
              {showAnswer && !hasGroupResponses && (
                <div
                  className={`response-btn check-answer ${className} ${showAnswer ? "show-answer" : ""}`}
                  style={btnStyle}
                >
                  &nbsp;<span className="index">{indexStr}</span>
                  <span className="text">{userSelections[dropTargetIndex] && userSelections[dropTargetIndex]}</span>
                  &nbsp;
                  <IconWrapper>
                    {className === "right" && <RightIcon />}
                    {className === "wrong" && <WrongIcon />}
                  </IconWrapper>
                </div>
              )}
              <div
                style={{
                  top: -5,
                  display: "inline-flex"
                }}
              >
                {!showAnswer && hasGroupResponses && (
                  <div>
                    <div className={`response-btn check-answer ${className}`} style={btnStyle}>
                      &nbsp;<span className="index">{indexStr}</span>
                      <span className="text">
                        {userSelections[dropTargetIndex] && userSelections[dropTargetIndex].data}
                      </span>
                      &nbsp;
                      <IconWrapper>
                        {className === "right" && <RightIcon />}
                        {className === "wrong" && <WrongIcon />}
                      </IconWrapper>
                    </div>
                  </div>
                )}
                {!showAnswer && !hasGroupResponses && (
                  <div>
                    <div className={`response-btn check-answer ${className}`} style={btnStyle}>
                      &nbsp;<span className="index">{indexStr}</span>
                      <span className="text">{userSelections[dropTargetIndex] && userSelections[dropTargetIndex]}</span>
                      &nbsp;
                      <IconWrapper>
                        {className === "right" && <RightIcon />}
                        {className === "wrong" && <WrongIcon />}
                      </IconWrapper>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
        return <MathSpan key={index} dangerouslySetInnerHTML={{ __html: templatePart }} />;
      })}
    </div>
  );
};

CheckboxTemplateBoxLayout.propTypes = {
  responsecontainerindividuals: PropTypes.array,
  fontSize: PropTypes.string,
  templateParts: PropTypes.array,
  responseBtnStyle: PropTypes.object,
  hasGroupResponses: PropTypes.bool,
  userSelections: PropTypes.array,
  stemNumeration: PropTypes.string,
  evaluation: PropTypes.array,
  showAnswer: PropTypes.bool
};

CheckboxTemplateBoxLayout.defaultProps = {
  responsecontainerindividuals: [],
  fontSize: "13px",
  templateParts: [],
  responseBtnStyle: {},
  hasGroupResponses: false,
  userSelections: [],
  stemNumeration: "numerical",
  evaluation: [],
  showAnswer: false
};

export default React.memo(CheckboxTemplateBoxLayout);
