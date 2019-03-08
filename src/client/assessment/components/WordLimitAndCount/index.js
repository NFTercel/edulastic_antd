import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Input, Select, Col } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { FlexContainer } from "@edulastic/common";

import { Subtitle } from "../../styled/Subtitle";

import { ON_LIMIT, ALWAYS, OFF } from "../../constants/constantsForQuestions";
import { AdaptiveRow } from "./styled/AdaptiveRow";

import { LabelText } from "./styled/LabelText";

const { Option } = Select;

const WordLimitAndCount = ({ onChange, selectValue, inputValue, t, withOutTopMargin }) => {
  const options = [
    { value: ON_LIMIT, label: t('component.essayText.onLimit') },
    { value: ALWAYS, label: t('component.essayText.alwaysVisible') },
    { value: OFF, label: t('component.essayText.off') }
  ];

  return (
    <Fragment>
      <Subtitle padding={withOutTopMargin ? '0px 0 16px 0' : ''}>
        {t('component.essayText.scoring')}
      </Subtitle>
      <AdaptiveRow gutter={70}>
        <Col span={12}>
          <LabelText>{t('component.essayText.wordsLimitTitle')}</LabelText>
          <Select
            style={{ width: '100%', marginTop: 10 }}
            size="large"
            value={selectValue}
            onChange={val => onChange('show_word_limit', val)}
          >
            {options.map((item, i) => {
              const { label, value } = item;
              return (
                <Option key={i} value={value}>
                  {label}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={12}>
          <FlexContainer style={{ marginTop: 31 }}>
            <Input
              size="large"
              style={{ width: 120 }}
              value={inputValue}
              onChange={e => onChange('max_word', e.target.value)}
            />
            <LabelText>{t('component.essayText.wordsLimitTitle')}</LabelText>
          </FlexContainer>
        </Col>
      </AdaptiveRow>
    </Fragment>);
};

WordLimitAndCount.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  inputValue: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  withOutTopMargin: PropTypes.bool
};

WordLimitAndCount.defaultProps = {
  withOutTopMargin: false
};

export default withNamespaces('assessment')(WordLimitAndCount);
