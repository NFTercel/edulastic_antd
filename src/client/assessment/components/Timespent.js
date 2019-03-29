import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import clockIcon from "../assets/clock-circular-outline.svg";

const Timespent = ({ timespent, view }) => {
  const showTimespent = view === "preview";
  const time = timespent || "-";

  return (
    <Fragment>
      {showTimespent && (
        <React.Fragment>
          <StyledDivSec>
            <img alt="icon" src={clockIcon} />
            <TextPara>{time}</TextPara>
          </StyledDivSec>
          <StyledDived />
        </React.Fragment>
      )}
    </Fragment>
  );
};

Timespent.propTypes = {
  timespent: PropTypes.any,
  view: PropTypes.string.isRequired
};

Timespent.defaultProps = {
  timespent: ""
};

export default Timespent;

const StyledDivSec = styled.div`
  height: 45px;
  display: flex;
  align-items: "center";
`;

const StyledDived = styled.div`
  height: 1px;
  border-bottom: 1.4px solid #e9eef3;
  margin: 8px -25px 15px;
`;

const TextPara = styled.p`
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  color: #7c848e;
  font-weight: 600;
  line-height: 18px;
`;
