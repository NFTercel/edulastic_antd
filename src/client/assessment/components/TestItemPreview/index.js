import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { withWindowSizes } from "@edulastic/common";

import { themes } from "../../themes";
import TestItemCol from "./containers/TestItemCol";
import { Container } from "./styled/Container";

class TestItemPreview extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    verticalDivider: PropTypes.bool,
    scrolling: PropTypes.bool,
    preview: PropTypes.string.isRequired,
    windowWidth: PropTypes.number.isRequired,
    showFeedback: PropTypes.bool,
    style: PropTypes.object,
    questions: PropTypes.object.isRequired
  };

  static defaultProps = {
    showFeedback: false,
    verticalDivider: false,
    scrolling: false,
    style: { padding: 0, display: "flex" }
  };

  getStyle = first => {
    const { verticalDivider, scrolling } = this.props;

    const style = {};

    if (first && verticalDivider) {
      style.borderRightWidth = "3px";
      style.borderRightStyle = "solid";
    }

    if (scrolling) {
      style.height = "calc(100vh - 200px)";
      style.overflowY = "auto";
    }

    return style;
  };

  render() {
    const { cols, preview, style, windowWidth, showFeedback, questions } = this.props;
    let questionCount = 0;
    cols.forEach(({ widgets }) => {
      questionCount += widgets.length;
    });
    if (questionCount === 0) {
      return null;
    }

    return (
      <ThemeProvider theme={themes.default}>
        <Container width={windowWidth} style={style}>
          {cols &&
            cols.length &&
            cols.map((col, i) => (
              <TestItemCol
                key={i}
                col={col}
                view="preview"
                preview={preview}
                multiple={cols.length > 1}
                style={this.getStyle(i !== cols.length - 1)}
                windowWidth={windowWidth}
                showFeedback={showFeedback}
                questions={questions}
              />
            ))}
        </Container>
      </ThemeProvider>
    );
  }
}

const enhance = compose(withWindowSizes);

export default enhance(TestItemPreview);
