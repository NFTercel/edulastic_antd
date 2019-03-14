import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { cloneDeep, get } from "lodash";
import { Input, Checkbox, Select } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { rounding, evaluationType } from "@edulastic/constants";
import { getQuestionDataSelector, setQuestionDataAction } from "../../../../author/QuestionEditor/ducks";

import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { Label } from "../../../styled/WidgetOptions/Label";
import { SectionHeading } from "../../../styled/WidgetOptions/SectionHeading";

import { FormGroup } from "../styled/FormGroup";

const roundingTypes = [rounding.roundDown, rounding.none];

const Scoring = ({ setQuestionData, t, scoringTypes, isSection, questionData, showSelect }) => {
  const handleChangeValidation = (param, value) => {
    const newData = cloneDeep(questionData);

    if (!newData.validation) {
      newData.validation = {};
    }

    newData.validation[param] = value;
    setQuestionData(newData);
  };

  const handleChangeData = (param, value) => {
    const newData = cloneDeep(questionData);
    newData.validation[param] = value;

    setQuestionData(newData);
  };

  const automarkable = get(questionData, "validation.automarkable", false);
  const maxScore = get(questionData, "validation.max_score", 0);

  return (
    <Block isSection={isSection}>
      {isSection && <SectionHeading>{t("component.options.scoring")}</SectionHeading>}
      {!isSection && <Heading>{t("component.options.scoring")}</Heading>}

      {automarkable && (
        <Row gutter={36}>
          <Col md={12}>
            <Checkbox
              data-cy="unscoredChk"
              checked={questionData.validation.unscored}
              onChange={e => handleChangeValidation("unscored", e.target.checked)}
              size="large"
            >
              {t("component.options.unscored")}
            </Checkbox>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                type="number"
                data-cy="penalty"
                value={questionData.validation.penalty}
                onChange={e => handleChangeValidation("penalty", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.penalty")}</Label>
            </FormGroup>
          </Col>
        </Row>
      )}
      {automarkable && (
        <Row gutter={36}>
          <Col md={12}>
            <Checkbox
              data-cy="checkAnswerButton"
              checked={questionData.validation.checkAnswerButton}
              onChange={e => handleChangeData("checkAnswerButton", e.target.checked)}
              size="large"
            >
              {t("component.options.checkAnswerButton")}
            </Checkbox>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                data-cy="checkAttempts"
                type="number"
                value={questionData.validation.checkAttempts}
                onChange={e => handleChangeData("checkAttempts", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.attempts")}</Label>
            </FormGroup>
          </Col>
        </Row>
      )}

      <Row gutter={36}>
        <Col md={12}>
          <Checkbox
            data-cy="autoscoreChk"
            checked={automarkable}
            onChange={e => handleChangeValidation("automarkable", e.target.checked)}
            size="large"
          >
            {t("component.options.automarkable")}
          </Checkbox>
        </Col>

        {automarkable && !showSelect && (
          <Col md={12}>
            <FormGroup>
              <Input
                data-cy="minscore"
                type="number"
                disabled={questionData.validation.unscored}
                value={questionData.validation.min_score_if_attempted}
                onChange={e => handleChangeValidation("min_score_if_attempted", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.minScore")}</Label>
            </FormGroup>
          </Col>
        )}
      </Row>

      {automarkable && showSelect && (
        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.scoringType")}</Label>
            <Select
              size="large"
              data-cy="scoringType"
              value={questionData.validation.scoring_type}
              onChange={value => handleChangeValidation("scoring_type", value)}
            >
              {scoringTypes.map(({ value: val, label }) => (
                <Select.Option data-cy={val} key={val} value={val}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col md={12}>
            <FormGroup>
              <Input
                data-cy="minscore"
                type="number"
                disabled={questionData.validation.unscored}
                value={questionData.validation.min_score_if_attempted}
                onChange={e => handleChangeValidation("min_score_if_attempted", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.minScore")}</Label>
            </FormGroup>
          </Col>

          {questionData.validation.scoring_type === evaluationType.PARTIAL_MATCH && (
            <Col md={12}>
              <Label>{t("component.options.rounding")}</Label>
              <Select
                size="large"
                value={questionData.validation.rounding}
                onChange={value => handleChangeValidation("rounding", value)}
              >
                {roundingTypes.map(({ value: val, label }) => (
                  <Select.Option key={val} value={val}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>
      )}

      {!automarkable && (
        <Row gutter={36}>
          <Col md={12}>
            <FormGroup>
              <Input
                data-cy="maxscore"
                type="number"
                value={maxScore}
                onChange={e => handleChangeValidation("max_score", +e.target.value)}
                size="large"
                style={{ width: "20%", marginRight: 30 }}
              />
              <Label>{t("component.options.maxScore")}</Label>
            </FormGroup>
          </Col>
        </Row>
      )}
    </Block>
  );
};

Scoring.propTypes = {
  setQuestionData: PropTypes.func.isRequired,
  scoringTypes: PropTypes.array.isRequired,
  questionData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showSelect: PropTypes.bool,
  isSection: PropTypes.bool
};

Scoring.defaultProps = {
  isSection: false,
  showSelect: true
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      questionData: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(Scoring);
