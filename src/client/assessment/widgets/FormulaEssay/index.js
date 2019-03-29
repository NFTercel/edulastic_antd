import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import uuidv4 from "uuid/v4";
import styled from "styled-components";
import produce from "immer";

import { Paper } from "@edulastic/common";
import { typedList as typedListTypes } from "@edulastic/constants";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { checkAnswerAction } from "../../../author/src/actions/testItem";
import { replaceVariables, updateVariables } from "../../utils/variables";

import { CLEAR, PREVIEW, EDIT } from "../../constants/constantsForQuestions";

import TypedList from "../../components/TypedList";
import QuestionTextArea from "../../components/QuestionTextArea";
import { Subtitle } from "../../styled/Subtitle";

import FormulaEssayPreview from "./components/FormulaEssayPreview";
import FormulaEssayOptions from "./components/FormulaEssayOptions";

const EmptyWrapper = styled.div``;

const FormulaEssay = ({ view, previewTab, item, testItem, setQuestionData, smallSize, t }) => {
  const [lines, setLines] = useState([{ text: "", type: item.ui_style.default_mode, index: uuidv4() }]);

  const Wrapper = testItem ? EmptyWrapper : Paper;

  const handleItemChange = (prop, data) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = data;
        updateVariables(draft);
      })
    );
  };

  const handleAddOption = () => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style.text_formatting_options.push("");
      })
    );
  };

  const onSortOrderListEnd = ({ oldIndex, newIndex }) => {
    const newData = cloneDeep(item);
    newData.ui_style.text_formatting_options = arrayMove(newData.ui_style.text_formatting_options, oldIndex, newIndex);
    setQuestionData(newData);
  };

  const handleDeleteQuestion = index => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style.text_formatting_options.splice(index, 1);
        updateVariables(draft);
      })
    );
  };

  const handleQuestionsChange = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style.text_formatting_options[index] = value;
        updateVariables(draft);
      })
    );
  };

  const handleSetLines = plines => setLines(plines);

  const selectData = [
    { value: "", label: "" },
    { value: "bold", label: t("component.math.bold") },
    { value: "italic", label: t("component.math.italic") },
    { value: "underline", label: t("component.math.underline") },
    { value: "removeFormat", label: t("component.math.clearFormatting") },
    { value: "unorderedList", label: t("component.math.bulletList") },
    { value: "orderedList", label: t("component.math.numberedList") },
    { value: "superscript", label: t("component.math.superscript") },
    { value: "subscript", label: t("component.math.subscript") }
  ];

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && (
        <Fragment>
          <Paper style={{ marginBottom: 30 }}>
            <Subtitle>{t("component.math.composeQuestion")}</Subtitle>
            <QuestionTextArea
              placeholder={t("component.math.enterQuestion")}
              onChange={stimulus => handleItemChange("stimulus", stimulus)}
              value={item.stimulus}
            />
            <Subtitle>{t("component.math.textFormattingOptions")}</Subtitle>
            <TypedList
              columns={2}
              buttonText={t("component.math.add")}
              selectData={selectData}
              type={typedListTypes.SELECT}
              onAdd={handleAddOption}
              items={item.ui_style.text_formatting_options}
              onSortEnd={onSortOrderListEnd}
              onRemove={handleDeleteQuestion}
              onChange={handleQuestionsChange}
            />
          </Paper>
          <FormulaEssayOptions onChange={handleItemChange} item={item} />
        </Fragment>
      )}
      {view === PREVIEW && (
        <Wrapper style={{ height: "100%" }}>
          <FormulaEssayPreview
            lines={lines}
            setLines={handleSetLines}
            type={previewTab}
            item={itemForPreview}
            smallSize={smallSize}
          />
        </Wrapper>
      )}
    </Fragment>
  );
};

FormulaEssay.propTypes = {
  previewTab: PropTypes.string,
  view: PropTypes.string.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object,
  testItem: PropTypes.bool,
  smallSize: PropTypes.bool,
  t: PropTypes.func.isRequired
};

FormulaEssay.defaultProps = {
  previewTab: CLEAR,
  item: {},
  testItem: false,
  smallSize: false
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction,
      checkAnswer: checkAnswerAction
    }
  )
);

const FormulaEssayContainer = enhance(FormulaEssay);

export { FormulaEssayContainer as FormulaEssay };
