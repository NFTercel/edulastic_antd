import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";
import { get } from "lodash";

import { Paper, Stimulus, CorrectAnswersContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { CHECK, SHOW, PREVIEW, CLEAR, CONTAINS } from "../../constants/constantsForQuestions";

import { SmallContainer } from "./styled/SmallContainer";
import { SmallStim } from "./styled/SmallStim";
import { getSpellCheckAttributes, getFontSize } from "../../utils/helpers";
import { Addon } from "./styled/Addon";
import CharacterMap from "../../components/CharacterMap";
import { InputWrapper } from "./styled/InputWrapper";

const ShortTextPreview = ({ view, saveAnswer, t, item, previewTab, smallSize, userAnswer, theme }) => {
  const [text, setText] = useState(Array.isArray(userAnswer) ? "" : userAnswer);
  const [showCharacterMap, setShowCharacterMap] = useState(false);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (Array.isArray(userAnswer)) {
      setText("");
    }
  });

  const handleTextChange = e => {
    const val = e.target.value;
    setText(val);
    saveAnswer(val);
  };

  const handleSelect = e => {
    const { selectionStart, selectionEnd } = e.target;

    if (selectionStart !== selectionEnd) {
      setSelection({
        start: selectionStart,
        end: selectionEnd
      });
    } else {
      setSelection(null);
    }

    setSelection({
      start: selectionStart,
      end: selectionEnd
    });
  };

  const validate = () => {
    let flag = false;

    if (item.validation.valid_response.value === text) {
      return true;
    }

    if (
      item.validation.valid_response.matching_rule === CONTAINS &&
      text &&
      text.toLowerCase().includes(item.validation.valid_response.value.toLowerCase())
    ) {
      return true;
    }

    item.validation.alt_responses.forEach(ite => {
      if (ite.value === text) {
        flag = true;
      }

      if (ite.matching_rule === CONTAINS && text && text.toLowerCase().includes(ite.value.toLowerCase())) {
        flag = true;
      }
    });

    return flag;
  };

  const preview = previewTab === CHECK || previewTab === SHOW;

  const style = {
    paddingRight: 35,
    fontSize: getFontSize(get(item, "ui_style.fontsize")),
    ...(preview
      ? validate()
        ? { background: theme.widgets.shortText.correctInputBgColor }
        : { background: theme.widgets.shortText.incorrectInputBgColor }
      : {})
  };

  const isCharacterMap = Array.isArray(item.character_map) && !!item.character_map.length;

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      {smallSize && (
        <SmallContainer>
          <SmallStim bold>{t("component.shortText.smallSizeTitle")}</SmallStim>

          <SmallStim>{t("component.shortText.smallSizePar")}</SmallStim>
        </SmallContainer>
      )}

      <InputWrapper>
        <Input
          style={style}
          value={text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          placeholder={item.placeholder || ""}
          type={get(item, "ui_style.input_type", "text")}
          size="large"
          {...getSpellCheckAttributes(item.spellcheck)}
        />
        {isCharacterMap && <Addon onClick={() => setShowCharacterMap(!showCharacterMap)}>á</Addon>}
        {isCharacterMap && showCharacterMap && (
          <CharacterMap
            characters={item.character_map}
            onSelect={char => {
              setSelection({
                start: selection.start + char.length,
                end: selection.start + char.length
              });
              setText(text.slice(0, selection.start) + char + text.slice(selection.end));
            }}
            style={{ position: "absolute", right: 0 }}
          />
        )}
      </InputWrapper>

      {previewTab === SHOW && (
        <CorrectAnswersContainer title={t("component.shortText.correctAnswers")}>
          {item.validation.valid_response.value}
        </CorrectAnswersContainer>
      )}
    </Paper>
  );
};

ShortTextPreview.propTypes = {
  previewTab: PropTypes.string,
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired
};

ShortTextPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ShortTextPreview);
