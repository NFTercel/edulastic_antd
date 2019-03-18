import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Paper } from "@edulastic/common";
import i18n from "@edulastic/localization";
import { evaluationType } from "@edulastic/constants";

import { Header } from "../../styled/WidgetOptions/Header";
import { Toggler } from "../../styled/WidgetOptions/Toggler";

import Scoring from "./components/Scoring";
import { Title } from "./styled/Title";

const types = [evaluationType.exactMatch, evaluationType.partialMatch];

class WidgetOptions extends Component {
  state = {
    show: false
  };

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    outerStyle: PropTypes.object,
    scoringTypes: PropTypes.array,
    showScoring: PropTypes.bool
  };

  static defaultProps = {
    title: i18n.t("assessment:common.options.title"),
    outerStyle: {},
    scoringTypes: types,
    showScoring: true
  };

  handleToggle = () => {
    this.setState(({ show }) => ({
      show: !show
    }));
  };

  render() {
    const { title, children, outerStyle, scoringTypes, showScoring } = this.props;
    const { show } = this.state;

    return (
      <Paper style={outerStyle}>
        <Header data-cy="toggleAdvancedOptionsButton" onClick={this.handleToggle}>
          <Title>{title}</Title>
          <Toggler isOpen={show} />
        </Header>
        {show && (
          <Fragment>
            {showScoring && <Scoring scoringTypes={scoringTypes} />}
            <div>{children}</div>
          </Fragment>
        )}
      </Paper>
    );
  }
}

export default WidgetOptions;
