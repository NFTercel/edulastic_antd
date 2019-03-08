/* eslint-disable no-return-assign */
/* eslint-disable react/no-multi-comp */
import "react-quill/dist/quill.snow.css";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import enhanceWithClickOutside from "react-click-outside";
import MathModal from "./MathModal";

const Embed = Quill.import("blots/block/embed");

class ResponseCmp extends Embed {
  static create() {
    const node = super.create();
    const responseCount = document.querySelectorAll(".response-btn").length;
    node.setAttribute("contenteditable", false);
    node.innerHTML = `&nbsp;<span class="index">${responseCount + 1}</span><span class="text">Response</span>&nbsp;`;
    return node;
  }
}
ResponseCmp.blotName = "Response";
ResponseCmp.tagName = "p";
ResponseCmp.className = "response-btn";
Quill.register(ResponseCmp, true);

class MathInputCmp extends Embed {
  state = {
    mathField: null
  };

  static create() {
    const node = super.create();
    node.innerHTML = '<span class="input__math__field"></span>';
    return node;
  }

  static value(domNode) {
    return domNode.getAttribute("data-latex");
  }

  constructor(domNode, value) {
    super(domNode, value);
    const MQ = window.MathQuill.getInterface(2);
    const mathField = MQ.StaticMath(domNode.firstChild);
    mathField.latex(value);
    this.state = {
      mathField
    };
  }

  value() {
    return this.state.mathField.latex();
  }
}
MathInputCmp.blotName = "MathInput";
MathInputCmp.tagName = "span";
MathInputCmp.className = "input__math";
Quill.register(MathInputCmp, true);

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const ResponseButton = () => (
  <div style={{ border: "dotted 2px #000", padding: "2px 0px 4px", lineHeight: "0.5em", width: 18 }}>r</div>
);

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function formula() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertEmbed(cursorPosition, "MathInput", "");
  this.quill.insertText(cursorPosition + 2, " ", {
    width: "1px"
  });
  this.quill.setSelection(cursorPosition + 1);
}

function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertEmbed(cursorPosition, "Response", "value");
  this.quill.setSelection(cursorPosition + 2);
}

function insertPara() {}

const CustomToolbar = ({ showResponseBtn, active, id, maxWidth }) => {
  const getTopStyle = () =>
    document.getElementById(id)
      ? document.getElementById(id).offsetHeight
        ? -document.getElementById(id).offsetHeight - 15
        : -76
      : -76;

  return (
    <div
      id={id}
      style={{
        display: "block",
        top: getTopStyle(),
        opacity: active ? 1 : 0,
        zIndex: active ? 1000 : -1,
        maxWidth
      }}
      className="toolbars"
    >
      <span className="ql-formats">
        <select className="ql-font" />
        <select className="ql-size" />
      </span>
      <span className="ql-formats">
        <button className="ql-bold" type="button" />
        <button className="ql-italic" type="button" />
        <button className="ql-underline" type="button" />
        <button className="ql-strike" type="button" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub" type="button" />
        <button className="ql-script" value="super" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-header" value="1" type="button" />
        <button className="ql-header" value="2" type="button" />
        <button className="ql-blockquote" type="button" />
        <button className="ql-code-block" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" type="button" />
        <button className="ql-list" value="bullet" type="button" />
        <button className="ql-indent" value="-1" type="button" />
        <button className="ql-indent" value="+1" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-direction" value="rtl" type="button" />
        <select className="ql-align" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" type="button" />
        <button className="ql-image" type="button" />
        <button className="ql-video" type="button" />
        <button className="ql-formula" type="button" />
      </span>
      <span className="ql-formats">
        <button className="ql-clean" type="button" />
      </span>
      {showResponseBtn && (
        <span className="ql-formats">
          <button className="ql-insertStar" type="button">
            <ResponseButton />
          </button>
        </span>
      )}
    </div>
  );
};

CustomToolbar.propTypes = {
  maxWidth: PropTypes.any.isRequired,
  showResponseBtn: PropTypes.bool,
  active: PropTypes.bool,
  id: PropTypes.string
};

CustomToolbar.defaultProps = {
  showResponseBtn: true,
  active: false,
  id: "toolbar"
};

/*
 * Editor component with custom toolbar and content containers
 */
