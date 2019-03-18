import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withTheme } from "styled-components";
import { get } from "lodash";

import { Paper, Stimulus, FlexContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { Toolbar } from "../../styled/Toolbar";
import { Item } from "../../styled/Item";
import { PREVIEW, ON_LIMIT, ALWAYS } from "../../constants/constantsForQuestions";

import { ValidList } from "./constants/validList";
import { ReactQuillWrapper } from "./styled/ReactQuillWrapper";
import { getSpellCheckAttributes, getFontSize } from "../../utils/helpers";
import { Addon } from "../ShortText/styled/Addon";
import CharacterMap from "../../components/CharacterMap";

const EssayRichTextPreview = ({ view, saveAnswer, t, item, smallSize, userAnswer, theme }) => {
  const [showCharacters, setShowCharacters] = useState(false);
  const [text, setText] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const minHeight = get(item, "ui_style.min_height", 200);
  const maxHeight = get(item, "ui_style.max_height", 300);
  const placeholder = get(item, "placeholder", "");
  const fontSize = getFontSize(get(item, "ui_style.fontsize"));
  const characterMap = get(item, "character_map", []);

  const [wordCount, setWordCount] = useState(
    Array.isArray(userAnswer) ? 0 : userAnswer.split(" ").filter(i => !!i.trim()).length
  );

  useEffect(() => {
    if (Array.isArray(userAnswer)) {
      setText("");
      saveAnswer("");
      setWordCount(0);
    }
  }, [userAnswer]);

  const handleTextChange = (val, a, b, editor) => {
    setWordCount(
      editor
        .getText()
        .split(" ")
        .filter(i => !!i.trim()).length
    );

    setText(val);
    saveAnswer(val);
  };

  const handleSelect = range => {
    if (range) {
      setSelection({
        start: range.index,
        end: range.length
      });
    }
  };

  const handleCharacterSelect = char => {
    const newText = text.slice(0, selection.start) + char + text.slice(selection.end);

    setText(newText);
    saveAnswer(newText);

    setSelection({
      start: selection.start + char.length,
      end: selection.start + char.length
    });
  };

  const showLimitAlways = item.show_word_limit === ALWAYS;

  const showOnLimit = item.show_word_limit === ON_LIMIT;

  const displayWordCount =
    (showOnLimit && item.max_word < wordCount) || showLimitAlways
      ? `${wordCount} / ${item.max_word} ${t("component.essayText.wordsLimitTitle")}`
      : `${wordCount} ${t("component.essayText.wordsTitle")}`;

  const wordCountStyle =
    (showLimitAlways || showOnLimit) && item.max_word < wordCount
      ? { color: theme.widgets.essayRichText.wordCountLimitedColor }
      : {};

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      <div style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          {!!characterMap.length && <Addon onClick={() => setShowCharacters(!showCharacters)}>a</Addon>}
          {showCharacters && (
            <CharacterMap
              style={{ position: "absolute", right: 0, top: 38, zIndex: 1000 }}
              characters={characterMap}
              onSelect={handleCharacterSelect}
            />
          )}
        </div>
        {!Array.isArray(userAnswer) && (
          <ReactQuillWrapper
            id="mainQuill"
            minHeight={minHeight}
            maxHeight={maxHeight}
            fontSize={fontSize}
            placeholder={placeholder}
            onChangeSelection={handleSelect}
            style={{
              background:
                item.max_word < wordCount
                  ? theme.widgets.essayRichText.quillLimitedBgColor
                  : theme.widgets.essayRichText.quillBgColor
            }}
            defaultValue={
              smallSize ? t("component.essayText.rich.templateText") : Array.isArray(userAnswer) ? "" : userAnswer
            }
            onChange={handleTextChange}
            modules={EssayRichTextPreview.modules(item.formatting_options)}
            {...getSpellCheckAttributes(item.spellcheck)}
          />
        )}

        {item.show_word_count && (
          <Toolbar borderRadiusOnlyBottom>
            <FlexContainer />
            <Item style={wordCountStyle}>{displayWordCount}</Item>
          </Toolbar>
        )}
      </div>
    </Paper>
  );
};

EssayRichTextPreview.propTypes = {
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any,
  theme: PropTypes.object.isRequired
};

EssayRichTextPreview.defaultProps = {
  smallSize: false,
  userAnswer: ""
};

const toolbarOptions = options => {
  const arrSorted = options
    .filter(ite => ite.active)
    .map(item => {
      const { value, param } = item;
      return ValidList.includes(value) ? { [value]: param } : value;
    });

  const arr = [];
  let ind = 0;

  arrSorted.forEach((item, i) => {
    if (item === "|") {
      if (arrSorted[i + 1] === "|") {
        arrSorted.splice(i + 1, 1);
      }
      arr.push(arrSorted.slice(ind, i));
      ind = i + 1;
    }
    if (i === arrSorted.length - 1 && item !== "|") {
      arr.push(arrSorted.slice(ind));
    }
  });

  return arr;
};

EssayRichTextPreview.modules = options => ({
  toolbar: toolbarOptions(options)
});

EssayRichTextPreview.formats = [
  "header",
  "script",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align"
];

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(EssayRichTextPreview);
