import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import produce from "immer";

import { withNamespaces } from "@edulastic/localization";
import { Paper, Image } from "@edulastic/common";
import { fileApi } from "@edulastic/api";

import { updateVariables } from "../../../utils/variables";

import QuestionTextArea from "../../../components/QuestionTextArea";
import DropZoneToolbar from "../../../components/DropZoneToolbar";
import StyledDropZone from "../../../components/StyledDropZone";
import { Subtitle } from "../../../styled/Subtitle";
import withAddButton from "../../../components/HOC/withAddButton";
import { SOURCE } from "../../../constants/constantsForQuestions";

import ColorPickers from "./ColorPickers";
import Options from "./Options";

const LineColors = withAddButton(ColorPickers);

const HighlightImageEdit = ({ item, setQuestionData, t }) => {
  const { image, line_color } = item;

  const [loading, setLoading] = useState(false);

  const width = image ? image.width : 900;
  const height = image ? image.height : 470;
  const altText = image ? image.altText : "";
  const file = image ? image.source : "";

  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const handleImageToolbarChange = prop => val => {
    setQuestionData(
      produce(item, draft => {
        draft.image[prop] = val;
        updateVariables(draft);
      })
    );
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

  const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);

    const g = parseInt(hex.slice(3, 5), 16);

    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const colorChange = i => obj => {
    setQuestionData(
      produce(item, draft => {
        draft.line_color[i] = hexToRGB(obj.color, (obj.alpha ? obj.alpha : 1) / 100);
      })
    );
  };

  const handleAddLineColor = () => {
    setQuestionData(
      produce(item, draft => {
        draft.line_color.push("#000000");
      })
    );
  };

  const handleRemove = i => () => {
    setQuestionData(
      produce(item, draft => {
        draft.line_color.splice(i, 1);
      })
    );
  };

  const thumb = file && <Image width={width} height={height} src={file} alt={altText} />;

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.highlightImage.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.highlightImage.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <DropZoneToolbar
          width={+width}
          height={+height}
          maxWidth={1097}
          altText={altText}
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
            <div
              data-cy="dropzone-image-container"
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "dropzone--isActive" : ""}`}
            >
              <input {...getInputProps()} />

              <StyledDropZone loading={loading} isDragActive={isDragActive} thumb={thumb} />
            </div>
          )}
        </Dropzone>

        <Subtitle>{t("component.highlightImage.lineColorOptionsSubtitle")}</Subtitle>

        <LineColors
          onRemove={line_color.length > 1 ? handleRemove : undefined}
          changeHandler={colorChange}
          colors={line_color}
          buttonText={t("component.highlightImage.addButtonText")}
          onAdd={handleAddLineColor}
        />
      </Paper>
      <Options />
    </Fragment>
  );
};

HighlightImageEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(HighlightImageEdit);
