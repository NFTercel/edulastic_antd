import React, { Component } from "react";
import { Dropdown } from "antd";

import { FlexContainer } from "@edulastic/common";

import FilterIcon from "../../assets/filter.svg";
import {
  Container,
  FilterImg,
  MainContainer,
  StyledBoldText,
  StyledParagraph,
  ModalContent,
  StyledModal,
  HeaderContent,
  FilterHeader,
  StyledCloseIcon,
  FilterInput,
  FilterCheckbox,
  FilterCheckboxWrapper,
  FilterButtonWrapper
} from "./styled";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false,
      popoverVisible: false
    };
  }

  togglePopover = () =>
    this.setState(state => ({
      popoverVisible: !state.popoverVisible
    }));

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
    const { modalshow, popoverVisible } = this.state;
    const { windowWidth, windowHeight } = this.props;
    const FilterElement = (
      <MainContainer>
        <FilterButtonWrapper>
          <Container active={popoverVisible}>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
        </FilterButtonWrapper>
        <StyledBoldText>Grade</StyledBoldText>
        <FilterInput size="large" />
        <FilterCheckboxWrapper>
          <StyledParagraph>
            <FilterCheckbox>All</FilterCheckbox>
          </StyledParagraph>
          <StyledParagraph>
            <FilterCheckbox>Lorem</FilterCheckbox>
          </StyledParagraph>
          <StyledParagraph>
            <FilterCheckbox>Lorem</FilterCheckbox>
          </StyledParagraph>
        </FilterCheckboxWrapper>
        <StyledBoldText>Subject</StyledBoldText>
        <FilterInput size="large" />
        <StyledBoldText>Year</StyledBoldText>
        <FilterInput size="large" />
      </MainContainer>
    );
    return (
      <FlexContainer>
        <Dropdown
          overlay={FilterElement}
          placement="bottomRight"
          trigger={["click"]}
          visible={popoverVisible}
          onVisibleChange={this.togglePopover}
        >
          <Container active={popoverVisible}>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
        </Dropdown>
        <ModalContent>
          <Container active={modalshow} onClick={this.showModal}>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
          <StyledModal
            footer={false}
            closable={false}
            visible={modalshow}
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
