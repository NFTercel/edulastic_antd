import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep, isEqual, get } from "lodash";
import { withTheme } from "styled-components";
import { compose } from "redux";
import {
  Paper,
  FlexContainer,
  CorrectAnswersContainer,
  Stimulus,
  Subtitle,
  CorItem,
  InstructorStimulus,
  MathFormulaDisplay
} from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import DropContainer from "../../components/DropContainer";
import { CHECK, SHOW, PREVIEW, CLEAR } from "../../constants/constantsForQuestions";
import DragItem from "./components/DragItem";
import { ListItem } from "./styled/ListItem";
import { Separator } from "./styled/Separator";
import { CorTitle } from "./styled/CorTitle";
import { getFontSize, getDirection } from "../../utils/helpers";

const styles = {
  dropContainerStyle: smallSize => ({
    width: "100%",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: smallSize ? 26 : 44,
    padding: 0
  }),
  listItemContainerStyle: { width: "100%", marginBottom: 6, marginTop: 6 },
  dragItemsContainerStyle: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    minHeight: 140,
    borderRadius: 4
  }
};

const MatchListPreview = ({
  view,
  saveAnswer,
  userAnswer,
  item,
  t,
  previewTab,
  smallSize,
  editCorrectAnswers,
  theme
}) => {
  const { possible_responses: posResponses, possible_response_groups, group_possible_responses, stimulus, list } = item;

  const itemValidation = item.validation || {};
  let validArray = itemValidation.valid_response && itemValidation.valid_response.value;
  validArray = validArray || [];
  const altArray = itemValidation.alt_responses || [];
  let groupArrays = [];

  possible_response_groups.forEach(o => {
    groupArrays = [...groupArrays, ...o.responses];
  });

  const possible_responses = group_possible_responses ? groupArrays : posResponses;

  const [ans, setAns] = useState(
    Array.isArray(userAnswer) && !userAnswer.every(answer => answer === null)
      ? userAnswer
      : Array.from({ length: list.length }).fill(null)
  );

  const [dragItems, setDragItems] = useState(
    possible_responses.filter(answer => Array.isArray(userAnswer) && !userAnswer.includes(answer))
  );

  useEffect(() => {
    setAns(
      Array.isArray(userAnswer) && !userAnswer.every(answer => answer === null)
        ? userAnswer
        : Array.from({ length: list.length }).fill(null)
    );
    setDragItems(possible_responses.filter(answer => Array.isArray(userAnswer) && !userAnswer.includes(answer)));
  }, [userAnswer]);

  if (editCorrectAnswers.length > 0) {
    if (
      !isEqual(ans, editCorrectAnswers) ||
      !isEqual(dragItems, possible_responses.filter(ite => !editCorrectAnswers.includes(ite)))
    ) {
      setAns(editCorrectAnswers);
      setDragItems(possible_responses.filter(ite => !editCorrectAnswers.includes(ite)));
    }
  }

  const drop = ({ flag, index }) => ({ flag, index });

  const onDrop = (itemCurrent, itemTo) => {
    const answers = cloneDeep(ans);
    const dItems = cloneDeep(dragItems);

    if (itemTo.flag === "ans") {
      if (dItems.includes(itemCurrent.item)) {
        dItems.splice(dItems.indexOf(itemCurrent.item), 1);
      }
      if (answers[itemTo.index] && answers[itemTo.index] !== itemCurrent.item) {
        dItems.push(ans[itemTo.index]);
      }
      if (answers.includes(itemCurrent.item)) {
        answers[answers.indexOf(itemCurrent.item)] = null;
      }

      answers[itemTo.index] = itemCurrent.item;
    } else if (answers.includes(itemCurrent.item)) {
      answers[answers.indexOf(itemCurrent.item)] = null;
      dItems.push(itemCurrent.item);
    }

    if (!isEqual(ans, answers)) {
      setAns(answers);
    }

    if (!isEqual(dItems, dragItems)) {
      setDragItems(dItems);
    }

    saveAnswer(answers);
  };

  const getStyles = ({ flag, preview, correct, isDragging }) => ({
    display: "flex",
    width: flag === "dragItems" ? "auto" : "100%",
    alignItems: "center",
    justifyContent: preview ? "space-between" : "center",
    margin: flag === "dragItems" ? "10px 15px 10px 15px" : "10px 0px 10px 0",
    background: preview
      ? correct
        ? theme.widgets.matchList.dragItemCorrectBgColor
        : theme.widgets.matchList.dragItemIncorrectBgColor
      : theme.widgets.matchList.dragItemBgColor,
    border: `1px solid ${theme.widgets.matchList.dragItemBorderColor}`,
    height: 40,
    padding: preview ? 0 : "0 40px",
    cursor: "pointer",
    borderRadius: 4,
    fontWeight: theme.widgets.matchList.dragItemFontWeight,
    color: theme.widgets.matchList.dragItemColor,
    opacity: isDragging ? 0.5 : 1
  });

  const preview = previewTab === CHECK || previewTab === SHOW;

  const validAnswers = ans.filter((ite, i) => ite === validArray[i]);

  let altAnswers = [...validAnswers];

  altArray.forEach(ite => {
    let res = [];

    res = ans.filter((an, i) => ite.value[i] === an);

    if (res.length > altAnswers.length) {
      altAnswers = res;
    }
  });

  const fontSize = getFontSize(get(item, "ui_style.fontsize", "normal"));
  const listPosition = get(item, "ui_style.possibility_list_position", "bottom");

  const wrapperStyle = {
    display: "flex",
    flexDirection: getDirection(listPosition)
  };

  return (
    <Paper style={{ fontSize }} padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {!smallSize && view === PREVIEW && <Stimulus dangerouslySetInnerHTML={{ __html: stimulus }} />}

      <div style={wrapperStyle}>
        <FlexContainer style={{ flexGrow: 10 }} flexDirection="column" alignItems="flex-start">
          {list.map((ite, i) => (
            <FlexContainer
              key={i}
              style={styles.listItemContainerStyle}
              alignItems="center"
              childMarginRight={smallSize ? 13 : 45}
            >
              <ListItem smallSize={smallSize}>
                <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: ite }} />
              </ListItem>
              <Separator smallSize={smallSize} />
              <DropContainer
                noBorder={!!ans[i]}
                index={i}
                drop={drop}
                flag="ans"
                style={styles.dropContainerStyle(smallSize)}
              >
                <DragItem
                  preview={preview}
                  correct={altAnswers.includes(ans[i])}
                  flag="ans"
                  renderIndex={i}
                  onDrop={onDrop}
                  item={ans[i]}
                  getStyles={getStyles}
                />
              </DropContainer>
            </FlexContainer>
          ))}
        </FlexContainer>

        <CorrectAnswersContainer title={t("component.matchList.dragItemsTitle")}>
          <DropContainer drop={drop} flag="dragItems" style={styles.dragItemsContainerStyle} noBorder>
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
                          color: theme.widgets.matchList.previewSubtitleColor
                        }}
                      >
                        {i.title}
                      </Subtitle>
                      <FlexContainer justifyContent="center" style={{ width: "100%", flexWrap: "wrap" }}>
                        {i.responses.map(
                          (ite, ind) =>
                            dragItems.includes(ite) && (
                              <DragItem flag="dragItems" onDrop={onDrop} key={ind} item={ite} getStyles={getStyles} />
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
                          borderLeft: `1px solid ${theme.widgets.matchList.groupSeparatorBorderColor}`
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
                              flag="dragItems"
                              onDrop={onDrop}
                              key={ind}
                              renderIndex={ind}
                              item={ite}
                              getStyles={getStyles}
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
      </div>

      {previewTab === SHOW && (
        <CorrectAnswersContainer title={t("component.matchList.correctAnswers")}>
          {list.map((ite, i) => (
            <FlexContainer key={i} alignItems="center">
              <CorTitle>
                <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: ite }} />
              </CorTitle>
              <CorItem index={i}>
                <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: validArray[i] }} />
              </CorItem>
            </FlexContainer>
          ))}
        </CorrectAnswersContainer>
      )}
    </Paper>
  );
};

MatchListPreview.propTypes = {
  previewTab: PropTypes.string,
  editCorrectAnswers: PropTypes.array,
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired
};

MatchListPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  editCorrectAnswers: []
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(MatchListPreview);
