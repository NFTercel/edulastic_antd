import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

import { withNamespaces } from "@edulastic/localization";

import { Container } from "./styled/Container";

export default WrappedComponent => {
  const hocComponent = ({ points, onChangePoints, t, ...props }) => (
    <div>
      <Container>
        <Input
          type="number"
          data-cy="points"
          value={points}
          onChange={e => onChangePoints(+e.target.value)}
          style={{ width: 105 }}
          size="large"
        />
        <span style={{ textTransform: "uppercase", marginLeft: 25 }}>{t("component.correctanswers.points")}</span>
      </Container>
      <WrappedComponent {...props} />
    </div>
  );

  hocComponent.propTypes = {
    points: PropTypes.number.isRequired,
    onChangePoints: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  return withNamespaces("assessment")(hocComponent);
};
