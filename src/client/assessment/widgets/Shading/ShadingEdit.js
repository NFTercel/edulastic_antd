import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Input, Row, Col } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";
import produce from "immer";

import { withNamespaces } from "@edulastic/localization";
import { Paper } from "@edulastic/common";

import { EDIT } from "../../constants/constantsForQuestions";
import { updateVariables } from "../../utils/variables";

import withPoints from "../../components/HOC/withPoints";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import { Subtitle } from "../../styled/Subtitle";

import ShadesView from "./components/ShadesView";
import ShadingPreview from "./ShadingPreview";
import { StyledCheckbox } from "./styled/StyledCheckbox";
import Options from "./components/Options";

const OptionsList = withPoints(ShadingPreview);

const ShadingEdit = ({ item, setQuestionData, t, theme, saveAnswer }) => {
  const { canvas } = item;

  const cell_width = canvas ? canvas.cell_width : 1;
  const cell_height = canvas ? canvas.cell_height : 1;
  const row_count = canvas ? canvas.row_count : 1;
  const column_count = canvas ? canvas.column_count : 1;
  const shaded = canvas ? canvas.shaded : [];
  const read_only_author_cells = canvas ? canvas.read_only_author_cells : false;

  const [correctTab, setCorrectTab] = useState(0);

  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;

        updateVariables(draft);
      })
    );
  };

  const handleCanvasOptionsChange = (prop, val) => {
    setQuestionData(
      produce(item, draft => {
        draft.canvas[prop] = val;

        if (prop === "column_count" || prop === "row_count") {
          draft.canvas.shaded = [];
        }

        updateVariables(draft);
      })
    );
  };

  const handleAddAnswer = () => {
    setQuestionData(
      produce(item, draft => {
        if (!draft.validation.alt_responses) {
          draft.validation.alt_responses = [];
        }
        draft.validation.alt_responses.push({
          score: 1,
          value: { ...draft.validation.valid_response.value }
        });
      })
    );
    setCorrectTab(item.validation.alt_responses.length);
  };

  const handlePointsChange = val => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.score = val;
        } else {
          draft.validation.alt_responses[correctTab - 1].score = val;
        }

        updateVariables(draft);
      })
    );
  };

  const handleAnswerChange = (ans, method) => {
    setQuestionData(
      produce(item, draft => {
        if (method) {
          if (correctTab === 0) {
            draft.validation.valid_response.value.method = ans;
            draft.validation.valid_response.value.value = [];
          } else {
            draft.validation.alt_responses[correctTab - 1].value.method = ans;
            draft.validation.alt_responses[correctTab - 1].value.value = [];
          }
        } else if (correctTab === 0) {
          draft.validation.valid_response.value.value = [...ans];
        } else {
          draft.validation.alt_responses[correctTab - 1].value.value = [...ans];
        }

        updateVariables(draft);
      })
    );
  };

  const handleCloseTab = tabIndex => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.splice(tabIndex, 1);

        setCorrectTab(0);
        updateVariables(draft);
      })
    );
  };

  const handleOnCellClick = (rowNumber, colNumber) => () => {
    setQuestionData(
      produce(item, draft => {
        const indexOfSameShade = draft.canvas.shaded.findIndex(
          shade => shade[0] === rowNumber && shade[1] === colNumber
        );

        if (indexOfSameShade === -1) {
          draft.canvas.shaded.push([rowNumber, colNumber]);
        } else {
          draft.canvas.shaded.splice(indexOfSameShade, 1);
        }

        updateVariables(draft);
      })
    );
  };

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      method={
        correctTab === 0
          ? item.validation.valid_response.value.method
          : item.validation.alt_responses[correctTab - 1].value.method
      }
      userAnswer={
        correctTab === 0
          ? item.validation.valid_response.value.value
          : item.validation.alt_responses[correctTab - 1].value.value
      }
      view={EDIT}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.shading.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.shading.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <Subtitle>{t("component.shading.canvasSubtitle")}</Subtitle>

        <Row gutter={70}>
          <Col span={12}>
            <Subtitle
              fontSize={theme.widgets.shading.subtitleFontSize}
              color={theme.widgets.shading.subtitleColor}
              padding="0 0 16px 0"
            >
              {t("component.shading.rowsCountSubtitle")}
            </Subtitle>

            <Input
              size="large"
              value={row_count}
              onChange={e => handleCanvasOptionsChange("row_count", +e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Subtitle
              fontSize={theme.widgets.shading.subtitleFontSize}
              color={theme.widgets.shading.subtitleColor}
              padding="0 0 16px 0"
            >
              {t("component.shading.colsCountSubtitle")}
            </Subtitle>

            <Input
              size="large"
              value={column_count}
              onChange={e => handleCanvasOptionsChange("column_count", +e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={70}>
          <Col span={12}>
            <Subtitle fontSize={theme.widgets.shading.subtitleFontSize} color={theme.widgets.shading.subtitleColor}>
              {t("component.shading.cellWidthSubtitle")}
            </Subtitle>

            <Input
              size="large"
              value={cell_width}
              onChange={e => handleCanvasOptionsChange("cell_width", +e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Subtitle fontSize={theme.widgets.shading.subtitleFontSize} color={theme.widgets.shading.subtitleColor}>
              {t("component.shading.cellHeightSubtitle")}
            </Subtitle>

            <Input
              size="large"
              value={cell_height}
              onChange={e => handleCanvasOptionsChange("cell_height", +e.target.value)}
            />
          </Col>
        </Row>

        <Subtitle>{t("component.shading.shadesSubtitle")}</Subtitle>

        <div>
          <ShadesView
            colCount={column_count || 1}
            rowCount={row_count || 1}
            cellHeight={cell_height || 1}
            cellWidth={cell_width || 1}
            onCellClick={handleOnCellClick}
            border={item.border}
            hover={item.hover}
            shaded={shaded}
          />
        </div>

        <StyledCheckbox
          onChange={() => handleCanvasOptionsChange("read_only_author_cells", !read_only_author_cells)}
          defaultChecked={read_only_author_cells}
        >
          {t("component.shading.lockShadedCells")}
        </StyledCheckbox>

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>

      <Options saveAnswer={saveAnswer} />
    </Fragment>
  );
};

ShadingEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ShadingEdit);
