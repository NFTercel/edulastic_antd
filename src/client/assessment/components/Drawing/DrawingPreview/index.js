import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select } from "antd";

import { Paper, Stimulus, FlexContainer } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { dashBorderColorOpacity, dashBorderColor, secondaryTextColor, greenDark } from "@edulastic/colors";

import { PREVIEW } from "../../../constants/constantsForQuestions";

const { Option } = Select;

const DrawingPreview = ({ view, item, smallSize, saveAnswer, userAnswer, t }) => {
  const [history, setHistory] = useState([]);
  const [historyTab, setHistoryTab] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const { image, line_color } = item;

  const [currentColor, setCurrentColor] = useState(line_color[0]);

  const width = image ? image.width : 900;
  const height = image ? image.height : 470;
  const altText = image ? image.altText : "";
  const file = image ? image.source : "";

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      <Container style={{ maxWidth: "100%" }} width={`${+width}px`} justifyContent="space-between">
        {line_color.length > 1 && (
          <StyledSelect value={currentColor} onChange={setCurrentColor}>
            {line_color.map((color, i) => (
              <Option key={i} value={color}>
                <div className="rc-color-picker-wrap">
                  <span className="rc-color-picker-trigger" style={{ background: color }} />
                </div>
              </Option>
            ))}
          </StyledSelect>
        )}
      </Container>
    </Paper>
  );
};

DrawingPreview.propTypes = {
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userAnswer: PropTypes.any.isRequired
};

DrawingPreview.defaultProps = {
  smallSize: false
};

export default withNamespaces("assessment")(DrawingPreview);

const StyledSelect = styled(Select)`
  & > .ant-select-selection__rendered {
    display: flex !important;
    align-items: center !important;
    padding: 0px !important;
    line-height: 40px !important;
    height: 40px !important;
  }
  & > .ant-select-selection {
    background: transparent !important;
    border: none !important;
    &:focus {
      outline: none;
      box-shadow: none !important;
    }
  }
`;

const Container = styled(FlexContainer)`
  min-height: 67px;
  width: ${({ width }) => width || "100%"};
  padding: 14px 28px 14px 14px;
  background: ${dashBorderColorOpacity};
  margin-top: 20px;
  border-bottom: 1px solid ${dashBorderColor};
`;
const Button = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: transparent;
  color: ${secondaryTextColor};
  cursor: pointer;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  svg {
    fill: ${secondaryTextColor};
  }
  &:hover {
    color: ${greenDark};
    svg {
      fill: ${greenDark};
    }
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
