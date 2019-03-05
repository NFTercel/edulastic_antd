import React, { Component } from "react";
import { Input, Checkbox } from "antd";
import { FlexContainer } from "@edulastic/common";
import FilterIcon from "../../assets/filter.svg";
import {
  Container,
  FilterImg,
  MainContainer,
  StyledPopover,
  StyledBoldText,
  StyledParagraph,
  ModalContent,
  StyledModal,
  HeaderContent,
  FilterHeader,
  StyledCloseIcon
} from "./styled";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false
    };
  }

  showModal = () => {
    this.setState({
      modalshow: !this.state.modalshow
    });
  };

  handleCancel = e => {
    this.setState({
      modalshow: false
    });
  };

  render() {
    const { windowWidth, windowHeight } = this.props;
    const Search = Input.Search;
    const FilterElement = (
      <MainContainer>
        <StyledBoldText>Grade</StyledBoldText>
        <Input.Search size="large" />
        <StyledParagraph>
          <Checkbox>All</Checkbox>
        </StyledParagraph>
        <StyledParagraph>
          <Checkbox>Lorem Ispum</Checkbox>{" "}
        </StyledParagraph>
        <StyledParagraph>
          <Checkbox>Lorem Ispum</Checkbox>{" "}
        </StyledParagraph>
        <br />
        <hr />
        <StyledBoldText>Subject</StyledBoldText>
        <Input.Search size="large" />
        <StyledBoldText>Year</StyledBoldText>
        <Input.Search size="large" />
      </MainContainer>
    );
    return (
      <FlexContainer>
        <StyledPopover content={FilterElement} placement="bottomLeft" trigger="click">
          <Container>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
        </StyledPopover>
        <ModalContent>
          <Container onClick={this.showModal}>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
          <StyledModal
            footer={false}
            closable={false}
            visible={this.state.modalshow}
            bodyStyle={{ height: windowHeight, width: windowWidth }}
          >
            <HeaderContent>
              <FilterHeader>Filters</FilterHeader>
              <StyledCloseIcon onClick={this.handleCancel} type="close" />
            </HeaderContent>
            {FilterElement}
          </StyledModal>
        </ModalContent>
      </FlexContainer>
    );
  }
}

export default FilterBar;
