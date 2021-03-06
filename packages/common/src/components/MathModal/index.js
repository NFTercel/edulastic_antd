import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import MathInput from "../MathInput";

class MathModal extends React.Component {
  state = {
    latex: ""
  };

  static propTypes = {
    show: PropTypes.bool,
    symbols: PropTypes.array.isRequired,
    numberPad: PropTypes.array.isRequired,
    showResponse: PropTypes.bool,
    value: PropTypes.string,
    onSave: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    show: false,
    value: "",
    showResponse: false,
    onSave: () => {},
    onClose: () => {}
  };

  constructor(props) {
    super(props);
    this.state.latex = props.value;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show } = this.props;
    if (!show && nextProps.show) {
      this.setState({
        latex: nextProps.value
      });
    }
  }

  onInput(latex) {
    this.setState({ latex });
  }

  render() {
    const { symbols, numberPad, showResponse, show, onSave, onClose } = this.props;
    const { latex } = this.state;

    return (
      <Modal
        visible={show}
        title="Edit Math"
        maskClosable={false}
        onOk={() => onSave(latex)}
        onCancel={() => onClose()}
      >
        <MathInput
          alwaysShowKeyboard
          symbols={symbols}
          numberPad={numberPad}
          showResponse={showResponse}
          value={latex}
          onInput={newLatex => this.onInput(newLatex)}
        />
      </Modal>
    );
  }
}

export default MathModal;
