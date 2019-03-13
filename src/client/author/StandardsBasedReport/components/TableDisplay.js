import React, { Component } from "react";
import { Table, Icon } from "antd";
import styled from "styled-components";
import DetailedDisplay from "./DetailedDisplay";

export default class TableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standards: props.standardReportData.additionalData || [],
      stdId: "",
      selectedRow: 0
    };
  }

  onCaretClick = (e, id = 0, data) => {
    this.setState({ selectedRow: id, stdId: data });
  };

  render() {
    const { selectedRow, stdId, standards } = this.state;
    const columns = [
      {
        title: "Standard",
        dataIndex: "standard",
        key: "standard",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "Mastery Summary",
        dataIndex: "masterySummary",
        key: "masterySummary",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "Performance Summary %",
        key: "performanceSummary",
        dataIndex: "performanceSummary",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "",
        key: "icon",
        dataIndex: "icon"
      }
    ];

    const data = this.state.standards.standards.map((std, index) => ({
      key: index + 1,
      standard: <p className="first-data">{std.identifier}</p>,
      question: std.qIds ? std.qIds[0] : "",
      masterySummary: "00",
      performanceSummary: "45",
      icon:
        this.state.selectedRow === index + 1 ? (
          <Icon type="caret-left" onClick={e => this.onCaretClick(e, 0, std._id)} />
        ) : (
          <Icon type="caret-right" onClick={e => this.onCaretClick(e, index + 1, std._id)} />
        )
    }));

    return (
      <React.Fragment>
        <DivWrapper className="main_table">
          <Table columns={columns} dataSource={data} pagination={false} />
          {selectedRow !== 0 && (
            <DetailedDisplay
              data={standards.standards.find(std => {
                return std._id === stdId;
              })}
            />
          )}
        </DivWrapper>
      </React.Fragment>
    );
  }
}

const DivWrapper = styled.div`
  display: flex;
`;
