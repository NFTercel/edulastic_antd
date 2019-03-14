import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cloneDeep, isEqual } from "lodash";

import { FlexContainer } from "@edulastic/common";
import { IconEraseText, IconRedo, IconUndo, IconDraw, IconTrash } from "@edulastic/icons";
import { withNamespaces } from "@edulastic/localization";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { DRAW_MODE, DELETE_MODE } from "../../constants/constantsForQuestions";

import SvgContainer from "./SvgContainer";
import SvgDeleteContainer from "./SvgDeleteContainer";
import { Container } from "./styled/Container";
import { Button } from "./styled/Button";
import { SideBar } from "./styled/SideBar";
import { ButtonWithShadow } from "./styled/ButtonWithShadow";
import { AreaText } from "./styled/AreaText";

const AreasContainer = ({ itemData, areas, width, imageSrc, height, t, setQuestionData }) => {
  const [history, setHistory] = useState([{ areas: [], points: [] }]);

  const [historyTab, setHistoryTab] = useState(0);

  const [mode, setMode] = useState(DRAW_MODE);

  useEffect(() => {
    if (history[historyTab] && !isEqual(history[historyTab].areas, areas, areas)) {
      const newHistory = cloneDeep(history);

      if (historyTab !== history.length - 1) {
        newHistory.splice(historyTab + 1);
      }

      newHistory.push({
        areas,
        points: []
      });

      setHistory(newHistory);
      setHistoryTab(newHistory.length - 1);
    }
  }, [areas]);

  const handleHistoryChange = (newAreas, points) => {
    const newHistory = cloneDeep(history);

    newHistory.splice(historyTab + 1);

    newHistory.push({ areas: newAreas, points: cloneDeep(points) });

    setHistory(newHistory);

    setHistoryTab(newHistory.length - 1);

    setQuestionData({ ...itemData, areas: newAreas });
  };

  const handleUndoClick = () => {
    setHistoryTab(historyTab - 1);
    setQuestionData({ ...itemData, areas: history[historyTab - 1].areas });
  };

  const handleRedoClick = () => {
    setHistoryTab(historyTab + 1);
    setQuestionData({
      ...itemData,
      areas: history[historyTab + 1] ? history[historyTab + 1].areas : []
    });
  };

  const handleClearClick = () => {
    setHistoryTab(0);

    setHistory([]);

    setQuestionData({ ...itemData, areas: [] });
  };

  const handleModeChange = newMode => () => {
    setMode(newMode);
  };

  return (
    <FlexContainer>
      <div style={{ width: width + 117 }}>
        <Container justifyContent="flex-end" childMarginRight={45}>
          <Button disabled={historyTab === 0} onClick={handleUndoClick}>
            <IconUndo data-cy="area-undo" />
            <AreaText>{t("component.hotspot.undo")}</AreaText>
          </Button>
          <Button disabled={history.length === 0 || historyTab === history.length - 1} onClick={handleRedoClick}>
            <IconRedo data-cy="area-redo" />
            <AreaText>{t("component.hotspot.redo")}</AreaText>
          </Button>
          <Button onClick={handleClearClick}>
            <IconEraseText data-cy="area-clear" />
            <AreaText>{t("component.hotspot.clear")}</AreaText>
          </Button>
        </Container>
        <FlexContainer childMarginRight={0} alignItems="stretch">
          <SideBar>
            <ButtonWithShadow
              data-cy="area-draw-mode"
              onClick={handleModeChange(DRAW_MODE)}
              active={mode === DRAW_MODE}
            >
              <IconDraw />
              <AreaText>{t("component.hotspot.draw")}</AreaText>
            </ButtonWithShadow>
            <ButtonWithShadow
              data-cy="area-delete-mode"
              onClick={handleModeChange(DELETE_MODE)}
              active={mode === DELETE_MODE}
            >
              <IconTrash />
              <AreaText>{t("component.hotspot.delete")}</AreaText>
            </ButtonWithShadow>
          </SideBar>
          {imageSrc &&
            (mode === DRAW_MODE ? (
              <SvgContainer
                changeHistory={handleHistoryChange}
                areas={areas}
                history={history[historyTab]}
                width={width}
                height={height}
                itemData={itemData}
                imageSrc={imageSrc}
              />
            ) : (
              <SvgDeleteContainer
                areas={areas}
                history={history[historyTab]}
                width={width}
                height={height}
                itemData={itemData}
                imageSrc={imageSrc}
              />
            ))}
        </FlexContainer>
      </div>
    </FlexContainer>
  );
};

AreasContainer.propTypes = {
  t: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  areas: PropTypes.array.isRequired,
  itemData: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired
};

export default connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(withNamespaces("assessment")(AreasContainer));
