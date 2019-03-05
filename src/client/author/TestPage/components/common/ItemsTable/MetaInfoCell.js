import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Tag, message } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { FlexContainer, MoveLink } from "@edulastic/common";
import { IconShare, IconHeart } from "@edulastic/icons";
import { greenDark, textColor, grey, white } from "@edulastic/colors";
import styled from "styled-components";
import { cloneDeep } from "lodash";

import Tags from "../../../../src/components/common/Tags";
import PreviewModal from "../../../../src/components/common/PreviewModal";
import { setTestDataAction, getTestSelector } from "../../../ducks";

import { setTestItemsAction, getSelectedItemSelector, getTestItemsSelector } from "../../AddItems/ducks";

class MetaInfoCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: props.selectedTests
    };
  }

  componentDidMount() {
    const { selectedRowKeys } = this.state;
    const { setTestItems } = this.props;
    const keys = [];
    selectedRowKeys.forEach((selectedRow, index) => {
      keys[index] = selectedRow;
    });
    setTestItems(selectedRowKeys);
  }

  handleSelection = row => {
    const { setSelectedTests, setTestItems, selectedRows, setTestData, test, tests } = this.props;
    const newTest = cloneDeep(test);
    let keys = [];
    if (selectedRows !== undefined) {
      selectedRows.data.forEach((selectedRow, index) => {
        keys[index] = selectedRow;
      });
    }
    if (!keys.includes(row.id)) {
      keys[keys.length] = row.id;
      setSelectedTests(keys);
      setTestItems(keys);
      message.info(`${row.id} was added`, 2);
      const testToAdd = tests.find(el => row.id === el._id);
      newTest.testItems.push(testToAdd);
    } else {
      keys = keys.filter(item => item !== row.id);
      setSelectedTests(keys);
      setTestItems(keys);
      message.info(`${row.id} was removed`, 2);
      newTest.testItems = newTest.testItems.filter(el => row.id !== el._id);
    }
    setTestData(newTest);
  };

  get isAddOrRemove() {
    const { data, selectedRows } = this.props;
    if (selectedRows && selectedRows.data && selectedRows.data.length) {
      return !selectedRows.data.includes(data.id);
    }
    return true;
  }

  previewItem = () => {
    this.setState({ isShowPreviewModal: true });
  };

  closeModal = () => {
    this.setState({ isShowPreviewModal: false });
  };

  mobileRender = () => {
    const { data } = this.props;
    return (
      <div style={{ padding: "5px 10px" }}>
        <div style={{ marginBottom: 15 }}>
          <MoveLink onClick={() => this.previewItem()}>{data.title}</MoveLink>
          <STIMULUS dangerouslySetInnerHTML={{ __html: data.stimulus }} />
        </div>
        <TypeContainer>
          {data.standards && !!data.standards.length && (
            <FlexContainer>
              <Tags
                tags={data.standards}
                labelStyle={{
                  color: greenDark,
                  background: white,
                  border: `1px solid ${grey}`
                }}
              />
            </FlexContainer>
          )}
          {data.types && !!data.types.length && (
            <FlexContainer flexDirection="column" alignItems="self-start">
              <CategoryTitle style={{ marginBottom: 5 }}>Type: </CategoryTitle>
              <FlexContainer style={{ width: "100%", flexWrap: "wrap" }}>
                {data.types.map(type => (
                  <Tag color="cyan" key={type} style={{ marginTop: 7 }}>
                    {type}
                  </Tag>
                ))}
              </FlexContainer>
            </FlexContainer>
          )}
        </TypeContainer>
        <FlexContainer style={{ flexWrap: "wrap" }} justifyContent="space-between">
          <CategoryDiv>
            <CategoryTitle>By:</CategoryTitle> <FirstText>{data.by}</FirstText>
          </CategoryDiv>
          <CategoryDiv>
            <CategoryTitle>ID:</CategoryTitle> <FirstText>{data._id}</FirstText>
          </CategoryDiv>
          <CategoryDiv>
            <FlexContainer>
              <IconShare color={greenDark} width={16} height={16} /> <SecondText>{data.shared}</SecondText>
            </FlexContainer>
          </CategoryDiv>
          <CategoryDiv style={{ marginRight: 10 }}>
            <FlexContainer>
              <IconHeart color={greenDark} width={16} height={16} /> <SecondText>{data.likes}</SecondText>
            </FlexContainer>
          </CategoryDiv>
        </FlexContainer>
        <StyledButton
          onClick={() => this.handleSelection(data)}
          style={{
            border: this.isAddOrRemove ? "1px solid #00b0ff" : "1px solid #ee1658",
            color: this.isAddOrRemove ? "#00b0ff" : "#ee1658",
            marginTop: 15,
            width: "100%"
          }}
        >
          {this.isAddOrRemove ? "ADD" : "REMOVE"}
        </StyledButton>
      </div>
    );
  };

  render() {
    const { isShowPreviewModal = false } = this.state;
    const { data, windowWidth } = this.props;

    return (
      <Container>
        <PreviewModal isVisible={isShowPreviewModal} onClose={this.closeModal} data={data} />
        {windowWidth > 468 ? (
          <FlexContainer justifyContent="space-between" style={{ fontWeight: 600, color: textColor, flexWrap: "wrap" }}>
            <div style={{ width: "70%" }}>
              {windowWidth < 993 && (
                <div style={{ marginBottom: 15 }}>
                  <MoveLink onClick={() => this.previewItem()}>{data.title}</MoveLink>
                  <STIMULUS dangerouslySetInnerHTML={{ __html: data.stimulus }} />
                </div>
              )}
              <FlexContainer>
                <div>
                  <CategoryTitle>By:</CategoryTitle> <FirstText>{data.by}</FirstText>
                </div>
                <div>
                  <CategoryTitle>ID:</CategoryTitle> <FirstText>{data._id}</FirstText>
                </div>
                <FlexContainer>
                  <IconShare color={greenDark} width={16} height={16} /> <SecondText>{data.shared}</SecondText>
                </FlexContainer>
                <FlexContainer>
                  <IconHeart color={greenDark} width={16} height={16} /> <SecondText>{data.likes}</SecondText>
                </FlexContainer>
              </FlexContainer>
              <TypeContainer>
                {data.standards && !!data.standards.length && (
                  <FlexContainer>
                    <Tags
                      tags={data.standards}
                      labelStyle={{
                        color: greenDark,
                        background: white,
                        border: `1px solid ${grey}`
                      }}
                    />
                  </FlexContainer>
                )}
                {data.types && !!data.types.length && (
                  <FlexContainer>
                    <CategoryTitle>Type: </CategoryTitle>
                    <FlexContainer style={{ width: "100%", flexWrap: "wrap" }}>
                      {data.types.map(type => (
                        <Tag color="cyan" key={type} style={{ marginTop: 3 }}>
                          {type}
                        </Tag>
                      ))}
                    </FlexContainer>
                  </FlexContainer>
                )}
              </TypeContainer>
            </div>
            <StyledButton
              onClick={() => this.handleSelection(data)}
              style={{
                border: this.isAddOrRemove ? "1px solid #00b0ff" : "1px solid #ee1658",
                color: this.isAddOrRemove ? "#00b0ff" : "#ee1658"
              }}
            >
              {this.isAddOrRemove ? "ADD" : "REMOVE"}
            </StyledButton>
          </FlexContainer>
        ) : (
          this.mobileRender()
        )}
      </Container>
    );
  }
}

