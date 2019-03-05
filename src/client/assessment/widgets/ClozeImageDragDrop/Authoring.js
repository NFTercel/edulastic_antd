import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import "react-quill/dist/quill.snow.css";
import { Button, Checkbox, Input, InputNumber, Select, Upload, message } from "antd";
import { ChromePicker } from "react-color";
import { withTheme } from "styled-components";

import { PaddingDiv, CustomQuillComponent } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { API_CONFIG } from "@edulastic/api";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import DropArea from "../../containers/DropArea";
import SortableList from "../../components/SortableList/index";
import { FlexView } from "../../styled/FlexView";
import { AddNewChoiceBtn } from "../../styled/AddNewChoiceBtn";
import { Subtitle } from "../../styled/Subtitle";

import { ColorBox } from "./styled/ColorBox";
import { ColorPickerContainer } from "./styled/ColorPickerContainer";
import { ColorPickerWrapper } from "./styled/ColorPickerWrapper";
import { FlexContainer } from "./styled/FlexContainer";
import { IconDrawResize } from "./styled/IconDrawResize";
import { IconPin } from "./styled/IconPin";
import { IconUpload } from "./styled/IconUpload";
import { PreviewImage } from "../ClozeImageDropDown/styled/PreviewImage";
import { ImageContainer } from "../ClozeImageDropDown/styled/ImageContainer";

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

  getNewItem() {
    const { item } = this.props;
    return cloneDeep(item);
  }

  onChangeQuesiton = html => {
    const stimulus = html;
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, stimulus });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options = arrayMove(newItem.options, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  remove = index => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options.splice(index, 1);
    setQuestionData(newItem);
  };

  editOptions = (index, e) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options[index] = e.target.value;
    setQuestionData(newItem);
  };

  addNewChoiceBtn = () => {
    const { setQuestionData, t } = this.props;
    const newItem = this.getNewItem();
    newItem.options.push(t("component.cloze.imageDragDrop.newChoice"));
    setQuestionData(newItem);
  };

  onResponsePropChange = (prop, value) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    if (newItem.responseLayout === undefined) {
      newItem.responseLayout = {};
    }
    newItem.responseLayout[prop] = value;
    setQuestionData({ ...newItem });
  };

  onItemPropChange = (prop, value) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem[prop] = value;
    setQuestionData({ ...newItem });
  };

  onResponseLabelChange = (index, value) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.responses[index].label = value;
    setQuestionData({ ...newItem });
  };

  showColorPicker = status => {
    this.setState({ isColorPickerVisible: status });
  };

  updateData = item => {
    this.onItemPropChange("responses", item);
  };

  handlePointersChange = value => {
    const { item, setQuestionData } = this.props;
    const newResponses = item.responses.map(it => {
      if (it.active) {
        it.pointerPosition = value;
      }
      return it;
    });
    setQuestionData({ ...item, responses: newResponses });
  };

  handleImageUpload = info => {
    const { status, response } = info.file;
    const { t } = this.props;
    if (status === "done") {
      message.success(`${info.file.name} ${t("component.cloze.imageDragDrop.fileUploadedSuccessfully")}.`);
      const imageUrl = response.result.fileUri;
      this.onItemPropChange("imageUrl", imageUrl);
    } else if (status === "error") {
      message.error(`${info.file.name} ${t("component.cloze.imageDragDrop.fileUploadFailed")}.`);
    }
  };

  render() {
    const { t, item, theme } = this.props;
    const {
      maxRespCount,
      responseLayout,
      background,
      imageAlterText,
      isEditAriaLabels,
      imageTitle,
      responses,
      imageWidth
    } = item;

    const { isColorPickerVisible } = this.state;
    const hasActive = item.responses && item.responses.filter(it => it.active === true).length > 0;

    const draggerProps = {
      name: "file",
      action: `${API_CONFIG.api}/file/upload`,
      headers: {
        authorization: localStorage.getItem("access_token")
      }
    };
    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t("component.cloze.imageDragDrop.composequestion")}</Subtitle>
          <CustomQuillComponent
            toolbarId="stimulus"
            firstFocus={item.firstMount}
            wrappedRef={instance => {
              this.stimulus = instance;
            }}
            placeholder={t("component.cloze.imageDragDrop.thisisstem")}
            onChange={this.onChangeQuesiton}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <PaddingDiv top={30} />
          <FlexContainer
            style={{
              background: theme.widgets.clozeImageDragDrop.imageSettingsContainerBgColor,
              height: 70,
              fontSize: theme.widgets.clozeImageDragDrop.imageSettingsContainerFontSize
            }}
          >
            <div style={{ alignItems: "center" }}>
              <InputNumber
                data-cy="image-width-input"
                defaultValue={imageWidth || 600}
                onChange={val => this.onItemPropChange("imageWidth", val)}
              />

              <PaddingDiv left={20}>{t("component.cloze.imageDragDrop.widthpx")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <Input
                data-cy="image-alternate-input"
                size="large"
                style={{ width: 220 }}
                defaultValue={imageAlterText}
                onChange={val => this.onItemPropChange("imageAlterText", val.target.value)}
              />
              <PaddingDiv left={20}>{t("component.cloze.imageDragDrop.imagealtertext")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <ColorBox
                data-cy="image-text-box-color-picker"
                style={{ backgroundColor: background }}
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
              <PaddingDiv left={20}>{t("component.cloze.imageDragDrop.fillcolor")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <Input
                size="large"
                style={{ width: 220 }}
                defaultValue={imageTitle}
                onChange={val => this.onItemPropChange("imageTitle", val.target.value)}
              />
              <PaddingDiv left={20}>{t("component.clozeImageDragDrop.textonhover")}</PaddingDiv>
            </div>
            <div style={{ alignItems: "center" }}>
              <InputNumber
                data-cy="drag-drop-image-max-res"
                min={1}
                max={10}
                style={{ width: 100 }}
                defaultValue={maxRespCount}
                onChange={val => this.onItemPropChange("maxRespCount", val)}
              />
              <PaddingDiv left={20} style={{ width: 160 }}>
                {t("component.cloze.imageDragDrop.maximumresponses")}
              </PaddingDiv>
            </div>
          </FlexContainer>
          <PaddingDiv top={30} />
          <FlexContainer>
            <div
              className="controls-bar"
              style={{
                width: 120,
                background: theme.widgets.clozeImageDragDrop.controlsBarBgColor,
                alignItems: "center",
                alignSelf: "flex-start",
                flexDirection: "column"
              }}
            >
              <Button style={{ width: 100, height: 100, whiteSpace: "normal" }}>
                <IconDrawResize />
                {t("component.cloze.imageDragDrop.drawresize")}
              </Button>

              <div
                style={{
                  position: "relative",
                  width: 100,
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <Button
                  disabled={!hasActive}
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    whiteSpace: "normal"
                  }}
                >
                  <IconPin />
                  {t("component.cloze.imageDragDrop.pointers")}
                </Button>
                <Select
                  disabled={!hasActive}
                  defaultValue="none"
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "flex-end"
                  }}
                  onChange={this.handlePointersChange}
                >
                  <Option value="none">{t("component.cloze.imageDragDrop.none")}</Option>
                  <Option value="top">{t("component.cloze.imageDragDrop.top")}</Option>
                  <Option value="bottom">{t("component.cloze.imageDragDrop.bottom")}</Option>
                  <Option value="left">{t("component.cloze.imageDragDrop.left")}</Option>
                  <Option value="right">{t("component.cloze.imageDragDrop.right")}</Option>
                </Select>
              </div>
            </div>
            <FlexView
              size={1}
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 20,
                overflowX: "auto",
                overflowY: "hidden"
              }}
            >
              <ImageContainer data-cy="drag-drop-image-panel" width={imageWidth}>
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
                    <p className="ant-upload-hint">
                      <strong>{t("component.cloze.imageDragDrop.draganddrop")}</strong>
                    </p>
                    <h2 className="ant-upload-text">{t("component.cloze.imageDragDrop.yourOwnImage")}</h2>
                    <p className="ant-upload-hint">
                      {t("component.cloze.imageDragDrop.orBrowse")}: PNG, JPG, GIF (1024KB MAX.)
                    </p>
                  </Dragger>
                )}
              </ImageContainer>
              <PaddingDiv top={30} style={{ alignSelf: "flex-start" }}>
                <Checkbox
                  data-cy="drag-drop-image-dashboard-check"
                  defaultChecked={responseLayout && responseLayout.showdashedborder}
                  onChange={val => this.onResponsePropChange("showdashedborder", val.target.checked)}
                >
                  {t("component.cloze.imageDragDrop.showdashedborder")}
                </Checkbox>
                <Checkbox
                  data-cy="drag-drop-image-aria-check"
                  defaultChecked={isEditAriaLabels}
                  onChange={val => this.onItemPropChange("isEditAriaLabels", val.target.checked)}
                >
                  {t("component.cloze.imageDragDrop.editAriaLabels")}
                </Checkbox>
              </PaddingDiv>
            </FlexView>
          </FlexContainer>
          <PaddingDiv>
            {isEditAriaLabels && (
              <React.Fragment>
                <Subtitle>{t("component.cloze.imageDragDrop.editAriaLabels")}</Subtitle>
                {responses.map((responseContainer, index) => (
                  <div className="imagelabeldragdrop-droppable iseditablearialabel" key={index}>
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
          <PaddingDiv>
            <Subtitle>{t("component.cloze.imageDragDrop.possibleresponses")}</Subtitle>
            <SortableList
              dirty={item.firstMount}
              items={item.options}
              onSortEnd={this.onSortEnd}
              useDragHandle
              onRemove={this.remove}
              onChange={this.editOptions}
            />
            <div>
              <AddNewChoiceBtn data-cy="add-new-ch" onClick={() => this.addNewChoiceBtn()}>
                {t("component.cloze.imageDragDrop.addnewchoice")}
              </AddNewChoiceBtn>
            </div>
          </PaddingDiv>
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
