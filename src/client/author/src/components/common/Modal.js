import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { white, blue, mobileWidth } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { Button } from "@edulastic/common";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  render() {
    const { onClose, onApply, title, children, t } = this.props;

    return ReactDOM.createPortal(
      <Container>
        <BackDoor onClick={onClose} />
        <Content>
          <Header>
            {title}
            <Close data-cy="close" onClick={onClose}>
              <FaTimes />
            </Close>
          </Header>
          {children}
          <Footer>
            <Button onClick={onClose} variant="extendedFab" style={{ width: "40%" }}>
              {t("component.common.modal.cancel")}
            </Button>
            <Button onClick={onApply} variant="extendedFab" color="primary" style={{ width: "40%" }}>
              {t("component.common.modal.apply")}
            </Button>
          </Footer>
        </Content>
      </Container>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("author")(Modal);

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  position: absolute;
  z-index: 101;
  padding: 30px;
  min-height: 300px;
  min-width: 300px;
  background: ${white};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  border-radius: 5px;

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    min-width: 100%;
  }
`;

const BackDoor = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;

  :hover {
    color: ${blue};
  }
`;

const Footer = styled.div`
  display: flex;
  padding-top: 10px
  justify-content: space-around;
  align-items: center;
`;
