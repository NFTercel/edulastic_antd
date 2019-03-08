import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { cloneDeep, isEqual, difference, get } from "lodash";
import { compose } from "redux";
import { withTheme } from "styled-components";

import {
  Paper,
  FlexContainer,
  CorrectAnswersContainer,
  Stimulus,
  Subtitle,
  CenteredText,
  InstructorStimulus,
  MathFormulaDisplay
} from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import DropContainer from "../../components/DropContainer";
import { PREVIEW, SHOW, CLEAR, CHECK } from "../../constants/constantsForQuestions";

import DragItem from "./components/DragItem";
import { IndexBox } from "./styled/IndexBox";
import TableRow from "./components/TableRow";
import { getStyles } from "./utils";
import { getFontSize, getDirection } from "../../utils/helpers";

const ClassificationPreview = ({
  view,
  saveAnswer,
  item,
  t,
  userAnswer,
  previewTab,
  smallSize,
  editCorrectAnswers,
  theme
}) => {
  const styles = {
    itemContainerStyle: {
      display: "flex",
      alignItems: "center",
      margin: "10px 15px 10px 15px"
    },
    previewItemStyle: {
      paddingRight: 15,
      paddingLeft: 15,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      cursor: "normal",
      fontWeight: theme.widgets.classification.previewItemFontWeight
    },
    noPreviewItemStyle: {},
    dragItemsContainerStyle: {
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
      minHeight: 140,
      borderRadius: 4
    },
    correctAnswersMargins: { marginBottom: 0, marginRight: 30 }
  };

  const {
    possible_responses: posResponses,
    group_possible_responses,
    possible_response_groups,
    stimulus,
    ui_style: { column_count: colCount, column_titles: colTitles, row_count: rowCount, row_titles: rowTitles }
  } = item;

  const itemValidation = item.validation || {};
  let validArray = itemValidation && itemValidation.valid_response && itemValidation.valid_response.value;
  validArray = validArray || [];
  const altArray = itemValidation.alt_responses || [];
  let groupArrays = [];

  possible_response_groups.forEach(o => {
    groupArrays = [...groupArrays, ...o.responses];
  });

  const posResp = group_possible_responses ? groupArrays : posResponses;

  const possible_responses =
    editCorrectAnswers.length > 0
      ? posResp.filter(ite => editCorrectAnswers.every(i => !i.includes(posResp.indexOf(ite))))
      : posResp;

  const initialLength = (colCount || 2) * (rowCount || 1);

  const createEmptyArrayOfArrays = () => Array(...Array(initialLength)).map(() => []);

  const initialAnswers =
    editCorrectAnswers.length > 0
      ? editCorrectAnswers.map(ite => ite.map(an => posResp[an]))
      : userAnswer.some(arr => arr.length !== 0)
      ? userAnswer.map(arr => arr.map(ans => possible_responses[ans]))
      : createEmptyArrayOfArrays();

  const [answers, setAnswers] = useState(initialAnswers);

  const [dragItems, setDragItems] = useState(
    possible_responses.filter(resp => initialAnswers.every(arr => !arr.includes(resp)))
  );

  useEffect(() => {
    setAnswers(initialAnswers);
    setDragItems(possible_responses.filter(resp => initialAnswers.every(arr => !arr.includes(resp))));
  }, [userAnswer]);

  useEffect(() => {
    if (
      answers.length !== createEmptyArrayOfArrays().length ||
      (editCorrectAnswers.length > 0 && !isEqual(answers, initialAnswers)) ||
      ((possible_responses.length !== dragItems.length && editCorrectAnswers.length > 0) ||
        (editCorrectAnswers.length > 0 && !isEqual(possible_responses, dragItems)))
    ) {
      setAnswers(initialAnswers);
      setDragItems(possible_responses);
    }
  });

  const boxes = createEmptyArrayOfArrays();

  const onDrop = (itemCurrent, itemTo) => {
    const columnCount = get(item, "ui_style.column_count", 0);

    const dItems = cloneDeep(dragItems);
    const ansArrays = cloneDeep(answers);

    if (ansArrays[itemTo.index].length >= columnCount) {
      return;
    }

    if (itemTo.flag === "dragItems") {
      ansArrays.forEach(arr => {
        if (arr.includes(itemCurrent.item)) {
          arr.splice(arr.indexOf(itemCurrent.item), 1);
        }
      });

      if (!dItems.includes(itemCurrent.item)) {
        dItems.push(itemCurrent.item);
        setDragItems(dItems);
      }
    } else if (dItems.includes(itemCurrent.item)) {
      dItems.splice(dItems.indexOf(itemCurrent.item), 1);
      setDragItems(dItems);
    }

    if (itemTo.flag === "column") {
      ansArrays.forEach((arr, i) => {
        if (arr.includes(itemCurrent.item)) {
          arr.splice(arr.indexOf(itemCurrent.item), 1);
        }

        if (i === itemTo.index) {
          arr.push(itemCurrent.item);
        }
      });
    }

    if (!isEqual(ansArrays, answers)) {
      setAnswers(ansArrays);
    }
    saveAnswer(ansArrays.map(ansArr => ansArr.map(ans => posResp.indexOf(ans))));
  };

  const drop = ({ flag, index }) => ({ flag, index });

  const validateAnswers = () => {
    const testArr = answers.map(array => array.map(answer => possible_responses.indexOf(answer)));

    let valid = cloneDeep(validArray);

    let flag = true;

    altArray.forEach(altItem => {
      flag = true;
      altItem.value.forEach((answer, i) => {
        if (difference(testArr[i], answer).length !== 0) {
          flag = false;
        }
      });
      if (flag) {
        valid = cloneDeep(altItem.value);
      }
    });

    return valid;
  };

  const transformArray = Arr => {
    const len = colCount || 2;

    const res = Array(...Array(len)).map(() => []);

    Arr.forEach((arr, i) => {
      res[i % len] = res[i % len].concat(arr);
    });

    return res;
  };

  const valRespArr = validateAnswers();

  const preview = previewTab === CHECK || previewTab === SHOW;

  const arrayOfRows = new Set(
    boxes.map((n, ind) => (ind % colCount === 0 ? ind : undefined)).filter(i => i !== undefined)
  );

  const arrayOfCols = transformArray(validArray);

  const listPosition = get(item, "ui_style.possibility_list_position", "bottom");
  const rowHeader = get(item, "ui_style.row_header", null);
  const fontSize = getFontSize(get(item, "ui_style.fontsize", "normal"));

  const wrapperStyle = {
    display: "flex",
    flexDirection: getDirection(listPosition)
  };

  return (
    <Paper style={{ fontSize }} padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {!smallSize && view === PREVIEW && <Stimulus dangerouslySetInnerHTML={{ __html: stimulus }} />}

      <div style={wrapperStyle}>
        <table style={{ width: "100%", flexGrow: 2 }}>
          <thead>
            {rowHeader && (
              <tr>
                <th colSpan={2} dangerouslySetInnerHTML={{ __html: rowHeader }} />
              </tr>
            )}
            <tr>
              {rowTitles.length > 0 && <th />}
              {colTitles.slice(0, colCount).map((ite, ind) => (
                <th key={ind}>
                  <CenteredText dangerouslySetInnerHTML={{ __html: ite }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {boxes.map(
              (n, ind) =>
                arrayOfRows.has(ind) && (
                  <TableRow
                    key={ind}
                    startIndex={ind}
                    width={get(item, "ui_style.row_titles_width", "100%")}
                    height={get(item, "ui_style.row_min_height", "150px")}
                    colCount={colCount}
                    arrayOfRows={arrayOfRows}
                    rowTitles={rowTitles}
                    drop={drop}
                    answers={answers}
                    validArray={valRespArr}
                    preview={preview}
                    possible_responses={possible_responses}
                    onDrop={onDrop}
                  />
                )
            )}
          </tbody>
        </table>

        {dragItems.length > 0 && (
          <CorrectAnswersContainer title={t("component.classification.dragItemsTitle")}>
            <DropContainer flag="dragItems" drop={drop} style={styles.dragItemsContainerStyle} noBorder>
              <FlexContainer style={{ width: "100%" }} alignItems="stretch" justifyContent="center">
                {group_possible_responses ? (
                  possible_response_groups.map((i, index) => (
                    <Fragment key={index}>
                      <FlexContainer
                        style={{ flex: 1 }}
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Subtitle
                          style={{
                            color: theme.widgets.classification.previewSubtitleColor
                          }}
                        >
                          {i.title}
                        </Subtitle>
                        <FlexContainer justifyContent="center" style={{ width: "100%", flexWrap: "wrap" }}>
                          {i.responses.map(
                            (ite, ind) =>
                              dragItems.includes(ite) && (
                                <DragItem
                                  key={ind}
                                  preview={preview}
                                  renderIndex={possible_responses.indexOf(ite)}
                                  onDrop={onDrop}
                                  item={ite}
                                />
                              )
                          )}
                        </FlexContainer>
                      </FlexContainer>
                      {index !== possible_response_groups.length - 1 && (
                        <div
                          style={{
                            width: 0,
                            marginLeft: 35,
                            marginRight: 35,
                            borderLeft: `1px solid ${theme.widgets.classification.separatorBorderColor}`
                          }}
                        />
                      )}
                    </Fragment>
                  ))
                ) : (
                  <Fragment>
                    <FlexContainer
                      style={{ flex: 1 }}
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <FlexContainer justifyContent="center" style={{ width: "100%", flexWrap: "wrap" }}>
                        {dragItems.map(
                          (ite, ind) =>
                            dragItems.includes(ite) && (
                              <DragItem
                                key={ind}
                                preview={preview}
                                renderIndex={possible_responses.indexOf(ite)}
                                onDrop={onDrop}
                                item={ite}
                              />
                            )
                        )}
                      </FlexContainer>
                    </FlexContainer>
                  </Fragment>
                )}
              </FlexContainer>
            </DropContainer>
          </CorrectAnswersContainer>
        )}

        {previewTab === SHOW && (
          <CorrectAnswersContainer title={t("component.classification.correctAnswers")}>
            {arrayOfCols.map((arr, i) => (
              <FlexContainer>
                <Subtitle style={styles.correctAnswersMargins}>
                  <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: colTitles[i] }} />
                </Subtitle>
                {arr.map(index => (
                  <div style={styles.itemContainerStyle} key={index}>
                    <IndexBox preview={preview}>{index + 1}</IndexBox>
                    <MathFormulaDisplay
                      style={getStyles(
                        false,
                        theme.widgets.classification.boxBgColor,
                        theme.widgets.classification.boxBorderColor,
                        styles.previewItemStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: posResp[index] }}
                    />
                  </div>
                ))}
              </FlexContainer>
            ))}
          </CorrectAnswersContainer>
        )}
      </div>
    </Paper>
  );
};

ClassificationPreview.propTypes = {
  previewTab: PropTypes.string,
  editCorrectAnswers: PropTypes.array,
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any.isRequired,
  view: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

ClassificationPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  editCorrectAnswers: []
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ClassificationPreview);
