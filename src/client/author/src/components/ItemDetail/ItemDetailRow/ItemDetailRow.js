import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { Icon } from "antd";

import { mobileWidth, darkBlueSecondary, white } from "@edulastic/colors";
import { FlexContainer, Tabs, Paper } from "@edulastic/common";
import ItemDetailWidget from "./ItemDetailWidget";
import ItemDetailDropTarget from "./ItemDetailDropTarget";
import { getItemDetailDraggingSelector } from "../../../selectors/itemDetail";
import { MAX_MOBILE_WIDTH } from "../../../constants/others";
import AddNew from "./AddNew";

class ItemDetailRow extends Component {
  state = {
    value: 0
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

  handleTabChange = value => {
    this.setState({
      value
    });
  };

  renderTabContent = ({ widgetIndex, widget, rowIndex }) => {
    const { onEditWidget, onDeleteWidget } = this.props;
    return (
      <ItemDetailWidget
        widget={widget}
        onEdit={() => onEditWidget(widget, rowIndex)}
        onDelete={() => onDeleteWidget(widgetIndex)}
        widgetIndex={widgetIndex}
        rowIndex={rowIndex}
      />
    );
  };

  render() {
    const { row, onAdd, onEditTabTitle, rowIndex, dragging, count, windowWidth } = this.props;
    const { value } = this.state;
    return (
      <Container
        value={value}
        style={{
          width: row.dimension,
          marginRight: count - 1 === rowIndex ? "0px" : "30px"
        }}
      >
        {row.tabs && windowWidth > MAX_MOBILE_WIDTH && !!row.tabs.length && (
          <TabContainer>
            <Tabs value={value} onChange={this.handleTabChange}>
              {row.tabs.map((tab, tabIndex) => (
                <Tabs.Tab
                  key={tabIndex}
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
        {row.tabs && windowWidth < MAX_MOBILE_WIDTH && !!row.tabs.length && value === 0 && (
          <MobileRightSide onClick={() => this.handleTabChange(1)}>
            <Icon type="left" style={{ color: white }} />
          </MobileRightSide>
        )}
        {row.tabs && windowWidth < MAX_MOBILE_WIDTH && !!row.tabs.length && value === 1 && (
          <MobileLeftSide onClick={() => this.handleTabChange(0)}>
            <Icon type="right" style={{ color: white }} />
          </MobileLeftSide>
        )}
        {!row.widgets.length && dragging && <ItemDetailDropTarget widgetIndex={0} rowIndex={rowIndex} tabIndex={0} />}
        {dragging && row.widgets.filter(w => w.tabIndex === value).length === 0 && (
          <ItemDetailDropTarget widgetIndex={0} rowIndex={rowIndex} tabIndex={value} />
        )}
        {row.widgets.map((widget, i) => (
          <React.Fragment key={i}>
            {dragging && widget.tabIndex === value && (
              <ItemDetailDropTarget widgetIndex={i} rowIndex={rowIndex} tabIndex={value} />
            )}
            {!!row.tabs.length &&
              value === widget.tabIndex &&
              this.renderTabContent({ widgetIndex: i, widget, rowIndex })}
            {!row.tabs.length && this.renderTabContent({ widgetIndex: i, widget, rowIndex })}
          </React.Fragment>
        ))}
        <AddButtonContainer justifyContent="center">
          <AddNew onClick={() => onAdd({ rowIndex, tabIndex: value })} />
        </AddButtonContainer>
      </Container>
    );
  }
}

const enhance = compose(
  connect(state => ({
    dragging: getItemDetailDraggingSelector(state)
  }))
);

export default enhance(ItemDetailRow);

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  overflow: auto;
  padding-left: 40px;
  padding-top: 20px;
  height: 100%;

  @media (max-width: ${mobileWidth}) {
    padding-left: 10px;
    margin-right: ${props => !props.value && "20px !important"};
    margin-left: ${props => props.value && "20px !important"};
  }
`;

const TabContainer = styled.div`
  margin-bottom: 30px;
`;

const AddButtonContainer = styled(FlexContainer)`
  margin-bottom: 30px;
  margin-right: 40px;

  @media (max-width: ${mobileWidth}) {
    margin-right: 0px;
  }
`;

const MobileRightSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 220px);
  right: 0;
  background: ${darkBlueSecondary};
  width: 25px;
  bottom: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const MobileLeftSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 220px);
  left: 0;
  background: ${darkBlueSecondary};
  width: 25px;
  bottom: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
