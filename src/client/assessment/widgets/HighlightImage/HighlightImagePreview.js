import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { get } from "lodash";

import { Paper, Stimulus, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { IconUndo, IconRedo, IconEraseText } from "@edulastic/icons";

import { PREVIEW } from "../../constants/constantsForQuestions";

import { Container } from "./styled/Container";
import { StyledSelect } from "./styled/StyledSelect";
import { Button } from "./styled/Button";
import { Text } from "./styled/Text";
import { CanvasContainer } from "./styled/CanvasContainer";
import { AdaptiveButtonList } from "./styled/AdaptiveButtonList";
import { getFontSize } from "../../utils/helpers";

const { Option } = Select;

const HighlightImagePreview = ({ view, item, smallSize, saveAnswer, userAnswer, t }) => {
  const canvas = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyTab, setHistoryTab] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const { image, line_color } = item;

  const [currentColor, setCurrentColor] = useState(line_color[0]);

  const width = image ? image.width : "auto";
  const height = image ? image.height : 470;
  const altText = image ? image.altText : "";
  const file = image ? image.source : "";

  const drawImage = context => {
    if (!Array.isArray(userAnswer)) {
      const img = new Image();
      img.alt = altText;
      img.onload = () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(img, 0, 0, width, height);
        if (canvas.current) {
          setHistory([canvas.current.toDataURL()]);
        }
        setHistoryTab(0);
        if (canvas.current) {
          saveAnswer(canvas.current.toDataURL());
        }
        setCtx(context);
      };
      img.src = userAnswer;
    } else {
      context.clearRect(0, 0, width, height);
      if (canvas.current) {
        setHistory([canvas.current.toDataURL()]);
      }
      setHistoryTab(0);
      if (canvas.current) {
        saveAnswer(canvas.current.toDataURL());
      }

      setCtx(context);
    }
  };

  useEffect(() => {
    if (canvas) {
      canvas.current.width = width;
      canvas.current.height = height;
      const context = canvas.current.getContext("2d");
      context.lineWidth = item.line_width || 5;
      context.lineJoin = "round";
      context.lineCap = "round";

      drawImage(context);
    }
  }, [file]);

  const onCanvasMouseDown = e => {
    const bounded = canvas.current.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - bounded.left, e.clientY - bounded.top);
    setCtx(ctx);
    setMouseDown(true);
  };

  const onCanvasMouseUp = e => {
    if (mouseDown) {
      const bounded = canvas.current.getBoundingClientRect();
      ctx.lineTo(e.clientX - bounded.left, e.clientY - bounded.top);
      ctx.strokeStyle = currentColor;
      ctx.stroke();
      ctx.closePath();
      const newHistory = [...history.slice(0, historyTab + 1), canvas.current.toDataURL()];
      setHistory(newHistory);
      setHistoryTab(newHistory.length - 1);
      setCtx(ctx);
      setMouseDown(false);
      saveAnswer(canvas.current.toDataURL());
    }
  };

  const onCanvasMouseMove = e => {
    if (mouseDown) {
      const bounded = canvas.current.getBoundingClientRect();

      ctx.lineTo(e.clientX - bounded.left, e.clientY - bounded.top);
      ctx.strokeStyle = currentColor;
      ctx.stroke();
      setCtx(ctx);
    }
  };

  const onClearClick = () => {
    ctx.clearRect(0, 0, width, height);
    setCtx(ctx);
    const newHistory = [...history.slice(0, historyTab + 1), canvas.current.toDataURL()];
    setHistory(newHistory);
    setHistoryTab(newHistory.length - 1);
  };

  const onUndoClick = () => {
    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      setHistoryTab(historyTab - 1);
      setCtx(ctx);
    };
    img.src = history[historyTab - 1];
    saveAnswer(history[historyTab - 1]);
  };

  const onRedoClick = () => {
    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      setHistoryTab(historyTab + 1);
      setCtx(ctx);
    };
    img.src = history[historyTab + 1];
    saveAnswer(history[historyTab + 1]);
  };

  const fontSize = getFontSize(get(item, "ui_style.fontsize"));

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
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
        <AdaptiveButtonList>
          <Button disabled={historyTab === 0} onClick={onUndoClick}>
            <IconUndo style={{ marginRight: 25 }} width={18} height={18} />
            <Text fontSize={fontSize}>{t("component.highlightImage.undo")}</Text>
          </Button>
          <Button disabled={historyTab === history.length - 1 || history.length === 0} onClick={onRedoClick}>
            <IconRedo style={{ marginRight: 25 }} width={18} height={18} />
            <Text fontSize={fontSize}>{t("component.highlightImage.redo")}</Text>
          </Button>
          <Button onClick={onClearClick}>
            <IconEraseText style={{ marginRight: 25 }} width={18} height={18} />
            <Text fontSize={fontSize}>{t("component.highlightImage.clear")}</Text>
          </Button>
        </AdaptiveButtonList>
      </Container>
      <CanvasContainer>
        <img src={file} alt={altText} width={width} height={height} />
        <canvas
          onMouseDown={onCanvasMouseDown}
          onMouseUp={onCanvasMouseUp}
          onMouseMove={onCanvasMouseMove}
          ref={canvas}
        />
      </CanvasContainer>
    </Paper>
  );
};

HighlightImagePreview.propTypes = {
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userAnswer: PropTypes.any.isRequired
};

HighlightImagePreview.defaultProps = {
  smallSize: false
};

export default withNamespaces("assessment")(HighlightImagePreview);
