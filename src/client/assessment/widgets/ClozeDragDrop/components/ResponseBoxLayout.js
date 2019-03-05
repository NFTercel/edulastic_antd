import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import Draggable from "./Draggable";

const ResponseBoxLayout = ({ smallSize, hasGroupResponses, responses, fontSize, dragHandler, onDrop, theme }) => {
  const handleMove = e => {
    if (e.clientY < 100) {
      window.scrollTo(window.pageXOffset, window.pageYOffset - 10);
    } else if (e.clientY > window.innerHeight - 100) {
      window.scrollTo(window.pageXOffset, window.pageYOffset + 10);
    }
  };

  useEffect(() => {
    document.body.addEventListener("dragover", handleMove);
    return () => {
      document.body.removeEventListener("dragover", handleMove);
    };
  }, []);

  return (
    <div
      className="responses_box"
      style={{
        padding: smallSize ? "5px 10px" : 16,
        borderRadius: smallSize ? 0 : 10,
        justifyContent: smallSize ? "space-around" : "flex-start"
      }}
    >
      {hasGroupResponses &&
        responses.map((groupResponse, index) => {
          if (groupResponse !== null && typeof groupResponse === "object") {
            return (
              <div key={index} className="group">
                <h3>{groupResponse.title}</h3>
                {groupResponse.options &&
                  groupResponse.options.map((option, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="draggable_box"
                      style={{
                        fontSize: smallSize ? theme.widgets.clozeDragDrop.groupDraggableBoxSmallFontSize : fontSize
                      }}
                    >
                      {!dragHandler && (
                        <Draggable onDrop={onDrop} data={`${option}_${index}`}>
                          {option}
                        </Draggable>
                      )}
                      {dragHandler && (
                        <React.Fragment>
                          <Draggable onDrop={onDrop} data={`${option}_${index}`}>
                            <i
                              className="fa fa-arrows-alt"
                              style={{
                                fontSize: theme.widgets.clozeDragDrop.draggableIconFontSize
                              }}
                            />
                            <span>{option}</span>
                          </Draggable>
                        </React.Fragment>
                      )}
                    </div>
                  ))}
              </div>
            );
          }
          return <React.Fragment key={index} />;
        })}
      {!hasGroupResponses &&
        responses.map((option, index) => (
          <div
            key={index}
            className="draggable_box"
            style={{
              fontSize: smallSize ? theme.widgets.clozeDragDrop.draggableBoxSmallFontSize : fontSize,
              fontWeight: smallSize
                ? theme.widgets.clozeDragDrop.draggableBoxSmallFontWeight
                : theme.widgets.clozeDragDrop.draggableBoxFontWeight
            }}
          >
            {!dragHandler && (
              <Draggable onDrop={onDrop} data={option}>
                {option}
              </Draggable>
            )}
            {dragHandler && (
              <React.Fragment>
                <Draggable onDrop={onDrop} data={option}>
                  <i
                    className="fa fa-arrows-alt"
                    style={{
                      fontSize: theme.widgets.clozeDragDrop.draggableIconFontSize
                    }}
                  />
                  <span>{option}</span>
                </Draggable>
              </React.Fragment>
            )}
          </div>
        ))}
    </div>
  );
};

ResponseBoxLayout.propTypes = {
  responses: PropTypes.array,
  fontSize: PropTypes.string,
  hasGroupResponses: PropTypes.bool,
  smallSize: PropTypes.bool,
  dragHandler: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

ResponseBoxLayout.defaultProps = {
  responses: [],
  fontSize: "13px",
  smallSize: false,
  hasGroupResponses: false,
  dragHandler: false
};

export default withTheme(React.memo(ResponseBoxLayout));
