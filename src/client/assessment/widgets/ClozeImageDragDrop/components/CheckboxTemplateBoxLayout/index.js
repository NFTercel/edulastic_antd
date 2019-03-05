import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import DropContainer from "../DropContainer";
import DragItem from "../DragItem";

import { Pointer } from "../../../../styled/Pointer";
import { Point } from "../../../../styled/Point";
import { Triangle } from "../../../../styled/Triangle";

import { IconWrapper } from "./styled/IconWrapper";
import { RightIcon } from "./styled/RightIcon";
import { WrongIcon } from "./styled/WrongIcon";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const CheckboxTemplateBoxLayout = ({
  showAnswer,
  responseContainers,
  imageUrl,
  imageWidth,
  imageAlterText,
  responsecontainerindividuals,
  responseBtnStyle,
  fontSize,
  userSelections,
  stemnumeration,
  evaluation,
  drop,
  onDropHandler,
  theme
}) => (
  <div className="imagedragdrop_template_box" style={{ fontSize, padding: 20 }}>
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: imageWidth,
        margin: "auto",
        minWidth: 600,
        maxWidth: "100%"
      }}
    >
      <img src={imageUrl} width="100%" style={{ userSelect: "none", pointerEvents: "none" }} alt={imageAlterText} />
      {responseContainers.map((responseContainer, index) => {
        const dropTargetIndex = index;
        const btnStyle = {
          widthpx: responseContainer.width,
          width: responseContainer.width,
          top: responseContainer.top,
          left: responseContainer.left,
          height: responseContainer.height,
          position: "absolute",
          borderRadius: 5
        };
        if (responsecontainerindividuals && responsecontainerindividuals[dropTargetIndex]) {
          const { widthpx } = responsecontainerindividuals[dropTargetIndex];
          btnStyle.width = widthpx;
          btnStyle.widthpx = widthpx;
        }
        if (btnStyle && btnStyle.width === 0) {
          btnStyle.width = responseBtnStyle.widthpx;
        } else {
          btnStyle.width = btnStyle.widthpx;
        }
        let indexStr = "";
        switch (stemnumeration) {
          case "lowercase": {
            indexStr = ALPHABET[dropTargetIndex];
            break;
          }
          case "uppercase": {
            indexStr = ALPHABET[dropTargetIndex].toUpperCase();
            break;
          }
          default:
            indexStr = dropTargetIndex + 1;
        }
        const className = evaluation[dropTargetIndex] ? "right" : "wrong";

        return (
          <React.Fragment key={index}>
            {!showAnswer && (
              <DropContainer
                index={index}
                style={btnStyle}
                className={`imagelabeldragdrop-droppable active check-answer ${className}`}
                drop={drop}
              >
                <span className="index index-box">{indexStr}</span>
                <div className="text container">
                  {userSelections[dropTargetIndex] &&
                    userSelections[dropTargetIndex].map((answer, user_select_index) => (
                      <DragItem
                        key={user_select_index}
                        index={user_select_index}
                        data={`${answer}_${dropTargetIndex}_fromResp`}
                        style={{
                          border: `solid 1px ${theme.widgets.clozeImageDragDrop.dragItemBorderColor}`,
                          margin: 5,
                          padding: 5,
                          display: "inline-block"
                        }}
                        item={answer}
                        onDrop={onDropHandler}
                      >
                        {answer}
                      </DragItem>
                    ))}
                </div>
                <IconWrapper>
                  {className === "right" && <RightIcon />}
                  {className === "wrong" && <WrongIcon />}
                </IconWrapper>
                <Pointer className={responseContainer.pointerPosition} width={responseContainer.width}>
                  <Point />
                  <Triangle />
                </Pointer>
              </DropContainer>
            )}
            {showAnswer && (
              <div
                style={btnStyle}
                className={`imagelabeldragdrop-droppable active check-answer ${className} show-answer`}
              >
                <span className="index index-box">{indexStr}</span>
                <div className="text container">
                  {userSelections[dropTargetIndex] &&
                    userSelections[dropTargetIndex].map((answer, user_select_index) => (
                      <div
                        key={user_select_index}
                        style={{
                          border: `solid 1px ${theme.widgets.clozeImageDragDrop.answerBorderColor}`,
                          margin: 5,
                          padding: 5,
                          display: "inline-block"
                        }}
                      >
                        {answer}
                      </div>
                    ))}
                </div>
                <IconWrapper>
                  {className === "right" && <RightIcon />}
                  {className === "wrong" && <WrongIcon />}
                </IconWrapper>
                <Pointer className={responseContainer.pointerPosition} width={responseContainer.width}>
                  <Point />
                  <Triangle />
                </Pointer>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

CheckboxTemplateBoxLayout.propTypes = {
  responsecontainerindividuals: PropTypes.array.isRequired,
  fontSize: PropTypes.string.isRequired,
  responseContainers: PropTypes.array.isRequired,
  responseBtnStyle: PropTypes.object.isRequired,
  userSelections: PropTypes.array.isRequired,
  stemnumeration: PropTypes.string.isRequired,
  evaluation: PropTypes.array.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  onDropHandler: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  drop: PropTypes.func.isRequired,
  imageAlterText: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(React.memo(CheckboxTemplateBoxLayout));
