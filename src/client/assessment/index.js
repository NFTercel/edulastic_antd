import React, { useEffect } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
// themes
import ThemeContainer from "./themes/index";
import { loadTestAction } from "./actions/test";

const AssessmentPlayer = ({ defaultAP, loadTest, match }) => {
  useEffect(() => {
    let { id: testId, utaId: testActivityId } = match.params;
    loadTest({ testId, testActivityId });
  }, []);

  return (
    <Switch>
      <Route
        path={`${match.url}/qid/:qid`}
        render={() => {
          return <ThemeContainer defaultAP={defaultAP} url={match.url} />;
        }}
      />
    </Switch>
  );
};

AssessmentPlayer.propTypes = {
  defaultAP: PropTypes.any.isRequired,
  loadTest: PropTypes.func.isRequired,
  testId: PropTypes.string
};

AssessmentPlayer.defaultProps = {};

// export component
const enhance = compose(
  withRouter,
  connect(
    null,
    {
      loadTest: loadTestAction
    }
  )
);
export default enhance(AssessmentPlayer);
