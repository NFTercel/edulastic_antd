import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import { CenteredText } from "@edulastic/common";

import DropContainer from "../../../components/DropContainer";

import DragItem from "./DragItem";
import { Column } from "../styled/Column";
import { RowTitleCol } from "../styled/RowTitleCol";

const TableRow = ({
  startIndex,
  colCount,
  arrayOfRows,
  rowTitles,
  drop,
  answers,
  preview,
  possible_responses,
  onDrop,
  validArray,
  theme
}) => {
  const styles = {
    columnContainerStyle: {
      display: "flex",
      flexWrap: "wrap",
      padding: "70px 50px",
      height: "100%",
      borderRadius: 4,
      backgroundColor: theme.widgets.classification.dropContainerBgColor
    }
  };

  const cols = [];

  for (let index = startIndex; index < startIndex + colCount; index++) {
    if (arrayOfRows.has(index) && rowTitles.length > 0) {
      cols.push(
        <RowTitleCol key={index} colCount={colCount}>
          <CenteredText style={{ wordWrap: "break-word", textAlign: "left" }}>
            <div dangerouslySetInnerHTML={{ __html: rowTitles[index / colCount] }} />
          </CenteredText>
        </RowTitleCol>
      );
    }
    cols.push(
      <Column key={index} rowTitles={rowTitles} colCount={colCount}>
        <DropContainer
          style={{
            ...styles.columnContainerStyle,
            justifyContent: "center"
          }}
          noTopBorder={index / colCount >= 1}
          drop={drop}
          index={index}
          flag="column"
        >
          {Array.isArray(answers) &&
            Array.isArray(answers[index]) &&
            answers[index].length > 0 &&
            answers[index].map((answerValue, answerIndex) => (
              <DragItem
                valid={validArray[index].includes(possible_responses.indexOf(answerValue))}
                preview={preview}
                key={answerIndex}
                renderIndex={possible_responses.indexOf(answerValue)}
                onDrop={onDrop}
                item={answerValue}
              />
            ))}
        </DropContainer>
      </Column>
    );
  }

  return <tr>{cols}</tr>;
};

TableRow.propTypes = {
  startIndex: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
  arrayOfRows: PropTypes.object.isRequired,
  rowTitles: PropTypes.array.isRequired,
  drop: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  preview: PropTypes.bool.isRequired,
  possible_responses: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  validArray: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(TableRow);
