import React from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import produce from "immer";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";

import Extras from "../../../containers/Extras";
import {
  Layout,
  SpecialCharactersOption,
  BrowserSpellcheckOption,
  CharactersToDisplayOption,
  PlaceholderOption,
  FontSizeOption,
  InputTypeOption
} from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

const Options = ({ item, setQuestionData }) => {
  const _change = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
      })
    );
  };

  const _uiStyleChange = (prop, val) => {
    setQuestionData(
      produce(item, draft => {
        if (!draft.ui_style) {
          draft.ui_style = {};
        }

        draft.ui_style[prop] = val;
      })
    );
  };

  return (
    <WidgetOptions>
      <Layout>
        <Row gutter={36}>
          <Col md={12}>
            <SpecialCharactersOption
              onChange={checked => {
                if (checked) {
                  _change("character_map", []);
                } else {
                  _change("character_map", undefined);
                }
              }}
              checked={!!item.character_map}
            />
          </Col>
          <Col md={12}>
            <BrowserSpellcheckOption onChange={checked => _change("spellcheck", checked)} checked={!!item.spellcheck} />
          </Col>
        </Row>

        {Array.isArray(item.character_map) && (
          <Row gutter={36}>
            <Col md={12}>
              <CharactersToDisplayOption
                onChange={val => _change("character_map", val.split(""))}
                value={item.character_map.join("")}
              />
            </Col>
          </Row>
        )}

        <Row gutter={36}>
          <Col md={12}>
            <InputTypeOption
              onChange={val => _uiStyleChange("input_type", val)}
              value={get(item, "ui_style.input_type", "text")}
            />
          </Col>
          <Col md={12}>
            <PlaceholderOption onChange={val => _change("placeholder", val)} value={item.placeholder} />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <FontSizeOption
              onChange={val => _uiStyleChange("fontsize", val)}
              value={get(item, "ui_style.fontsize", "normal")}
            />
          </Col>
        </Row>
      </Layout>
      <Block>
        <Extras>
          <Extras.Distractors />
          <Extras.Hints />
        </Extras>
      </Block>
    </WidgetOptions>
  );
};

Options.propTypes = {
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(
  connect(
    state => ({
      item: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(Options);
