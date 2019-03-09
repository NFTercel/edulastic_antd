import React from "react";
import { Tooltip } from "antd";

export const CustomTooltip = ({ className, correct, correctThreshold, ...attrs }) => {
  return (
    <Tooltip {...attrs} overlayClassName={`response-frequency-table-tooltip ${className}`}>
      {correct < correctThreshold ? (
        <div className="response-frequency-table-correct-td" style={{ backgroundColor: "#ff9896" }}>
          {correct}%
        </div>
      ) : (
        <div className="response-frequency-table-correct-td" style={{ backgroundColor: "#FFFFFF" }}>
          {correct}%
        </div>
      )}
    </Tooltip>
  );
};
