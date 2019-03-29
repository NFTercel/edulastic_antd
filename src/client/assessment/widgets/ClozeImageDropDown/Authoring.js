import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import produce from "immer";
import "react-quill/dist/quill.snow.css";
import { Checkbox, Input, Select, Upload, message } from "antd";
import { ChromePicker } from "react-color";
import { withTheme } from "styled-components";

import { withNamespaces } from "@edulastic/localization";
import { API_CONFIG } from "@edulastic/api";
import { PaddingDiv } from "@edulastic/common";

import { updateVariables } from "../../utils/variables";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import DropArea from "../../containers/DropArea";
import { Subtitle } from "../../styled/Subtitle";
import { AddNewChoiceBtn } from "../../styled/AddNewChoiceBtn";
import SortableList from "../../components/SortableList/index";

import { StyledCustomQuill } from "./styled/StyledCustomQuill";
import { FormContainer } from "./styled/FormContainer";
import { ImageWidthInput } from "./styled/ImageWidthInput";
import { ImageAlterTextInput } from "./styled/ImageAlterTextInput";
import { ColorBox } from "./styled/ColorBox";
import { ColorPickerContainer } from "./styled/ColorPickerContainer";
import { ColorPickerWrapper } from "./styled/ColorPickerWrapper";
import { MaxRespCountInput } from "./styled/MaxRespCountInput";
import { FlexContainer } from "./styled/FlexContainer";
import { ControlBar } from "./styled/ControlBar";
import { ControlButton } from "./styled/ControlButton";
import { PointerContainer } from "./styled/PointerContainer";
import { PointerSelect } from "./styled/PointerSelect";
import { ImageFlexView } from "./styled/ImageFlexView";
import { ImageContainer } from "./styled/ImageContainer";
import { PreviewImage } from "./styled/PreviewImage";
import { CheckContainer } from "./styled/CheckContainer";
import { IconDrawResize } from "./styled/IconDrawResize";
import { IconPin } from "./styled/IconPin";
import { IconUpload } from "./styled/IconUpload";

const { Option } = Select;
const { Dragger } = Upload;

