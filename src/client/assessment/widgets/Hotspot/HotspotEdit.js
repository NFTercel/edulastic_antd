import "rc-color-picker/assets/index.css";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import Dropzone from "react-dropzone";
import ColorPicker from "rc-color-picker";
import { Row, Col } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { withNamespaces } from "@edulastic/localization";
import { Paper, Tabs, Tab, Button, FlexContainer, Image } from "@edulastic/common";
import { fileApi } from "@edulastic/api";

import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import DropZoneToolbar from "../../components/DropZoneToolbar/index";
import StyledDropZone from "../../components/StyledDropZone/index";
import withPoints from "../../components/HOC/withPoints";
import { Subtitle } from "../../styled/Subtitle";

import { EDIT, SOURCE } from "../../constants/constantsForQuestions";

import { hexToRGB, getAlpha } from "./helpers";
import LocalColorPickers from "./components/LocalColorPickers";
import AreasContainer from "./AreasContainer";
import HotspotPreview from "./HotspotPreview";
import { StyledCheckbox } from "./styled/StyledCheckbox";
import { IconPlus } from "./styled/IconPlus";
import { IconClose } from "./styled/IconClose";
import Options from "./components/Options";

const OptionsList = withPoints(HotspotPreview);

const HotspotEdit = ({ item, setQuestionData, t, theme }) => {
  const { image, areas, area_attributes, multiple_responses } = item;

  const [loading, setLoading] = useState(false);

  const width = image ? image.width : 900;
  const height = image ? image.height : 470;
  const altText = image ? image.altText : "";
  const file = image ? image.source : "";

  const getAreaIndexes = arr => {
    const newIndexes = [];

    if (arr.length > 0) {
      arr.forEach(attr => {
        newIndexes.push(attr.area);
      });
    }

    return newIndexes;
  };

  const [customizeTab, setCustomizeTab] = useState(0);
  const [correctTab, setCorrectTab] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState(getAreaIndexes(area_attributes.local));

  const handleSelectChange = value => {
    const newItem = cloneDeep(item);

    newItem.area_attributes.local[customizeTab - 1].area = value;

    setSelectedIndexes(getAreaIndexes(newItem.area_attributes.local));

    setQuestionData(newItem);
  };

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleImageToolbarChange = prop => val => {
    const newItem = cloneDeep(item);

    newItem.image[prop] = val;
    setQuestionData(newItem);
  };

  const onDrop = ([files]) => {
    if (files) {
      setLoading(true);
      fileApi
        .upload({ file: files })
        .then(({ fileUri }) => {
          handleImageToolbarChange(SOURCE)(fileUri);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const thumb = file && <Image width={width} height={height} src={file} alt={altText} />;

  const changeHandler = prop => obj => {
    const newItem = cloneDeep(item);

    newItem.area_attributes.global[prop] = hexToRGB(obj.color, (obj.alpha ? obj.alpha : 1) / 100);

    setQuestionData(newItem);
  };

  const onCloseAttrTab = index => e => {
    e.stopPropagation();
    const newItem = cloneDeep(item);

    newItem.area_attributes.local.splice(index, 1);

    setSelectedIndexes(getAreaIndexes(newItem.area_attributes.local));

    setCustomizeTab(0);

    setQuestionData(newItem);
  };

  const handleAddAttr = () => {
    const newItem = cloneDeep(item);

    newItem.area_attributes.local.push({
      area: "",
      fill: area_attributes.global.fill,
      stroke: area_attributes.global.stroke
    });

    setSelectedIndexes(getAreaIndexes(newItem.area_attributes.local));

    setCustomizeTab(newItem.area_attributes.local.length);

    setQuestionData(newItem);
  };

  const handleLocalColorChange = prop => obj => {
    const newItem = cloneDeep(item);

    newItem.area_attributes.local[customizeTab - 1][prop] = hexToRGB(obj.color, (obj.alpha ? obj.alpha : 1) / 100);

    setQuestionData(newItem);
  };

  const handleCloseTab = tabIndex => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses.splice(tabIndex, 1);

    setCorrectTab(0);
    setQuestionData(newItem);
  };

  const handleResponseMode = () => {
    const newItem = cloneDeep(item);

    if (multiple_responses) {
      newItem.validation.valid_response.value.splice(1);
      newItem.validation.alt_responses.forEach(alt => {
        alt.value.splice(1);
      });
    }

    newItem.multiple_responses = !multiple_responses;

    setQuestionData(newItem);
  };

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: newItem.validation.valid_response.value
    });

    setQuestionData(newItem);
    setCorrectTab(correctTab + 1);
  };
  const renderPlusButton = () => (
    <Button
      style={{
        minWidth: 70,
        minHeight: 25
      }}
      icon={<IconPlus />}
      onClick={handleAddAttr}
      color="primary"
      variant="extendedFab"
    />
  );

  const renderLabel = index => (
    <FlexContainer>
      <span>
        {t("component.hotspot.local")} {index + 1}
      </span>
      <IconClose onClick={onCloseAttrTab(index)} />
    </FlexContainer>
  );

  const renderAltResponses = () => {
    if (area_attributes && area_attributes.local && area_attributes.local.length) {
      return area_attributes.local.map((res, i) => <Tab key={i} label={renderLabel(i)} />);
    }

    return null;
  };

  const handlePointsChange = val => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.score = val;
    } else {
      newItem.validation.alt_responses[correctTab - 1].score = val;
    }

    setQuestionData(newItem);
  };

  const handleAnswerChange = ans => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.value = ans;
    } else {
      newItem.validation.alt_responses[correctTab - 1].value = ans;
    }

    setQuestionData(newItem);
  };

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      userAnswer={
        correctTab === 0 ? item.validation.valid_response.value : item.validation.alt_responses[correctTab - 1].value
      }
      view={EDIT}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.hotspot.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.hotspot.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <DropZoneToolbar
          width={+width}
          height={+height}
          altText={altText}
          maxWidth={980}
          handleChange={handleImageToolbarChange}
        />

        <Dropzone
          onDrop={onDrop}
          maxSize={1000000}
          accept="image/*"
          className="dropzone"
          activeClassName="active-dropzone"
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "dropzone--isActive" : ""}`}>
              <input {...getInputProps()} />

              <StyledDropZone loading={loading} isDragActive={isDragActive} thumb={thumb} />
            </div>
          )}
        </Dropzone>

        <Subtitle>{t("component.hotspot.areasBlockTitle")}</Subtitle>
        <AreasContainer areas={areas} itemData={item} width={+width} height={+height} imageSrc={file} />

        <Subtitle>{t("component.hotspot.attributesTitle")}</Subtitle>

        <Tabs style={{ marginBottom: 15 }} value={customizeTab} onChange={setCustomizeTab} extra={renderPlusButton()}>
          <Tab label={t("component.hotspot.global")} />
          {renderAltResponses()}
        </Tabs>
        {customizeTab === 0 ? (
          <Row gutter={80}>
            <Col span={5}>
              <Subtitle fontSize={theme.widgets.hotspot.subtitleFontSize} color={theme.widgets.hotspot.subtitleColor}>
                {t("component.hotspot.fillColorTitle")}
              </Subtitle>
              <ColorPicker
                animation="slide-up"
                color={area_attributes.global.fill}
                alpha={getAlpha(area_attributes.global.fill)}
                onChange={changeHandler("fill")}
              />
            </Col>
            <Col span={5}>
              <Subtitle fontSize={theme.widgets.hotspot.subtitleFontSize} color={theme.widgets.hotspot.subtitleColor}>
                {t("component.hotspot.outlineColorTitle")}
              </Subtitle>
              <ColorPicker
                animation="slide-up"
                color={area_attributes.global.stroke}
                alpha={getAlpha(area_attributes.global.stroke)}
                onChange={changeHandler("stroke")}
              />
            </Col>
          </Row>
        ) : (
          <LocalColorPickers
            onLocalColorChange={handleLocalColorChange}
            attributes={area_attributes.local[customizeTab - 1]}
            handleSelectChange={handleSelectChange}
            areaIndexes={areas
              .map((area, i) => i)
              .filter(
                index => !selectedIndexes.includes(index) || index === area_attributes.local[customizeTab - 1].area
              )}
          />
        )}

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />

        <StyledCheckbox onChange={handleResponseMode} defaultChecked={multiple_responses}>
          {t("component.hotspot.multipleResponses")}
        </StyledCheckbox>
      </Paper>

      <Options />
    </Fragment>
  );
};

HotspotEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(HotspotEdit);
