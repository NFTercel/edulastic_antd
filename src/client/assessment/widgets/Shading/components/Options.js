import React, { useContext } from "react";
import { get, cloneDeep } from "lodash";

import WidgetOptions from "../../../containers/WidgetOptions";
import Extras from "../../../containers/Extras";
import {
  Layout,
  FontSizeOption,
  HoverStateCheckbox,
  BorderTypeOption,
  MaxSelectionOption
} from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { QuestionContext } from "../../../components/QuestionWrapper";
import { Label } from "../../../styled/WidgetOptions/Label";
import ShadesView from "./ShadesView";

const Options = () => {
  const { item, t, changeItem, changeUIStyle, setQuestionData } = useContext(QuestionContext);
  const { canvas } = item;

  const _cellClick = (rowNumber, colNumber) => () => {
    const newItem = cloneDeep(item);

    if (!Array.isArray(newItem.canvas.hidden)) {
      newItem.canvas.hidden = [];
    }

    const indexOfSameShade = newItem.canvas.hidden.findIndex(shade => shade[0] === rowNumber && shade[1] === colNumber);

    if (indexOfSameShade === -1) {
      newItem.canvas.hidden.push([rowNumber, colNumber]);
    } else {
      newItem.canvas.hidden.splice(indexOfSameShade, 1);
    }

    setQuestionData(newItem);
  };

  return (
    <WidgetOptions title={t("common.options.title")}>
      <Layout>
        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.hideCells")}</Label>
            <ShadesView
              colCount={canvas.column_count || 1}
              rowCount={canvas.row_count || 1}
              cellHeight={canvas.cell_height || 1}
              cellWidth={canvas.cell_width || 1}
              onCellClick={_cellClick}
              border={item.border}
              hover={item.hover}
              shaded={canvas.hidden || []}
            />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <BorderTypeOption onChange={val => changeItem("border", val)} value={item.border} />
          </Col>
          <Col md={12}>
            <MaxSelectionOption onChange={val => changeItem("max_selection", +val)} value={item.max_selection} />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <FontSizeOption
              onChange={val => changeUIStyle("fontsize", val)}
              value={get(item, "ui_style.fontsize", "normal")}
            />
          </Col>
          <Col md={12}>
            <HoverStateCheckbox checked={!!item.hover} onChange={val => changeItem("hover", val)} />
          </Col>
        </Row>
      </Layout>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </WidgetOptions>
  );
};

export default Options;
