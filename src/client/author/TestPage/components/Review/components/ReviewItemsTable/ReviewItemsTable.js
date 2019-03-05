import React, { memo } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";

import MainInfoCell from "./MainInfoCell/MainInfoCell";
import MetaInfoCell from "./MetaInfoCell/MetaInfoCell";
import { getItemsTypesSelector, getStandardsSelector } from "../../ducks";

const ItemsTable = ({ items, types, standards }) => {
  const columns = [
    {
      title: "Main info",
      dataIndex: "main",
      key: "main",
      render: data => <MainInfoCell data={data} />
    },
    {
      title: "Meta info",
      dataIndex: "meta",
      key: "meta",
      render: data => <MetaInfoCell data={data} />
    }
  ];

  const data = items.map(item => {
    const main = {
      title: item._id,
      id: item._id
    };
    const meta = {
      id: item._id,
      by: "Kevin Hart",
      shared: "9578 (1)",
      likes: 9,
      types: types[item._id],
      standards: standards[item._id]
    };

    if (item.data && item.data.questions && item.data.questions.length) {
      main.stimulus = item.data.questions[0].data.stimulus;
    }

    return {
      key: item._id,
      main,
      meta
    };
  });

  return <Table columns={columns} dataSource={data} showHeader={false} />;
};

ItemsTable.propTypes = {
  items: PropTypes.array.isRequired,
  types: PropTypes.object.isRequired,
  standards: PropTypes.object.isRequired
};

const enhance = compose(
  memo,
  connect(state => ({
    types: getItemsTypesSelector(state),
    standards: getStandardsSelector(state)
  }))
);

export default enhance(ItemsTable);
