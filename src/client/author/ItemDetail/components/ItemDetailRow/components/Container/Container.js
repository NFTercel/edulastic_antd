import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Icon } from "antd";

import { white } from "@edulastic/colors";
import { Tabs } from "@edulastic/common";
import ItemDetailWidget from "../ItemDetailWidget/ItemDetailWidget";
import ItemDetailDropTarget from "../ItemDetailDropTarget/ItemDetailDropTarget";
import { getItemDetailDraggingSelector } from "../../../../ducks";
import { MAX_MOBILE_WIDTH } from "../../../../../src/constants/others";
import AddNew from "../AddNew/AddNew";
import { Content, AddButtonContainer, MobileSide, TabContainer } from "./styled";

class Container extends Component {
  state = {
    tabIndex: 0
  };

  static propTypes = {
    row: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    dragging: PropTypes.bool.isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
    onEditWidget: PropTypes.func.isRequired,
    onEditTabTitle: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired
  };

  handleTabChange = tabIndex => () => {
    this.setState({
      tabIndex
    });
  };

  onEditWidgetClick = (widget, rowIndex) => () => {
    const { onEditWidget } = this.props;
    onEditWidget(widget, rowIndex);
  };

  onDeleteWidgetClick = widgetIndex => () => {
    const { onDeleteWidget } = this.props;
    onDeleteWidget(widgetIndex);
  };

  onAddBtnClick = object => () => {
    const { onAdd } = this.props;
    onAdd(object);
  };

  renderTabContent = ({ widgetIndex, widget, rowIndex }) => (
    <ItemDetailWidget
      widget={widget}
      onEdit={this.onEditWidgetClick(widget, rowIndex)}
      onDelete={this.onDeleteWidgetClick(widgetIndex)}
      widgetIndex={widgetIndex}
      rowIndex={rowIndex}
    />
  );

  renderSide = () => {
    const { row, windowWidth } = this.props;
    const { tabIndex } = this.state;
    if (row.tabs && windowWidth < MAX_MOBILE_WIDTH) {
      const sideType = tabIndex === 0 ? "left" : "right";
      return (
        <MobileSide type={sideType} onClick={this.handleTabChange(sideType === "left" ? 1 : 0)}>
          <Icon type={sideType} style={{ color: white }} />
        </MobileSide>
      );
    }
  };

  renderWidgets = () => {
    const { row, dragging, rowIndex } = this.props;
    const { tabIndex } = this.state;

    return row.widgets.map((widget, i) => (
      <React.Fragment key={i}>
        {dragging && widget.tabIndex === tabIndex && (
          <ItemDetailDropTarget widgetIndex={i} rowIndex={rowIndex} tabIndex={tabIndex} />
        )}
        {!!row.tabs.length &&
          tabIndex === widget.tabIndex &&
          this.renderTabContent({ widgetIndex: i, widget, rowIndex })}
        {!row.tabs.length && this.renderTabContent({ widgetIndex: i, widget, rowIndex })}
      </React.Fragment>
    ));
  };

  render() {
    const { row, onEditTabTitle, rowIndex, dragging, count, windowWidth } = this.props;
    const { tabIndex } = this.state;
    return (
      <Content
        value={tabIndex}
        style={{
          width: row.dimension,
          marginRight: count - 1 === rowIndex ? "0px" : "30px"
        }}
      >
        {row.tabs && windowWidth > MAX_MOBILE_WIDTH && (
          <TabContainer>
            <Tabs value={tabIndex} onChange={this.handleTabChange}>
              {row.tabs.map((tab, key) => (
                <Tabs.Tab
                  key={key}
                  label={tab}
                  style={{
                    width: "50%",
                    textAlign: "center",
                    padding: "30px 20px 15px"
                  }}
                  onChange={e => onEditTabTitle(tabIndex, e.target.value)}
                  editable
                />
              ))}
            </Tabs>
          </TabContainer>
        )}
        {this.renderSide()}
        {!row.widgets.length && dragging && <ItemDetailDropTarget widgetIndex={0} rowIndex={rowIndex} tabIndex={0} />}
        {dragging && row.widgets.filter(w => w.tabIndex === tabIndex).length === 0 && (
          <ItemDetailDropTarget widgetIndex={0} rowIndex={rowIndex} tabIndex={tabIndex} />
        )}

        {this.renderWidgets()}
        <AddButtonContainer justifyContent="center">
          <AddNew onClick={this.onAddBtnClick({ rowIndex, tabIndex })} />
        </AddButtonContainer>
      </Content>
    );
  }
}

const enhance = compose(
  connect(state => ({
    dragging: getItemDetailDraggingSelector(state)
  }))
);

export default enhance(Container);
