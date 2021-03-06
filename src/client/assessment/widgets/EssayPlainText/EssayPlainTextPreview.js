import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";
import { get } from "lodash";

import { Paper, Stimulus, FlexContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { COPY, CUT, PASTE, ON_LIMIT, ALWAYS, PREVIEW } from "../../constants/constantsForQuestions";

import { Toolbar } from "../../styled/Toolbar";
import { Item } from "../../styled/Item";

import { ToolbarItem } from "./styled/ToolbarItem";
import { preventEvent, getFontSize, getSpellCheckAttributes } from "../../utils/helpers";
import Character from "./components/Character";

const EssayPlainTextPreview = ({ view, saveAnswer, t, item, smallSize, userAnswer, theme }) => {
  const [text, setText] = useState(Array.isArray(userAnswer) ? "" : userAnswer);

  const [wordCount, setWordCount] = useState(text.split(" ").filter(i => !!i).length);

  const [selection, setSelection] = useState(null);

  const [buffer, setBuffer] = useState("");

  let node;

  useEffect(() => {
    if (Array.isArray(userAnswer)) {
      setText("");
      saveAnswer("");
      setWordCount(0);
    }
  }, [userAnswer]);

  const handleTextChange = e => {
    const val = e.target.value;
    setText(val);
    setWordCount(val.split(" ").filter(i => !!i).length);
    saveAnswer(val);
  };

  const handleSelect = () => {
    if (node.textAreaRef.selectionStart !== node.textAreaRef.selectionEnd) {
      setSelection({
        start: node.textAreaRef.selectionStart,
        end: node.textAreaRef.selectionEnd
      });
    } else {
      setSelection(null);
    }

    setSelection({
      start: node.textAreaRef.selectionStart,
      end: node.textAreaRef.selectionEnd
    });
  };

  const handleAction = action => () => {
    switch (action) {
      case COPY:
        if (selection) {
          setBuffer(text.slice(selection.start, selection.end));
        }
        break;
      case CUT: {
        if (selection) {
          setBuffer(text.slice(selection.start, selection.end));
          setText(text.slice(0, selection.start) + text.slice(selection.end));
        }
        break;
      }
      case PASTE: {
        if (selection.end) {
          setText(text.slice(0, selection.start) + buffer + text.slice(selection.end));
        } else {
          setText(text.slice(0, selection.start) + buffer + text.slice(selection.start));
        }
        break;
      }

      default:
        break;
    }
  };

  const showLimitAlways = item.show_word_limit === ALWAYS;

  const showOnLimit = item.show_word_limit === ON_LIMIT;

  const displayWordCount =
    (showOnLimit && item.max_word < wordCount) || showLimitAlways
      ? `${wordCount} / ${item.max_word} ${t("component.essayText.wordsLimitTitle")}`
      : `${wordCount} ${t("component.essayText.wordsTitle")}`;

  const wordCountStyle =
    (showLimitAlways || showOnLimit) && item.max_word < wordCount
      ? { color: theme.widgets.essayPlainText.wordCountLimitedColor }
      : {};

  const minHeight = get(item, "ui_style.min_height", "inherit");
  const maxHeight = get(item, "ui_style.max_height", "inherit");
  const fontSize = getFontSize(get(item, "ui_style.fontsize", "normal"));

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      <Toolbar borderRadiusOnlyTop style={{ borderBottom: 0 }}>
        <FlexContainer childMarginRight={0} alignItems="stretch" justifyContent="space-between">
          {item.show_copy && <ToolbarItem onClick={handleAction(COPY)}>{t("component.essayText.copy")}</ToolbarItem>}
          {item.show_cut && <ToolbarItem onClick={handleAction(CUT)}>{t("component.essayText.cut")}</ToolbarItem>}
          {item.show_paste && <ToolbarItem onClick={handleAction(PASTE)}>{t("component.essayText.paste")}</ToolbarItem>}
          {Array.isArray(item.character_map) && (
            <Character
              onSelect={char => {
                setSelection({
                  start: selection.start + char.length,
                  end: selection.start + char.length
                });
                setText(text.slice(0, selection.start) + char + text.slice(selection.end));
              }}
              characters={item.character_map}
            />
          )}
        </FlexContainer>
      </Toolbar>

      <Input.TextArea
        ref={ref => {
          node = ref;
        }}
        style={{
          borderRadius: 0,
          minHeight,
          maxHeight,
          fontSize,
          background:
            item.max_word < wordCount
              ? theme.widgets.essayPlainText.textInputLimitedBgColor
              : theme.widgets.essayPlainText.textInputBgColor
        }}
        rows={4}
        onSelect={handleSelect}
        value={smallSize ? t("component.essayText.plain.templateText") : text}
        onChange={handleTextChange}
        size="large"
        onPaste={preventEvent}
        onCopy={preventEvent}
        onCut={preventEvent}
        placeholder={item.placeholder || ""}
        {...getSpellCheckAttributes(item.spellcheck)}
      />

      {item.show_word_count && (
        <Toolbar borderRadiusOnlyBottom style={{ borderTop: 0 }}>
          <FlexContainer alignItems="stretch" justifyContent="space-between" />

          <Item style={wordCountStyle}>{displayWordCount}</Item>
        </Toolbar>
      )}
    </Paper>
  );
};

EssayPlainTextPreview.propTypes = {
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired
};

EssayPlainTextPreview.defaultProps = {
  smallSize: false
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(EssayPlainTextPreview);
