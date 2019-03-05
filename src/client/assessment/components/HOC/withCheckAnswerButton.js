import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";

import { EduButton } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { checkAnswerAction } from "../../../author/src/actions/testItem";
import { changePreviewAction } from "../../../author/src/actions/view";
import { CHECK } from "../../constants/constantsForQuestions";

export const withCheckAnswerButton = WrappedComponent => {
  const hocComponent = ({ item, userAnswer, changePreviewTab, changeMode, t, ...restProps }) => {
    const initial = item ? item.feedback_attempts || null : null;
    const [attempts, setAttempts] = useState(initial);

    useEffect(() => {
      if (attempts !== null && attempts !== initial) {
        changePreviewTab();
        changeMode(CHECK);
      }
    }, [attempts]);

    const checkAnswers = () => {
      if (Array.isArray(userAnswer) && userAnswer.length > 0) {
        setAttempts(attempts - 1);
      }
    };

    return (
      <Fragment>
        <WrappedComponent item={item} userAnswer={userAnswer} {...restProps} />
        {item && item.instant_feedback && (
          <EduButton onClick={checkAnswers} disabled={attempts === 0} type="primary">
            {t("component.options.check_answer")}
          </EduButton>
        )}
      </Fragment>
    );
  };

  return withNamespaces("assessment")(
    connect(
      () => ({}),
      { changePreviewTab: checkAnswerAction, changeMode: changePreviewAction }
    )(hocComponent)
  );
};
