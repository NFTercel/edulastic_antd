import React, { useContext, Component, forwardRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import enhanceWithClickOutside from "react-click-outside";

import { MathEssayInputContext } from "../../../../index";
import { Wrapper } from "./styled/Wrapper";

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = ({ active, toolbarId }) => {
  const { textFormattingOptions } = useContext(MathEssayInputContext);

  const getButtons = () => {
    const result = [];

    textFormattingOptions.forEach(opt => {
      switch (opt) {
        case "bold":
        case "italic":
        case "underline":
          result.push(<button key={opt} type="button" className={`ql-${opt}`} />);
          break;
        case "unorderedList":
          result.push(<button key="unorderedList" type="button" className="ql-list" value="bullet" />);
          break;
        case "orderedList":
          result.push(<button key="orderedList" type="button" className="ql-list" value="ordered" />);
          break;
        case "removeFormat":
          result.push(<button key="removeFormat" type="button" className="ql-clean" />);
          break;
        case "superscript":
          result.push(<button key="superscript" type="button" className="ql-script" value="super" />);
          break;
        case "subscript":
          result.push(<button key="subscript" type="button" className="ql-script" value="sub" />);
          break;
        default:
          return result;
      }
    });

    return result;
  };

  return (
    <div
      id={toolbarId}
      style={{
        display: active ? "block" : "none",
        position: "absolute",
        top: -48
      }}
    >
      {getButtons()}
    </div>
  );
};

CustomToolbar.propTypes = {
  active: PropTypes.bool.isRequired,
  toolbarId: PropTypes.string.isRequired
};

class CustomTextInput extends Component {
  state = {
    active: false
  };

  componentWillUnmount() {
    this.hideToolbar();
  }

  showToolbar = () => {
    const { onFocus } = this.props;

    onFocus(true);
    this.setState({
      active: true
    });
  };

  hideToolbar = () => {
    this.setState({ active: false });
  };

  handleClickOutside = () => {
    const { onFocus } = this.props;

    onFocus(false);
    this.hideToolbar(false);
  };

  render() {
    const { style, onChange, placeholder, value, onKeyDown, toolbarId, innerRef, fontSize } = this.props;
    const { active } = this.state;

    return (
      <div className="text-editor" style={style}>
        <CustomToolbar active={active} toolbarId={toolbarId} />
        <Wrapper fontSize={fontSize}>
          <ReactQuill
            ref={innerRef}
            onFocus={this.showToolbar}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            modules={CustomTextInput.modules(toolbarId)}
            value={value}
          />
        </Wrapper>
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
CustomTextInput.modules = toolbarId => ({
  toolbar: {
    container: `#${toolbarId}`,
    handlers: {
      insertStar
    }
  }
});

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
CustomTextInput.formats = ["bold", "italic", "underline", "list", "bullet", "script", "clean"];

CustomTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
  fontSize: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  toolbarId: PropTypes.string.isRequired
};

CustomTextInput.defaultProps = {
  placeholder: "",
  style: {},
  onFocus: () => {},
  onKeyDown: () => {},
  value: ""
};

const Com = enhanceWithClickOutside(CustomTextInput);

export default forwardRef((props, ref) => <Com innerRef={ref} {...props} />);
