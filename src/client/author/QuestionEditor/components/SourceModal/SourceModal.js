import React, { Component, lazy } from "react";

import PropTypes from "prop-types";
import { Modal } from "../../../src/components/common";

//to lazy load brace editor library
const getAce = async () => {
  const ace = await import("react-ace");
  await Promise.all([import("brace/theme/github"), import("brace/mode/json")]);
  return ace;
};
const AceEditor = lazy(() => getAce());
class SourceModal extends Component {
  state = {
    json: ""
  };

  handleChange = json => {
    this.setState({
      json
    });
  };

  handleApply = () => {
    const { onApply } = this.props;
    const { json } = this.state;
    onApply(json);
  };

  componentDidMount() {
    const { children } = this.props;

    this.setState({
      json: children
    });
  }

  render() {
    const { onClose } = this.props;
    const { json } = this.state;

    return (
      <Modal title="Source" onApply={this.handleApply} onClose={onClose}>
        <AceEditor
          mode="json"
          theme="github"
          onChange={this.handleChange}
          editorProps={{ $blockScrolling: true }}
          value={json}
        />
      </Modal>
    );
  }
}

SourceModal.propTypes = {
  children: PropTypes.any.isRequired,
  onApply: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SourceModal;
