import React from "react";
import PropTypes from "prop-types";
import { MoveLink } from "@edulastic/common";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PreviewModal from "../../../../src/components/common/PreviewModal";

class MainInfoCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowPreviewModal: false
    };
  }

  previewItem = () => {
    this.setState({ isShowPreviewModal: true });
  };

  closeModal = () => {
    this.setState({ isShowPreviewModal: false });
  };

  render() {
    const { data } = this.props;
    const { isShowPreviewModal } = this.state;

    return (
      <div>
        <MoveLink onClick={() => this.previewItem()}>{data.title}</MoveLink>
        <STIMULUS dangerouslySetInnerHTML={{ __html: data.stimulus }} />
        <PreviewModal isVisible={isShowPreviewModal} onClose={this.closeModal} data={data} />
      </div>
    );
  }
}

MainInfoCell.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(MainInfoCell);

const STIMULUS = styled.div`
  font-size: 13px;
  color: #444444;
  margin-top: 3px;
`;
