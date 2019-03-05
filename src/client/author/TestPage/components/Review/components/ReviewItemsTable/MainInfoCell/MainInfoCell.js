import React from "react";
import PropTypes from "prop-types";
import { MoveLink } from "@edulastic/common";
import { withRouter } from "react-router-dom";
import { Stimulus } from "./styled";
import PreviewModal from "../../../../../../src/components/common/PreviewModal";

class MainInfoCell extends React.Component {
  state = {
    isShowPreviewModal: false
  };

  onPreviewModalChange = () => {
    this.setState({
      isShowPreviewModal: !this.state.isShowPreviewModal
    });
  };

  render() {
    const { data } = this.props;
    const { isShowPreviewModal } = this.state;

    return (
      <div>
        <MoveLink onClick={this.onPreviewModalChange}>{data.title}</MoveLink>
        <Stimulus dangerouslySetInnerHTML={{ __html: data.stimulus }} />
        <PreviewModal isVisible={isShowPreviewModal} onClose={this.onPreviewModalChange} data={data} />
      </div>
    );
  }
}

MainInfoCell.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(MainInfoCell);
