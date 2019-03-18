import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import { withNamespaces } from "@edulastic/localization";
import { Button, Tabs, Tab, FlexContainer } from "@edulastic/common";

import { Subtitle } from "../../styled/Subtitle";

import { IconClose } from "./styled/IconClose";
import { IconPlus } from "./styled/IconPlus";

const CorrectAnswers = ({ t, onTabChange, children, correctTab, onAdd, validation, options, onCloseTab }) => {
  const renderLabel = index => (
    <FlexContainer>
      <span>
        {t("component.correctanswers.alternate")} {index + 1}
      </span>
      <IconClose
        onClick={e => {
          e.stopPropagation();
          onCloseTab(index);
        }}
        data-cy="del-alter"
      />
    </FlexContainer>
  );

  const renderAltResponses = () => {
    if (validation && validation.alt_responses && validation.alt_responses.length) {
      return validation.alt_responses.map((res, i) => <Tab key={i} label={renderLabel(i)} />);
    }

    return null;
  };

  const renderPlusButton = () => (
    <Button
      style={{
        minWidth: 70,
        minHeight: 25
      }}
      icon={<IconPlus data-cy="alternate" />}
      onClick={() => {
        onTabChange();
        onAdd();
      }}
      color="primary"
      variant="extendedFab"
    />
  );

  return (
    <div>
      <Subtitle>{t("component.correctanswers.setcorrectanswers")}</Subtitle>

      <div>
        <Tabs value={correctTab} onChange={onTabChange} extra={renderPlusButton()}>
          <Tab data_cy="correct" label={t("component.correctanswers.correct")} />
          {renderAltResponses()}
        </Tabs>
        {children}
      </div>
      {options}
    </div>
  );
};

CorrectAnswers.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  onCloseTab: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  children: PropTypes.any,
  correctTab: PropTypes.number.isRequired,
  options: PropTypes.any
};

CorrectAnswers.defaultProps = {
  options: null,
  children: undefined
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(CorrectAnswers);
