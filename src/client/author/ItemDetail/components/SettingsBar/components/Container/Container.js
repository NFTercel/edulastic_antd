import React, { Component } from "react";
import { white } from "@edulastic/colors";
import { Button, Checkbox } from "@edulastic/common";
import { IconSettings } from "@edulastic/icons";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import SettingsBarItem from "../SettingsBarItem/SettingsBarItem";
import SettingsBarTags from "../SettingsBarTags/SettingsBarTags";
import SettingsBarUseTabs from "../SettingsBarUseTabs/SettingsBarUseTabs";
import { Content, Items, Checkboxes, Heading, SettingsButtonWrapper } from "./styled";

const layouts = [
  {
    value: "100-100",
    text: "Single column"
  },
  {
    value: "30-70",
    text: "30 | 70"
  },
  {
    value: "70-30",
    text: "70 | 30"
  },
  {
    value: "50-50",
    text: "50 | 50"
  },
  {
    value: "40-60",
    text: "40 | 60"
  },
  {
    value: "60-40",
    text: "60 | 40"
  }
];

class Container extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    useTabs: PropTypes.func.isRequired,
    useTabsLeft: PropTypes.bool.isRequired,
    useTabsRight: PropTypes.bool.isRequired,
    verticalDivider: PropTypes.bool.isRequired,
    scrolling: PropTypes.bool.isRequired,
    onVerticalDividerChange: PropTypes.func.isRequired,
    onScrollingChange: PropTypes.func.isRequired
  };

  handleCheckboxChange = name => () => {
    this.setState(state => ({
      [name]: !state[name]
    }));
  };

  handleRemoveTag = () => {};

  handleChangeLeftTab = () => {
    const { useTabs, useTabsLeft } = this.props;
    useTabs({ rowIndex: 0, isUseTabs: !useTabsLeft });
  };

  handleChangeRightTab = () => {
    const { useTabs, useTabsRight } = this.props;
    useTabs({ rowIndex: 1, isUseTabs: !useTabsRight });
  };

  onApplyLayoutClick = object => () => {
    const { onApply } = this.props;
    onApply(object);
  };

  render() {
    const {
      onCancel,
      type,
      t,
      useTabsLeft,
      useTabsRight,
      verticalDivider,
      scrolling,
      onVerticalDividerChange,
      onScrollingChange
    } = this.props;

    return (
      <Content>
        <SettingsButtonWrapper justifyContent="flex-end">
          <Button color="primary" onClick={onCancel} style={{ minWidth: 85 }}>
            <IconSettings color={white} />
          </Button>
        </SettingsButtonWrapper>
        <Heading>{t("author:component.settingsBar.layout")}</Heading>
        <Items>
          {layouts.map(item => (
            <SettingsBarItem
              onSelect={this.onApplyLayoutClick({ type: item.value })}
              selected={type === item.value}
              key={item.value}
              item={item}
            />
          ))}
        </Items>
        <SettingsBarUseTabs
          onChangeLeft={this.handleChangeLeftTab}
          onChangeRight={this.handleChangeRightTab}
          checkedLeft={useTabsLeft}
          checkedRight={useTabsRight}
        />
        <Checkboxes>
          <Checkbox
            style={{ marginBottom: 20 }}
            label={t("author:component.settingsBar.showVerticalDivider")}
            checked={verticalDivider}
            onChange={onVerticalDividerChange}
          />
          <Checkbox
            label={t("author:component.settingsBar.enableScrolling")}
            checked={scrolling}
            onChange={onScrollingChange}
          />
        </Checkboxes>
        <Heading>{t("author:component.settingsBar.tags")}</Heading>
        <SettingsBarTags tags={["equations", "algebra"]} onRemove={this.handleRemoveTag} />
      </Content>
    );
  }
}

export default withNamespaces(["default", "author"])(Container);