MetaInfoCell.propTypes = {
  data: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired,
  tests: PropTypes.array.isRequired,
  setSelectedTests: PropTypes.func.isRequired,
  setTestData: PropTypes.func.isRequired,
  selectedTests: PropTypes.array.isRequired,
  setTestItems: PropTypes.func.isRequired,
  selectedRows: PropTypes.object,
  windowWidth: PropTypes.number.isRequired
};

MetaInfoCell.defaultProps = {
  selectedRows: {}
};

const enhance = compose(
  withNamespaces("MetaInfoCell"),
  connect(
    state => ({
      selectedRows: getSelectedItemSelector(state),
      test: getTestSelector(state),
      tests: getTestItemsSelector(state)
    }),
    {
      setTestItems: setTestItemsAction,
      setTestData: setTestDataAction
    }
  )
);

export default enhance(MetaInfoCell);

const FirstText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${greenDark};
`;

const SecondText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #444444;
`;

const CategoryTitle = styled.span`
  width: 40px;
  font-size: 13px;
  color: #444444;
`;

const TypeContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;

  .ant-tag {
    background: rgba(0, 176, 255, 0.2);
    color: rgb(0, 131, 190);
  }
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #00b0ff;
  border: 1px solid #00b0ff;
`;

const Container = styled.div``;

const STIMULUS = styled.div`
  font-size: 13px;
  color: #444444;
  margin-top: 3px;
`;

const CategoryDiv = styled.div`
  width: 45%;
  margin-bottom: 5px;
`;
