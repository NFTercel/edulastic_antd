import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { withNamespaces } from "@edulastic/localization";
import { Paper, Tabs, Tab, CustomQuillComponent } from "@edulastic/common";
import produce from "immer";

import { WORD_MODE, PARAGRAPH_MODE, SENTENCE_MODE, EDIT } from "../../constants/constantsForQuestions";
import { updateVariables } from "../../utils/variables";

import withPoints from "../../components/HOC/withPoints";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import { Subtitle } from "../../styled/Subtitle";

import TokenHighlightPreview from "./TokenHighlightPreview";
import { Container } from "./styled/Container";
import { ModeButton } from "./styled/ModeButton";
import Options from "./components/Options";

const OptionsList = withPoints(TokenHighlightPreview);

const TokenHighlightEdit = ({ item, setQuestionData, t }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const [templateTab, setTemplateTab] = useState(0);

  const mode = item.tokenization;

  const initialArray = item.template.replace(/(<p>|<\/p>)*/g, "").split('<p class="newline_section"><br>');

  const paragraphsArray = initialArray.map(el => ({
    value: `${el}<br/>`,
    active: true
  }));

  const sentencesArray = initialArray
    .join("<br/>")
    .split(".")
    .map(el => ({ value: `${el}.`, active: true }))
    .filter(el => el.value !== "." && el.value.trim() && el.value !== "<br/>.");

  const wordsArray = initialArray
    .join("<br/> ")
    .split(" ")
    .map(el => ({ value: `${el}`, active: true }));

  const [template, setTemplate] = useState();

  useEffect(() => {
    setQuestionData(
      produce(item, draft => {
        if (template || draft.templeWithTokens.length === 0) {
          let resultArray = "";
          if (mode === WORD_MODE) {
            resultArray = wordsArray;
          } else if (mode === PARAGRAPH_MODE) {
            resultArray = paragraphsArray;
          } else {
            resultArray = sentencesArray;
          }

          draft.templeWithTokens = resultArray;

          setTemplate(resultArray);
        } else {
          draft.templeWithTokens = item.templeWithTokens;
          setTemplate(cloneDeep(item.templeWithTokens));
        }
        updateVariables(draft);
      })
    );
  }, [mode]);

  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        if (prop === "template") {
          let resultArray = "";
          if (mode === WORD_MODE) {
            resultArray = cloneDeep(wordsArray);
          } else if (mode === PARAGRAPH_MODE) {
            resultArray = cloneDeep(paragraphsArray);
          } else {
            resultArray = cloneDeep(sentencesArray);
          }
          setTemplate(resultArray);
        }

        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const handleTemplateClick = i => () => {
    const newTemplate = cloneDeep(template);
    setQuestionData(
      produce(item, draft => {
        newTemplate[i].active = !newTemplate[i].active;

        draft.templeWithTokens = newTemplate;

        setTemplate(newTemplate);
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
          value: draft.validation.valid_response.value
        });
      })
    );
    setCorrectTab(correctTab + 1);
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

  const handleAnswerChange = ans => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.value = ans;
        } else {
          draft.validation.alt_responses[correctTab - 1].value = ans;
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

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      editCorrectAnswers={
        correctTab === 0 ? item.validation.valid_response.value : item.validation.alt_responses[correctTab - 1].value
      }
      view={EDIT}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.tokenHighlight.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.tokenHighlight.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <Subtitle>{t("component.tokenHighlight.templateTitle")}</Subtitle>
        <Tabs style={{ marginBottom: 15 }} value={templateTab} onChange={setTemplateTab}>
          <Tab label={t("component.tokenHighlight.editTemplateTab")} />
          <Tab label={t("component.tokenHighlight.editTokenTab")} />
        </Tabs>

        {templateTab === 0 && (
          <CustomQuillComponent
            firstFocus={item.firstMount === undefined}
            toolbarId="template"
            onChange={val => handleItemChangeChange("template", val)}
            showResponseBtn={false}
            value={item.template}
          />
        )}

        {templateTab === 1 && (
          <Fragment>
            <Container>
              <ModeButton
                active={mode === PARAGRAPH_MODE}
                onClick={() => handleItemChangeChange("tokenization", PARAGRAPH_MODE)}
                type="button"
              >
                {t("component.tokenHighlight.paragraph")}
              </ModeButton>
              <ModeButton
                active={mode === SENTENCE_MODE}
                onClick={() => handleItemChangeChange("tokenization", SENTENCE_MODE)}
                type="button"
              >
                {t("component.tokenHighlight.sentence")}
              </ModeButton>
              <ModeButton
                active={mode === WORD_MODE}
                onClick={() => handleItemChangeChange("tokenization", WORD_MODE)}
                type="button"
              >
                {t("component.tokenHighlight.word")}
              </ModeButton>
            </Container>
            {template.map((el, i) => (
              <span
                onClick={handleTemplateClick(i)}
                dangerouslySetInnerHTML={{ __html: el.value }}
                key={i}
                className={el.active ? "active-word token" : "token"}
              />
            ))}
          </Fragment>
        )}

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>

      <Options />
    </Fragment>
  );
};

TokenHighlightEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(TokenHighlightEdit);
