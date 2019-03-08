import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, get } from "lodash";
import { Select, Input } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";
import { Paper, Stimulus, FlexContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { AdaptiveSelect } from "./styled/AdaptiveSelect";

import {
  PREVIEW,
  BY_LOCATION_METHOD,
  BY_COUNT_METHOD,
  EDIT,
  CLEAR,
  CHECK,
  SHOW
} from "../../constants/constantsForQuestions";

import { Subtitle } from "../../styled/Subtitle";

import ShadesView from "./components/ShadesView";

const { Option } = Select;

const ShadingPreview = ({ view, item, smallSize, saveAnswer, userAnswer, method, t, previewTab, theme }) => {
  const { canvas, validation } = item;

  const [isCheck, setIsCheck] = useState(false);

  const cell_width = canvas ? canvas.cell_width : 1;
  const cell_height = canvas ? canvas.cell_height : 1;
  const row_count = canvas ? canvas.row_count : 1;
  const column_count = canvas ? canvas.column_count : 1;
  const shaded = canvas ? canvas.shaded : [];
  const read_only_author_cells = canvas ? canvas.read_only_author_cells : false;

  const validAnswer =
    validation && validation.valid_response && validation.valid_response.value && validation.valid_response.value.value;
  const altAnswers = validation && validation.alt_responses;

  useEffect(() => {
    if (view === PREVIEW && userAnswer.length === 0) {
      if (!read_only_author_cells) {
        saveAnswer(cloneDeep(shaded));
      }
    }
  }, [view]);

  useEffect(() => {
    if (previewTab === CLEAR && view !== EDIT && isCheck && userAnswer.length === 0) {
      if (!read_only_author_cells) {
        saveAnswer(cloneDeep(shaded));
      } else {
        saveAnswer([]);
      }
    }
    if (previewTab === CHECK) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [previewTab]);

  const validate = () => {
    const collection = Array.isArray(validAnswer) ? cloneDeep(validAnswer) : [validAnswer];

    altAnswers.forEach(answer => {
      if (Array.isArray(answer.value.value)) {
        answer.value.value.forEach(val => {
          if (!collection.includes(val)) {
            collection.push(val);
          }
        });
      } else if (!collection.includes(answer.value.value)) {
        collection.push(answer.value.value);
      }
    });

    return collection;
  };

  const correctAnswers = validation ? validate() : [];

  const handleCellClick = (rowNumber, colNumber) => () => {
    const newUserAnswer = cloneDeep(userAnswer);

    const indexOfSameShade = newUserAnswer.findIndex(shade => shade[0] === rowNumber && shade[1] === colNumber);

    if (indexOfSameShade === -1) {
      newUserAnswer.push([rowNumber, colNumber]);
    } else {
      newUserAnswer.splice(indexOfSameShade, 1);
    }

    if (item.max_selection && newUserAnswer.length > item.max_selection) {
      return;
    }

    saveAnswer(newUserAnswer);
  };

  const handleSelectMethod = value => {
    saveAnswer(value, true);
  };

  const preview = previewTab === CHECK || previewTab === SHOW;

  const hidden = get(item, "canvas.hidden", []);

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>

      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}
      <FlexContainer alignItems="flex-start" flexDirection="column">
        {view === EDIT && (
          <Fragment>
            <Subtitle
              fontSize={theme.widgets.shading.subtitleFontSize}
              color={theme.widgets.shading.subtitleColor}
              padding="0 0 16px 0"
            >
              {t("component.shading.methodSubtitle")}
            </Subtitle>
            <AdaptiveSelect value={method} onChange={handleSelectMethod}>
              <Option value={BY_LOCATION_METHOD}>{BY_LOCATION_METHOD}</Option>
              <Option value={BY_COUNT_METHOD}>{BY_COUNT_METHOD}</Option>
            </AdaptiveSelect>
          </Fragment>
        )}

        {view === PREVIEW && (
          <ShadesView
            marginTop={smallSize ? 10 : 0}
            cellWidth={smallSize ? 1 : cell_width}
            cellHeight={smallSize ? 1 : cell_height}
            rowCount={smallSize ? 3 : row_count}
            correctAnswers={previewTab === SHOW ? validAnswer : correctAnswers}
            showAnswers={previewTab === SHOW}
            checkAnswers={previewTab === CHECK}
            colCount={smallSize ? 8 : column_count}
            onCellClick={handleCellClick}
            shaded={Array.isArray(userAnswer) ? userAnswer : []}
            hidden={hidden}
            border={item.border}
            hover={item.hover}
            lockedCells={read_only_author_cells ? shaded : undefined}
          />
        )}

        {method === BY_LOCATION_METHOD ? (
          <ShadesView
            cellWidth={cell_width}
            cellHeight={cell_height}
            rowCount={row_count}
            correctAnswers={correctAnswers}
            showAnswers={preview}
            colCount={column_count}
            onCellClick={handleCellClick}
            shaded={Array.isArray(userAnswer) ? userAnswer : []}
            hidden={hidden}
            border={item.border}
            hover={item.hover}
            lockedCells={read_only_author_cells ? shaded : undefined}
          />
        ) : (
          view !== PREVIEW && (
            <Input
              size="large"
              type="number"
              style={{ marginTop: 40, width: 320 }}
              value={Array.isArray(userAnswer[0]) ? 0 : userAnswer[0]}
              onChange={e => saveAnswer([+e.target.value])}
            />
          )
        )}
      </FlexContainer>
    </Paper>
  );
};

ShadingPreview.propTypes = {
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  method: PropTypes.string,
  previewTab: PropTypes.string,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

ShadingPreview.defaultProps = {
  smallSize: false,
  userAnswer: null,
  previewTab: CLEAR,
  method: ""
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ShadingPreview);
