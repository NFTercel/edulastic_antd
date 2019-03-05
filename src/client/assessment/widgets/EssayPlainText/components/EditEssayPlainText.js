import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { Checkbox, Col, Input, Row } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { Paper, FlexContainer } from "@edulastic/common";

import { AdaptiveCheckbox } from "../styled/AdaptiveCheckbox";
import WidgetOptions from "../../../containers/WidgetOptions";
import { Label } from "../../../styled/WidgetOptions/Label";
import { FormGroup } from "../../../containers/WidgetOptions/styled/FormGroup";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import QuestionTextArea from "../../../components/QuestionTextArea";
import WordLimitAndCount from "../../../components/WordLimitAndCount";
import { Subtitle } from "../../../styled/Subtitle";
import Extras from "../../../containers/Extras";

const EditEssayPlainText = ({ item, setQuestionData, t }) => {
  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleValidationChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem.validation[prop] = uiStyle;
    setQuestionData(newItem);
  };

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.essayText.composequestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.essayText.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />
        <Subtitle>{t("component.essayText.plain.formattingOptions")}</Subtitle>
        <FlexContainer childMarginRight={100}>
          <AdaptiveCheckbox
            defaultChecked={item.show_copy}
            onChange={e => handleItemChangeChange("show_copy", e.target.checked)}
          >
            {t("component.essayText.copy")}
          </AdaptiveCheckbox>
          <AdaptiveCheckbox
            defaultChecked={item.show_cut}
            onChange={e => handleItemChangeChange("show_cut", e.target.checked)}
          >
            {t("component.essayText.cut")}
          </AdaptiveCheckbox>
          <AdaptiveCheckbox
            defaultChecked={item.show_paste}
            onChange={e => handleItemChangeChange("show_paste", e.target.checked)}
          >
            {t("component.essayText.paste")}
          </AdaptiveCheckbox>
        </FlexContainer>

        <WordLimitAndCount
          onChange={handleItemChangeChange}
          selectValue={item.show_word_limit}
          inputValue={item.max_word}
        />

        <Checkbox
          style={{ marginTop: 32 }}
          defaultChecked={item.show_word_count}
          onChange={e => handleItemChangeChange("show_word_count", e.target.checked)}
        >
          {t("component.essayText.showWordCheckbox")}
        </Checkbox>
      </Paper>
      <WidgetOptions showScoring={false} outerStyle={{ marginTop: 40 }} title={t("common.options.title")}>
        <Heading>{t("component.options.scoring")}</Heading>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Input
                type="number"
                data-cy="max_score"
                value={item && item.validation && item.validation.max_score}
                onChange={e => handleValidationChange("max_score", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.maxScore")}</Label>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                data-cy="minscore"
                type="number"
                value={item && item.validation && item.validation.min_score_if_attempted}
                onChange={e => handleValidationChange("min_score_if_attempted", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.minScore")}</Label>
            </FormGroup>
          </Col>
        </Row>
        <Checkbox
          style={{ marginTop: 32 }}
          defaultChecked={item && item.validation && item.validation.submit_over_limit}
          onChange={e => handleValidationChange("submit_over_limit", e.target.checked)}
        >
          {t("component.essayText.submitOverLimit")}
        </Checkbox>
        <Extras>
          <Extras.Distractors />
          <Extras.Hints />
        </Extras>
      </WidgetOptions>
    </Fragment>
  );
};

EditEssayPlainText.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(EditEssayPlainText);