class Authoring extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  };

  state = {
    isColorPickerVisible: false
  };

  onChangeQuestion = stimulus => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.stimulus = stimulus;
        updateVariables(draft);
      })
    );
  };

  onSortEnd = (index, { oldIndex, newIndex }) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index] = arrayMove(draft.options[index], oldIndex, newIndex);
      })
    );
  };

  remove = (index, itemIndex) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index].splice(itemIndex, 1);
        updateVariables(draft);
      })
    );
  };

  editOptions = (index, itemIndex, e) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        if (draft.options[index] === undefined) draft.options[index] = [];
        draft.options[index][itemIndex] = e.target.value;
        updateVariables(draft);
      })
    );
  };

  addNewChoiceBtn = index => {
    const { item, setQuestionData, t } = this.props;
    setQuestionData(
      produce(item, draft => {
        if (draft.options[index] === undefined) draft.options[index] = [];
        draft.options[index].push(t("component.cloze.imageDropDown.newChoice"));
      })
    );
  };

  onItemPropChange = (prop, value) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft[prop] = value;
        updateVariables(draft);
      })
    );
  };

  onResponseLabelChange = (index, value) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.responses[index].label = value;
        updateVariables(draft);
      })
    );
  };

  showColorPicker = status => {
    this.setState({ isColorPickerVisible: status });
  };

  updateData = item => {
    this.onItemPropChange("responses", item);
  };

  handlePointersChange = value => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.responses = draft.responses.map(it => {
          if (it.active) {
            it.pointerPosition = value;
          }
          return it;
        });

        updateVariables(draft);
      })
    );
  };

  handleImageUpload = info => {
    const { status, response } = info.file;
    const { t } = this.props;
    if (status === "done") {
      message.success(`${info.file.name} ${t("component.cloze.imageDropDown.fileUploadedSuccessfully")}.`);
      const imageUrl = response.result.fileUri;
      this.onItemPropChange("imageUrl", imageUrl);
    } else if (status === "error") {
      message.error(`${info.file.name} ${t("component.cloze.imageDropDown.fileUploadFailed")}.`);
    }
  };

  render() {
    const { t, item, theme } = this.props;
    const { maxRespCount, background, imageAlterText, isEditAriaLabels, responses, imageWidth } = item;

    const { isColorPickerVisible } = this.state;
    const hasActive = item.responses && item.responses.filter(it => it.active === true).length > 0;

    const draggerProps = {
      name: "file",
      action: `${API_CONFIG.api}/file/upload`,
      headers: {
        authorization: localStorage.getItem("access_token")
      },
      className: "drag-full-parent"
    };

    return (
      <div>
        <PaddingDiv>
          <Subtitle>{t("component.cloze.imageDropDown.composequestion")}</Subtitle>
          <StyledCustomQuill
            toolbarId="stimulus"
            wrappedRef={instance => {
              this.stimulus = instance;
            }}
            placeholder={t("component.cloze.imageDropDown.thisisstem")}
            onChange={this.onChangeQuestion}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <PaddingDiv top={30} />
          <FormContainer>
            <div style={{ alignItems: "center" }}>
              <ImageWidthInput
                data-cy="image-width-input"
                defaultValue={imageWidth}
                onChange={val => this.onItemPropChange("imageWidth", val)}
              />

              <PaddingDiv left={20}>{t("component.cloze.imageDropDown.widthpx")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <ImageAlterTextInput
                data-cy="image-alternate-input"
                size="large"
                defaultValue={imageAlterText}
                onChange={val => this.onItemPropChange("imageAlterText", val.target.value)}
              />
              <PaddingDiv left={20}>{t("component.cloze.imageDropDown.imagealtertext")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <ColorBox
                data-cy="image-text-box-color-picker"
                background={background}
                onClick={() => this.showColorPicker(true)}
              />
              {isColorPickerVisible && (
                <ColorPickerContainer data-cy="image-text-box-color-panel">
                  <ColorPickerWrapper onClick={() => this.showColorPicker(false)} />
                  <ChromePicker
                    color={background}
                    onChangeComplete={color => this.onItemPropChange("background", color.hex)}
                  />
                </ColorPickerContainer>
              )}
              <PaddingDiv left={20}>{t("component.cloze.imageDropDown.fillcolor")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <MaxRespCountInput
                data-cy="drag-drop-image-max-res"
                min={1}
                max={10}
                defaultValue={maxRespCount}
                onChange={val => this.onItemPropChange("maxRespCount", val)}
              />
              <PaddingDiv left={20} style={{ width: 160 }}>
                {t("component.cloze.imageDropDown.maximumresponses")}
              </PaddingDiv>
            </div>
          </FormContainer>
          <FlexContainer
            style={{
              padding: 0,
              background: "#fbfafc",
              borderRadius: "0px 0px 10px 10px",
              overflow: "hidden"
            }}
          >
            <ControlBar>
              <ControlButton>
                <IconDrawResize />
                {t("component.cloze.imageDropDown.drawresize")}
              </ControlButton>

              <PointerContainer className="controls-bar">
                <ControlButton disabled={!hasActive}>
                  <IconPin />
                  {t("component.cloze.imageDropDown.pointers")}
                </ControlButton>
                <PointerSelect disabled={!hasActive} defaultValue="none" onChange={this.handlePointersChange}>
                  <Option value="none">{t("component.cloze.imageDropDown.none")}</Option>
                  <Option value="top">{t("component.cloze.imageDropDown.top")}</Option>
                  <Option value="bottom">{t("component.cloze.imageDropDown.bottom")}</Option>
                  <Option value="left">{t("component.cloze.imageDropDown.left")}</Option>
                  <Option value="right">{t("component.cloze.imageDropDown.right")}</Option>
                </PointerSelect>
              </PointerContainer>
            </ControlBar>
            <ImageFlexView size={1}>
              <ImageContainer data-cy="drag-drop-image-panel" width={imageWidth || 600}>
                {item.imageUrl && (
                  <React.Fragment>
                    <PreviewImage src={item.imageUrl} width="100%" alt="resp-preview" />
                    <DropArea updateData={this.updateData} item={item} />
                  </React.Fragment>
                )}
                {!item.imageUrl && (
                  <Dragger {...draggerProps} onChange={this.handleImageUpload}>
                    <p className="ant-upload-drag-icon">
                      <IconUpload />
                    </p>
                    <p
                      className="ant-upload-hint"
                      style={{
                        color: theme.widgets.clozeImageDropDown.antUploadHintColor
                      }}
                    >
                      <strong>{t("component.cloze.imageDropDown.dragAndDrop")}</strong>
                    </p>
                    <h2 className="ant-upload-text" style={{ color: "rgb(177, 177, 177)" }}>
                      {t("component.cloze.imageDropDown.yourOwnImage")}
                    </h2>
                    <p className="ant-upload-hint" style={{ color: "rgb(230, 230, 230)" }}>
                      {t("component.cloze.imageDropDown.orBrowse")}: PNG, JPG, GIF (1024KB MAX.)
                    </p>
                  </Dragger>
                )}
              </ImageContainer>
              <CheckContainer>
                <Checkbox
                  data-cy="drag-drop-image-aria-check"
                  defaultChecked={isEditAriaLabels}
                  onChange={val => this.onItemPropChange("isEditAriaLabels", val.target.checked)}
                >
                  {t("component.cloze.imageDropDown.editAriaLabels")}
                </Checkbox>
              </CheckContainer>
            </ImageFlexView>
          </FlexContainer>
          <PaddingDiv>
            {isEditAriaLabels && (
              <React.Fragment>
                <Subtitle>{t("component.cloze.imageDropDown.editAriaLabels")}</Subtitle>
                {responses.map((responseContainer, index) => (
                  <div className="imagelabelDropDown-droppable iseditablearialabel" key={index}>
                    <span className="index-box">{index + 1}</span>
                    <Input
                      defaultValue={responseContainer.label}
                      onChange={e => this.onResponseLabelChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </React.Fragment>
            )}
          </PaddingDiv>
          {item.options.map((option, index) => (
            <PaddingDiv key={index} top={30} data-cy={`choice-response-${index}`}>
              <Subtitle style={{ padding: "0px 0px 6px 0px" }}>
                {t("component.cloze.imageDropDown.response")} {index + 1}
              </Subtitle>
              <SortableList
                items={option || []}
                onSortEnd={params => this.onSortEnd(index, params)}
                dirty={item.firstMount}
                useDragHandle
                onRemove={itemIndex => this.remove(index, itemIndex)}
                onChange={(itemIndex, e) => this.editOptions(index, itemIndex, e)}
              />
              <PaddingDiv top={6}>
                <AddNewChoiceBtn data-cy={`add-new-ch-res-${index}`} onClick={() => this.addNewChoiceBtn(index)}>
                  {t("component.cloze.imageDropDown.addnewchoice")}
                </AddNewChoiceBtn>
              </PaddingDiv>
            </PaddingDiv>
          ))}
        </PaddingDiv>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withNamespaces("assessment"),
  withTheme,
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )
);

export default enhance(Authoring);
