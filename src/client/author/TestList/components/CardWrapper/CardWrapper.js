import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col } from "antd";
import Item from "../Item/Item";
import ListItem from "../ListItem/ListItem";

class CardWrapper extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    windowWidth: PropTypes.number,
    blockStyle: PropTypes.string
  };

  render() {
    const { blockStyle, item, windowWidth, history, match } = this.props;

    if (blockStyle === "tile") {
      return (
        <Col key={item._id} span={windowWidth > 468 ? 8 : 24} style={{ marginBottom: 15 }}>
          <Item item={item} history={history} match={match} />
        </Col>
      );
    }

    return (
      <Col key={item._id} span={24}>
        <ListItem item={item} history={history} match={match} />
      </Col>
    );
  }
}

export default CardWrapper;
