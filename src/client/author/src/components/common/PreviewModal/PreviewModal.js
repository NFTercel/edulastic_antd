import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin } from "antd";
import styled from "styled-components";
import Modal from "react-responsive-modal";

import TestItemPreview from "../../../../../assessment/components/TestItemPreview";
import {
  getItemDetailByIdAction,
  getItemDetailLoadingSelector,
  getItemDetailRowsSelector,
  getItemDetailSelector
} from "../../../../ItemDetail/ducks";

class PreviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { flag } = this.state;
    const { getItemDetailById, data, isVisible } = nextProps;
    if (isVisible && !flag) {
      getItemDetailById(data.id, { data: true, validation: true });
      this.setState({ flag: true });
    }
  }

  closeModal = () => {
    const { onClose } = this.props;
    this.setState({ flag: false });
    onClose();
  };

  render() {
    const { isVisible, loading, item, rows } = this.props;
    return (
      <Modal styles={{ minWidth: 200 }} open={isVisible} onClose={this.closeModal} center>
        <h2 style={{ fontWeight: "bold", fontSize: 20 }}>Preview</h2>
        {loading || item === null ? (
          <ProgressContainer>
            <Spin tip="Loading..." />
          </ProgressContainer>
        ) : (
          <TestItemPreview
            cols={rows}
            previewTab="clear"
            verticalDivider={item.verticalDivider}
            scrolling={item.scrolling}
            style={{ width: "100%" }}
          />
        )}
      </Modal>
    );
  }
}

PreviewModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  getItemDetailById: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.array,
  item: PropTypes.object
};

PreviewModal.defaultProps = {
  rows: [],
  item: null
};

const enhance = compose(
  connect(
    state => ({
      rows: getItemDetailRowsSelector(state),
      loading: getItemDetailLoadingSelector(state),
      item: getItemDetailSelector(state)
    }),
    {
      getItemDetailById: getItemDetailByIdAction
    }
  )
);

export default enhance(PreviewModal);

const ProgressContainer = styled.div`
  min-width: 250px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
