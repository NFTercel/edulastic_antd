import React from "react";
import PropTypes from "prop-types";

import { IconWrapper } from "./styled/IconWrapper";
import { RightIcon } from "./styled/RightIcon";
import { WrongIcon } from "./styled/WrongIcon";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

let maxLineHeight = 40;

const CheckboxTemplateBoxLayout = ({
  showAnswer,
  templateParts,
  responsecontainerindividuals,
  responseBtnStyle,
  fontSize,
  userSelections,
  stemNumeration,
  evaluation
}) => {
  let responseIndex = 0;

  return (
    <span className="template_box dropdown" style={{ fontSize, padding: 20 }}>
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
          const btnStyle = {
            width: 0,
            height: 0,
            widthpx: 0,
            heightpx: 0
          };
          if (responsecontainerindividuals && responsecontainerindividuals[dropTargetIndex]) {
            const { widthpx: widthpx1, heightpx: heightpx1 } = responsecontainerindividuals[dropTargetIndex];
            btnStyle.width = widthpx1;
            btnStyle.height = heightpx1;
            btnStyle.widthpx = widthpx1;
            btnStyle.heightpx = heightpx1;
          }
          if (btnStyle && btnStyle.width === 0) {
            btnStyle.width = responseBtnStyle.widthpx;
          } else {
            btnStyle.width = btnStyle.widthpx;
          }
          if (btnStyle && btnStyle.height === 0) {
            btnStyle.height = responseBtnStyle.heightpx;
          } else {
            btnStyle.height = btnStyle.heightpx;
          }
          maxLineHeight = maxLineHeight < btnStyle.height ? btnStyle.height : maxLineHeight;
          return (
            <span key={index}>
              {showAnswer && (
                <span
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
                </span>
              )}
              {!showAnswer && (
                <div className={`response-btn check-answer ${className}`} style={btnStyle}>
                  &nbsp;<span className="index">{indexStr}</span>
                  <span className="text">{userSelections[dropTargetIndex] && userSelections[dropTargetIndex]}</span>
                  &nbsp;
                  <IconWrapper>
                    {className === "right" && <RightIcon />}
                    {className === "wrong" && <WrongIcon />}
                  </IconWrapper>
                </div>
              )}
            </span>
          );
        }
        return (
          <span
            style={{ userSelect: "none", lineHeight: `${maxLineHeight}px` }}
            key={index}
            dangerouslySetInnerHTML={{ __html: templatePart }}
          />
        );
      })}
    </span>
  );
};

CheckboxTemplateBoxLayout.propTypes = {
  responsecontainerindividuals: PropTypes.array,
  fontSize: PropTypes.string,
  templateParts: PropTypes.array,
  responseBtnStyle: PropTypes.object,
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
  userSelections: [],
  stemNumeration: "numerical",
  evaluation: [],
  showAnswer: false
};

export default React.memo(CheckboxTemplateBoxLayout);
