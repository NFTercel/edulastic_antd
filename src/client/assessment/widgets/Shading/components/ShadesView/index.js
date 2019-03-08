import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styled/Wrapper";
import { Ul } from "./styled/Ul";
import { Li } from "./styled/Li";

const ShadesView = ({
  cellWidth,
  cellHeight,
  rowCount,
  colCount,
  onCellClick,
  shaded,
  hidden,
  border,
  hover,
  correctAnswers,
  showAnswers,
  marginTop,
  lockedCells,
  checkAnswers
}) => {
  const rowsArray = Array(rowCount).fill(null);

  const columnsArray = Array(colCount).fill(null);

  const isLockedIndexExists = (i, j) =>
    Array.isArray(lockedCells) && lockedCells.findIndex(shade => shade[0] === i && shade[1] === j) !== -1;

  const isShadeActive = (i, j) => shaded.findIndex(shade => shade[0] === i && shade[1] === j) !== -1;

  const getActiveShadesCount = shade => {
    let count = 0;

    rowsArray.forEach((row, i) => {
      columnsArray.forEach((col, j) => {
        if (isShadeActive(i, j) && !isLockedIndexExists(i, j)) {
          count++;
        }
      });
    });

    return count <= shade;
  };

  const isCorrectAnswer = (i, j) =>
    correctAnswers.findIndex(shade =>
      Array.isArray(shade) ? shade[0] === i && shade[1] === j : getActiveShadesCount(shade)
    ) !== -1;

  let count = -1;

  const getVisibility = ({ rowIndex, columnIndex }) => {
    let res = "visible";

    hidden.forEach(([row, column]) => {
      if (row === rowIndex && column === columnIndex) {
        res = "hidden";
      }
    });

    return res;
  };

  return (
    <Wrapper border={border} marginTop={marginTop}>
      {rowsArray.map((row, i) => (
        <Ul key={i}>
          {columnsArray.map((col, j) => {
            if (isShadeActive(i, j)) count++;

            return (
              <Li
                correct={
                  isCorrectAnswer(i, j) ||
                  (!Array.isArray(correctAnswers[0]) && isShadeActive(i, j) && correctAnswers[0] > count)
                }
                border={border}
                hover={hover}
                visibility={getVisibility({ rowIndex: i, columnIndex: j })}
                checkAnswers={checkAnswers}
                showAnswers={showAnswers}
                locked={isLockedIndexExists(i, j)}
                active={isShadeActive(i, j) || isLockedIndexExists(i, j)}
                onClick={isLockedIndexExists(i, j) ? undefined : onCellClick(i, j)}
                height={cellHeight}
                width={cellWidth}
                key={j}
              />
            );
          })}
        </Ul>
      ))}
    </Wrapper>
  );
};

ShadesView.propTypes = {
  cellHeight: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired,
  shaded: PropTypes.array.isRequired,
  hover: PropTypes.bool,
  border: PropTypes.string,
  hidden: PropTypes.array,
  lockedCells: PropTypes.any,
  correctAnswers: PropTypes.any,
  showAnswers: PropTypes.any,
  marginTop: PropTypes.any,
  checkAnswers: PropTypes.bool
};

ShadesView.defaultProps = {
  lockedCells: undefined,
  correctAnswers: [],
  hidden: [],
  showAnswers: false,
  marginTop: undefined,
  checkAnswers: false,
  border: "full",
  hover: true
};

export default ShadesView;
