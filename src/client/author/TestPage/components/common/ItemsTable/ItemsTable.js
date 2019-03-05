import React, { memo } from "react";
import PropTypes from "prop-types";
import { tabletWidth } from "@edulastic/colors";
import { Table } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { withWindowSizes } from "@edulastic/common";

import styled from "styled-components";
import MainInfoCell from "./MainInfoCell";
import MetaInfoCell from "./MetaInfoCell";
import { getItemsTypesSelector, getStandardsSelector } from "../../Review/ducks";

const ItemsTable = ({ items, types, setSelectedTests, selectedTests, onAddItems, standards, windowWidth }) => {
  const columns = [
    {
      title: "Main info",
      dataIndex: "main",
      key: "main",
      width: "30%",
      render: data => <MainInfoCell data={data} />
    },
    {
      title: "Meta info",
      dataIndex: "meta",
      key: "meta",
      render: data => (
        <MetaInfoCell
          data={data}
          setSelectedTests={setSelectedTests}
          selectedTests={selectedTests}
          onAddItems={onAddItems}
          windowWidth={windowWidth}
        />
      )
    }
  ];

  const mobileColumns = [
    {
      title: "Meta info",
      dataIndex: "meta",
      key: "meta",
      render: data => (
        <MetaInfoCell
          data={data}
          setSelectedTests={setSelectedTests}
          selectedTests={selectedTests}
          onAddItems={onAddItems}
          windowWidth={windowWidth}
        />
      )
    }
  ];

  const data = items.map(item => {
    const stimulus =
      (item.rows[0] &&
        item.rows[0].widgets[0] &&
        item.rows[0].widgets[0].entity &&
        item.rows[0].widgets[0].entity.stimulus) ||
      "";
    const main = {
      title: item._id,
      id: item._id,
      stimulus
    };
    const meta = {
      id: item._id,
      title: item._id,
      by: "Kevin Hart",
      shared: "9578 (1)",
      likes: 9,
      types: types[item._id],
      standards: standards[item._id],
      stimulus
    };

    return {
      key: item._id,
      main,
      meta
    };
  });

  return (
    <TableWrapper
      columns={windowWidth > 993 ? columns : mobileColumns}
      dataSource={data}
      showHeader={false}
      pagination={false}
    />
  );
};

ItemsTable.propTypes = {
  items: PropTypes.array.isRequired,
  types: PropTypes.object.isRequired,
  setSelectedTests: PropTypes.func.isRequired,
  onAddItems: PropTypes.func.isRequired,
  selectedTests: PropTypes.array.isRequired,
  standards: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired
};

const enhance = compose(
  memo,
  withWindowSizes,
  connect(state => ({
    types: getItemsTypesSelector(state),
    standards: getStandardsSelector(state)
  }))
);

export default enhance(ItemsTable);

const TableWrapper = styled(Table)`
  .ant-table-tbody > tr > td {
    padding: 40px 40px 25px 40px;
  }

  @media (max-width: ${tabletWidth}) {
    .ant-table-tbody > tr > td {
      padding: 28px;
    }
  }
`;
