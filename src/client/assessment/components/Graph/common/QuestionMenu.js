import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

class QuestionMenu extends Component {
  state = {
    advancedAreOpen: false
  };

  handleAdvancedOpen = () => this.setState({ advancedAreOpen: !this.state.advancedAreOpen });

  handleScroll = (option, index) =>
    window.scrollTo({
      top: option.offset - (index === 0 ? 90 : 250),
      behavior: "smooth"
    });

  render() {
    const { activeTab, main, advanced, isSidebarCollapsed } = this.props;
    const { advancedAreOpen } = this.state;
    return (
      <Menu isSidebarCollapsed={isSidebarCollapsed}>
        <MainOptions activeTab={activeTab} main={main}>
          {main &&
            main.map((option, index) => (
              <Option
                key={index}
                onClick={() => this.handleScroll(option, index)}
                className={index === activeTab && "active"}
              >
                {option.label}
              </Option>
            ))}
        </MainOptions>
        {advanced.length > 0 && (
          <Fragment>
            <AdvancedOptionsHeader onClick={this.handleAdvancedOpen}>
              <p>HIDE ADVANCED OPTIONS</p>
            </AdvancedOptionsHeader>
            {advancedAreOpen && (
              <AdvancedOptions>
                {advanced.map((option, index) => (
                  <Option
                    key={index}
                    onClick={() => this.handleScroll(option, main.length + index)}
                    className={main.length + index === activeTab && "active"}
                  >
                    {option.label}
                  </Option>
                ))}
              </AdvancedOptions>
            )}
          </Fragment>
        )}
      </Menu>
    );
  }
}

QuestionMenu.propTypes = {
  activeTab: PropTypes.number.isRequired,
  main: PropTypes.shape.isRequired,
  advanced: PropTypes.shape.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired
};

export default connect(({ authorUi }) => ({
  isSidebarCollapsed: authorUi.isSidebarCollapsed
}))(QuestionMenu);

const Menu = styled.div`
  position: fixed;
  left: ${props => (props.isSidebarCollapsed ? "185px" : "325px")};
  top: 150px;
  width: 280px;
  padding: 40px 0;
  margin-right: 40px;
`;

const MainOptions = styled.ul`
  position: relative;
  list-style: none;
  padding: 7.5px 0;
  border-left: 2px solid rgba(0, 0, 0, 0.09);

  &::before {
    opacity: ${props => (props.activeTab > props.main.length - 1 ? "0" : "1")};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #00b0ff;
    content: "";
    position: absolute;
    left: -6.5px;
    top: 14px;
    transition: 0.2s ease transform, 0.2s ease opacity;
    transform: translateY(${props => props.activeTab * 47.5 + "px"});
  }
`;

const Option = styled.li`
  cursor: pointer;
  font-size: 11px;
  padding-left: 35px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: 0.2px;
  text-align: left;
  color: #b1b1b1;
  margin-bottom: 25px;
  transition: 0.2s ease color;

  &:last-of-type {
    margin-bottom: 0;
  }

  &.active {
    color: #00b0ff;
  }
`;
const AdvancedOptionsHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;

  p {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: 0.2px;
    text-align: left;
    color: #434b5d;
  }
`;

const AdvancedOptions = styled.ul`
  list-style: none;
  padding: 7.5px 0;
`;
