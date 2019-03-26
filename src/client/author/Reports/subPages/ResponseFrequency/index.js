import React, { useState, useEffect, useMemo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import queryString from "query-string";
import { Row, Col } from "antd";
import { ResponseFrequencyTable } from "./components/table/responseFrequencyTable";
import { SimpleBarChart } from "./components/charts/simpleBarChart";
import { StyledContainer, StyledCard } from "./components/styled";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { CustomizedHeaderWrapper } from "../../common/components/header";
import { StyledSlider } from "../../common/styled";
import jsonData from "./static/json/data.json";
import { get } from "lodash";

import { getResponseFrequencyRequestAction, getReportsResponseFrequency } from "./ducks";

const filterData = (data, filter) => (Object.keys(filter).length > 0 ? data.filter(item => filter[item.qType]) : data);

const ResponseFrequency = props => {
  const breadcrumbData = [
    {
      title: "REPORTS",
      to: "/author/reports"
    },
    {
      title: "RESPONSE FREQUENCY"
    }
  ];
  const [difficultItems, setDifficultItems] = useState(10);
  const [misunderstoodItems, setMisunderstoodItems] = useState(0);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    let q = queryString.parse(props.location.search);
    q.testId = props.match.params.testId;
    props.getResponseFrequencyRequestAction(q);
  }, []);

  let res = get(props, "responseFrequency.data.result", false);
  const obj = useMemo(() => {
    let obj = {
      metaData: {},
      data: [],
      filteredData: []
    };
    if (res) {
      let arr = Object.keys(res.metrics).map((key, i) => {
        res.metrics[key].uid = key;
        return res.metrics[key];
      });

      obj = {
        data: [...arr],
        filteredData: [...arr],
        metaData: res.metaData
      };
    }
    return obj;
  }, [res]);

  const filteredData = useMemo(() => filterData(obj.data, filter), [filter, obj.data]);

  const onChangeDifficultSlider = value => {
    setDifficultItems(value);
  };

  const onChangeMisunderstoodSlider = value => {
    setMisunderstoodItems(value);
  };

  const onBarClickCB = filter => {
    setFilter(filter);
  };

  return (
    <div>
      <CustomizedHeaderWrapper title="Response Frequency" />
      <Breadcrumb data={breadcrumbData} style={{ position: "unset", padding: "10px" }} />
      <StyledContainer type="flex">
        <SimpleBarChart data={obj.data} assessment={obj.metaData} onBarClickCB={onBarClickCB} />
        <StyledCard>
          <Row type="flex" justify="center" className="question-area">
            <Col className="question-container">
              <p>What are the most difficult items?</p>
              <p>Set threshold to warn if % correct falls below:</p>
              <Row type="flex" justify="start" align="middle">
                <Col className="answer-slider-percentage">
                  <span>{difficultItems}%</span>
                </Col>
                <Col className="answer-slider">
                  <StyledSlider
                    data-slider-id="difficult"
                    defaultValue={difficultItems}
                    onChange={onChangeDifficultSlider}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="question-container">
              <p>What items are misunderstood?</p>
              <p>Set threshold to warn if % frequency of an incorrect choice is above:</p>
              <Row type="flex" justify="start" align="middle">
                <Col className="answer-slider-percentage">
                  <span>{misunderstoodItems}%</span>
                </Col>
                <Col className="answer-slider">
                  <StyledSlider
                    data-slider-id="misunderstood"
                    defaultValue={misunderstoodItems}
                    onChange={onChangeMisunderstoodSlider}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </StyledCard>
        <ResponseFrequencyTable
          data={filteredData}
          columns={jsonData.columns}
          assessment={obj.metaData}
          correctThreshold={difficultItems}
          incorrectFrequencyThreshold={misunderstoodItems}
        />
      </StyledContainer>
    </div>
  );
};

const enhance = compose(
  connect(
    state => ({
      responseFrequency: getReportsResponseFrequency(state)
    }),
    {
      getResponseFrequencyRequestAction: getResponseFrequencyRequestAction
    }
  )
);

export default enhance(ResponseFrequency);
