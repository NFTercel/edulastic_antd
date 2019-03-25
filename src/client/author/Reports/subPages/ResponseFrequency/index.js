import React, { Component } from "react";
import { compose } from "redux";
import queryString from "query-string";
import { Slider, Row, Col } from "antd";
import { ResponseFrequencyTable } from "./components/table/responseFrequencyTable";
import { SimpleBarChart } from "./components/charts/simpleBarChart";
import { StyledContainer, StyledCard } from "./components/styled";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { CustomizedHeaderWrapper } from "../../common/components/header";
import { reportsApi } from "@edulastic/api";
import jsonData from "./static/json/data.json";

class ResponseFrequency extends Component {
  state = {
    difficultItems: 10,
    misunderstoodItems: 0,
    metaData: {},
    data: [],
    filteredData: [],
    breadcrumbData: [
      {
        title: "REPORTS",
        to: "/author/reports"
      },
      {
        title: "RESPONSE FREQUENCY"
      }
    ]
  };

  constructor(props) {
    let q = queryString.parse(props.location.search);
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let q = queryString.parse(this.props.location.search);
    let { districtId, schoolId, teacherId } = q;

    let res = await reportsApi
      .fetchResponseFrequency({
        testId: this.props.match.params.testId,
        districtId: districtId,
        schoolId: schoolId,
        teacherId: teacherId
      })
      .then(result => result.data.result)
      .catch(error => {
        return {};
      });

    if (res.metrics) {
      let arr = Object.keys(res.metrics).map((key, i) => {
        res.metrics[key].uid = key;
        return res.metrics[key];
      });

      let obj = {
        data: [...arr],
        filteredData: [...arr]
      };

      if (res.metaData) {
        obj.metaData = res.metaData;
      }
      this.setState(obj);
    }
  }

  onChangeDifficultSlider = value => {
    this.setState(state => {
      return { difficultItems: value };
    });
  };

  onChangeMisunderstoodSlider = value => {
    this.setState(state => {
      return { misunderstoodItems: value };
    });
  };

  onBarClickCB = filter => {
    this.setState(state => {
      let arr = [];
      for (let i = 0; i < state.data.length; i++) {
        if (filter[state.data[i].qType] || Object.keys(filter).length === 0) {
          arr.push(state.data[i]);
        }
      }
      return {
        filteredData: arr
      };
    });
  };

  render() {
    return (
      <div>
        <CustomizedHeaderWrapper title="Response Frequency" />
        <Breadcrumb data={this.state.breadcrumbData} style={{ position: "unset", padding: "10px" }} />
        <StyledContainer type="flex">
          <SimpleBarChart data={this.state.data} assessment={this.state.metaData} onBarClickCB={this.onBarClickCB} />
          <StyledCard>
            <Row type="flex" justify="center" className="question-area">
              <Col className="question-container">
                <p>What are the most difficult items?</p>
                <p>Set threshold to warn if % correct falls below:</p>
                <Row type="flex" justify="start" align="middle">
                  <Col className="answer-slider-percentage">
                    <span>{this.state.difficultItems}%</span>
                  </Col>
                  <Col className="answer-slider">
                    <Slider
                      data-slider-id="difficult"
                      defaultValue={this.state.difficultItems}
                      onChange={this.onChangeDifficultSlider}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="question-container">
                <p>What items are misunderstood?</p>
                <p>Set threshold to warn if % frequency of an incorrect choice is above:</p>
                <Row type="flex" justify="start" align="middle">
                  <Col className="answer-slider-percentage">
                    <span>{this.state.misunderstoodItems}%</span>
                  </Col>
                  <Col className="answer-slider">
                    <Slider
                      data-slider-id="misunderstood"
                      defaultValue={this.state.misunderstoodItems}
                      onChange={this.onChangeMisunderstoodSlider}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </StyledCard>
          <ResponseFrequencyTable
            data={this.state.filteredData}
            columns={jsonData.columns}
            assessment={this.state.metaData}
            correctThreshold={this.state.difficultItems}
            incorrectFrequencyThreshold={this.state.misunderstoodItems}
          />
        </StyledContainer>
      </div>
    );
  }
}

const enhance = compose();

export default enhance(ResponseFrequency);
