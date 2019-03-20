import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "antd";

const columns = [
  {
    title: "class name",
    key: "name",
    dataIndex: "name"
  },
  {
    title: "classCode",
    key: "enrollmentCode",
    dataIndex: "enrollmentCode"
  }
];

const ClassListModal = ({ visible, close, groups, syncClass, selectedGroups }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // add keys to  each group. antd table selection works based on keys.
  groups = groups.map((group, index) => ({ ...group, key: index }));

  // for antd row selection
  const rowSelection = {
    onChange: rows => {
      setSelectedRows(rows);
    },
    getCheckboxProps: record => ({
      disabled: selectedGroups.includes(record.enrollmentCode), // Column configuration not to be checked
      name: record.name
    })
  };

  const addGroups = () => {
    const selected = groups.filter((_, index) => selectedRows.includes(index)).map(item => item.enrollmentCode);
    syncClass(selected);
  };

  return (
    <Modal visible={visible} onCancel={close} onOk={addGroups}>
      {selectedRows}
      <Table columns={columns} dataSource={groups} rowSelection={rowSelection} />
    </Modal>
  );
};

ClassListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedGroups: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
  syncClass: PropTypes.func.isRequired
};
export default ClassListModal;
