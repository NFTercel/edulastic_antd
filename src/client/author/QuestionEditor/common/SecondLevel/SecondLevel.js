import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  IconEye,
  IconCheck,
  IconSource,
  IconSettings,
  IconEraseText
} from "@edulastic/icons";
import { blue, darkBlue, white } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { clearAnswersAction } from "../../../src/actions/answers";
import { Container, PreviewBar } from "./styled";
import { ButtonLink } from "../../../src/components/common";

class SecondLevel extends Component {
  state = {
    option: false
  };

  render() {
    const { option } = this.state;
    const {
      t,
      view,
      previewTab,
      onShowSource,
      onShowSettings,
      changePreviewTab,
      clearAnswers
    } = this.props;

    const colorOptionValue = option ? white : blue;

    return (
      <Container type={option}>
        {view === "edit" && (
          <PreviewBar
            style={{
              width: "100%",
              justifyContent: "flex-end"
            }}
          >
            <Button onClick={onShowSource}>
              <ButtonLink
                color="primary"
                icon={<IconSource color={colorOptionValue} />}
                style={{ color: colorOptionValue }}
              >
                {t("component.questioneditor.buttonbar.source")}
              </ButtonLink>
            </Button>
            <Button onClick={onShowSettings}>
              <ButtonLink
                color="primary"
                icon={<IconSettings color={colorOptionValue} />}
                style={{ color: colorOptionValue }}
              >
                {t("component.questioneditor.buttonbar.layout")}
              </ButtonLink>
            </Button>
          </PreviewBar>
        )}
        {view === "preview" && (
          <PreviewBar
            style={{
              width: "100%",
              justifyContent: "flex-end"
            }}
          >
            <Button onClick={() => changePreviewTab("check")}>
              <ButtonLink
                color="primary"
                icon={<IconCheck color={colorOptionValue} />}
                style={{ color: colorOptionValue }}
              >
                {t("component.questioneditor.buttonbar.checkanswer")}
              </ButtonLink>
            </Button>
            <Button onClick={() => changePreviewTab("show")}>
              <ButtonLink
                color="primary"
                style={{ color: colorOptionValue }}
                icon={(
                  <IconEye
                    color={colorOptionValue}
                    hoverColor={darkBlue}
                  />
                )}
              >
                {t("component.questioneditor.buttonbar.showanswers")}
              </ButtonLink>
            </Button>
            <Button onClick={() => clearAnswers()}>
              <ButtonLink
                color="primary"
                active={previewTab === "clear"}
                style={{ color: colorOptionValue }}
                icon={<IconEraseText color={colorOptionValue} />}
              >
                {t("component.questioneditor.buttonbar.clear")}
              </ButtonLink>
            </Button>
          </PreviewBar>
        )}
      </Container>
    );
  }
}

SecondLevel.propTypes = {
  changePreviewTab: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string.isRequired,
  onShowSource: PropTypes.func.isRequired,
  onShowSettings: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  clearAnswers: PropTypes.func.isRequired
};

const enhance = compose(
  withNamespaces("author"),
  connect(
    null,
    { clearAnswers: clearAnswersAction }
  )
);

export default enhance(SecondLevel);