class CustomQuillComponent extends React.Component {
  state = {
    active: false,
    // eslint-disable-next-line react/destructuring-assignment
    firstFocus: this.props.firstFocus,
    showMath: false,
    mathField: null,
    selLatex: "",
    quillVal: null,
    curMathRange: null
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    firstFocus: PropTypes.bool,
    showResponseBtn: PropTypes.bool.isRequired,
    toolbarId: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    clearOnFirstFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    onChange: () => {},
    clearOnFirstFocus: true,
    placeholder: "",
    firstFocus: false,
    readOnly: false,
    style: {
      minHeight: 134,
      border: "1px solid rgb(223, 223, 223)",
      padding: "18px 33px"
    }
  };

  constructor(props) {
    super(props);
    this.state.quillVal = props.value;
  }

  showToolbar = () => {
    this.setState({ active: true });
  };

  onFocus = () => {
    const { clearOnFirstFocus } = this.props;
    const { firstFocus } = this.state;
    if (firstFocus && clearOnFirstFocus) {
      this.setState({ quillVal: "" });
      this.quillRef.getEditor().setText("");
      this.setState({ firstFocus: false });
    }
    this.showToolbar();
  };

  hideToolbar = () => {
    this.setState({ active: false });
  };

  handleClickOutside() {
    this.hideToolbar();
  }

  handleChange = content => {
    const { onChange } = this.props;
    if (this.quillRef) {
      const lines = this.quillRef.getEditor().getLines();
      const val = lines
        .map(line => {
          if (line instanceof MathInputCmp) {
            if (line.state.mathField) {
              return `<span class="input__math" data-latex="${line.state.mathField.latex()}"></span>`;
            }
            return '<span class="input__math"></span>';
          }
          return line.domNode.outerHTML;
        })
        .join("");
      this.setState({
        quillVal: content
      });
      onChange(val);
    }
  };

  onChangeSelection = range => {
    const { showMath } = this.state;
    if (showMath) return;
    if (!range) return;

    const leaf = this.quillRef.getEditor().getLeaf(range.index);
    if (range.length > 1) {
      if (showMath) {
        this.setState({
          showMath: false,
          mathField: null
        });
      }
      return;
    }

    if (leaf[0] instanceof MathInputCmp) {
      if (!showMath) {
        const { mathField } = leaf[0].state;
        this.setState({
          showMath: true,
          selLatex: mathField.latex(),
          mathField,
          curMathRange: range
        });
        this.hideToolbar();
      }
    } else if (showMath) {
      this.setState({
        showMath: false,
        mathField: null
      });
    }
  };

  onSaveLatex = latex => {
    const { mathField, curMathRange } = this.state;
    mathField.latex(latex);

    this.quillRef.getEditor().setSelection(curMathRange.index + 3);
    this.setState({
      selLatex: "",
      showMath: false
    });
  };

  onCloseModal = () => {
    const { selLatex, curMathRange } = this.state;
    if (selLatex === "" && curMathRange) {
      this.quillRef.getEditor().deleteText(curMathRange.index, 2);
    }
    this.setState({
      showMath: false,
      selLatex: ""
    });
  };

  render() {
    const { active, quillVal, showMath, selLatex } = this.state;
    const { placeholder, showResponseBtn, toolbarId, style, readOnly } = this.props;
    const symbols = ["basic", "matrices", "general", "units_si", "units_us"];
    const numberPad = [
      "7",
      "8",
      "9",
      "\\div",
      "4",
      "5",
      "6",
      "\\times",
      "1",
      "2",
      "3",
      "-",
      "0",
      ".",
      ",",
      "+",
      "left_move",
      "right_move",
      "Backspace",
      "="
    ];

    return (
      <div className="text-editor" style={style}>
        <CustomToolbar
          active={active && !readOnly}
          showResponseBtn={showResponseBtn}
          id={toolbarId}
          maxWidth={style.width}
        />
        <ReactQuill
          ref={el => (this.quillRef = el)}
          readOnly={readOnly}
          modules={CustomQuillComponent.modules(toolbarId)}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDownHandler}
          onChangeSelection={this.onChangeSelection}
          placeholder={placeholder}
          value={quillVal}
        />
        <MathModal
          show={showMath}
          symbols={symbols}
          numberPad={numberPad}
          value={selLatex}
          showResponse={false}
          onSave={this.onSaveLatex}
          onClose={this.onCloseModal}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
CustomQuillComponent.modules = toolbarId => ({
  toolbar: {
    container: `#${toolbarId}`,
    handlers: {
      formula,
      insertStar,
      insertPara
    }
  }
});

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
CustomQuillComponent.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "formula"
];

export default enhanceWithClickOutside(CustomQuillComponent);
