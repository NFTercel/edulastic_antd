import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { Paper, Stimulus, FlexContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { Toolbar } from "../../styled/Toolbar";
import { Item } from "../../styled/Item";
import { PREVIEW, ON_LIMIT, ALWAYS } from "../../constants/constantsForQuestions";

import { ValidList } from "./constants/validList";

const EssayRichTextPreview = ({ view, saveAnswer, t, item, smallSize, userAnswer, theme }) => {
  const [wordCount, setWordCount] = useState(
    Array.isArray(userAnswer) ? 0 : userAnswer.split(" ").filter(i => !!i.trim()).length
  );

  const handleTextChange = (val, a, b, editor) => {
    setWordCount(
      editor
        .getText()
        .split(" ")
        .filter(i => !!i.trim()).length
    );
    saveAnswer(val);
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

      <ReactQuill
        id="mainQuill"
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
      />

      {item.show_word_count && (
        <Toolbar borderRadiusOnlyBottom>
          <FlexContainer />
          <Item style={wordCountStyle}>{displayWordCount}</Item>
        </Toolbar>
      )}
    </Paper>
  );
};

EssayRichTextPreview.propTypes = {
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired
};

EssayRichTextPreview.defaultProps = {
  smallSize: false
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
